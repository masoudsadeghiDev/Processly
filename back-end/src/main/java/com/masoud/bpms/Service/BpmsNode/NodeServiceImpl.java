package com.masoud.bpms.Service.BpmsNode;

import com.masoud.bpms.Config.SessionManagerService;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.ProcessEntity;
import com.masoud.bpms.Model.Bpms.BpmsNodes.Flow.SequenceFlow;
import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;
import com.masoud.bpms.Model.Bpms.BpmsNodes.SequenceLog;
import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Model.Bpms.Request;
import com.masoud.bpms.Service.Entity.EntityService;
import com.masoud.bpms.Service.Process.ProcessService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.tool.hbm2ddl.SchemaUpdate;
import org.hibernate.tool.schema.TargetType;
import org.hibernate.transform.Transformers;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class NodeServiceImpl implements NodeService {

    @Autowired
    private SessionManagerService sessionManagerService;
    @Autowired
    private SessionFactory sessionFactory;
    @Autowired
    private EntityService entityService;
    @Autowired
    private ProcessService processService;


    @Override
    public Object getNodeByDiagramId(String diagramId) {
        Node node = (Node) sessionFactory.getCurrentSession().createCriteria(Node.class).add(Restrictions.eq("diagramId", diagramId)).uniqueResult();
        NodeType type = node.getType();
        Class<? extends NodeType> typeClass = NodeType.toClass(type);
        return sessionFactory.getCurrentSession().createCriteria(typeClass)
                .add(Restrictions.eq("id", node.getID()))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("ID"), "ID")
                        .add(Projections.property("diagramId"), "diagramId")
                        .add(Projections.property("type"), "type")
                )
                .setResultTransformer(Transformers.aliasToBean(typeClass))
                .uniqueResult();
    }

    @Override
    public Object getNodeById(Integer id) {
        Node node = (Node) sessionFactory.getCurrentSession().createCriteria(Node.class).add(Restrictions.eq("ID", id)).uniqueResult();
        NodeType type = node.getType();
        Class<? extends NodeType> typeClass = NodeType.toClass(type);
        return sessionFactory.getCurrentSession().createCriteria(typeClass)
                .add(Restrictions.eq("id", node.getID()))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("ID"), "ID")
                        .add(Projections.property("diagramId"), "diagramId")
                        .add(Projections.property("type"), "type")
                )
                .setResultTransformer(Transformers.aliasToBean(typeClass))
                .uniqueResult();
    }

    @Override
    public List getNextNodeByDiagramId(String diagramId) {
        Node node = (Node) sessionFactory.getCurrentSession().createCriteria(Node.class).add(Restrictions.eq("diagramId", diagramId)).uniqueResult();
        List<Node> nextNodes = (List<Node>) sessionFactory
                .getCurrentSession()
                .createCriteria(Node.class)
                .add(Restrictions.eq("before", node))
                .list();
        return nextNodes.stream().map(n -> this.getNodeByDiagramId(n.getDiagramId())).collect(Collectors.toList());
    }

    @Override
    public Object getFlowNextNodeByDiagramId(String diagramId) {
        Node node = (Node) sessionFactory.getCurrentSession().createCriteria(Node.class).add(Restrictions.eq("diagramId", diagramId)).uniqueResult();
        Node nextNode = (Node) sessionFactory
                .getCurrentSession()
                .createCriteria(Node.class)
                .add(Restrictions.eq("before", node))
                .uniqueResult();
        return this.getNodeByDiagramId(nextNode.getDiagramId());
    }

    @Override
    public boolean evaluateCondition(String diagramId, Integer requestId) {
        Node node = (Node) sessionFactory.getCurrentSession().createCriteria(Node.class).add(Restrictions.eq("diagramId", diagramId)).uniqueResult();
        NodeType type = node.getType();
        Class<? extends NodeType> typeClass = NodeType.toClass(type);
        SequenceFlow flow = (SequenceFlow) sessionFactory.getCurrentSession().createCriteria(SequenceFlow.class)
                .add(Restrictions.eq("id", node.getID()))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("ID"), "ID")
                        .add(Projections.property("diagramId"), "diagramId")
                        .add(Projections.property("type"), "type")
                        .add(Projections.property("process"), "process")
                        .add(Projections.property("condition"), "condition")
                )
                .setResultTransformer(Transformers.aliasToBean(typeClass))
                .uniqueResult();
        ScriptEngine engine = entityService.getEvaluationScriptEngine(flow.getProcess().getId(), requestId);
        try {
            return (Boolean) engine.eval(flow.getCondition());
        } catch (ScriptException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void moveOnDiagram(Integer entityId, Integer requestId) {
        Integer status = this.getCurrentStatus(entityId, requestId);
        Node node = (Node) this.getNodeById(status);
        if (node.getType() == NodeType.EndEvent) {
            return;
        }
        SequenceFlow flow = (SequenceFlow) sessionFactory.getCurrentSession().createCriteria(SequenceFlow.class)
                .add(Restrictions.eq("source", node))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("target"), "target")
                ).setResultTransformer(Transformers.aliasToBean(SequenceFlow.class))
                .uniqueResult();
        if (flow != null) {
            Node target = flow.getTarget();

            if (target.getType().toString().toLowerCase().contains("gateway")) {
                List<SequenceFlow> outerFlows = sessionFactory
                        .getCurrentSession()
                        .createCriteria(SequenceFlow.class)
                        .add(Restrictions.eq("source", target))
                        .setProjection(Projections.projectionList()
                                .add(Projections.property("target"), "target")
                                .add(Projections.property("condition"), "condition")
                                .add(Projections.property("diagramId"), "diagramId")
                        ).setResultTransformer(Transformers.aliasToBean(SequenceFlow.class))
                        .list();
                for (int i = 0; i < outerFlows.size(); i++) {
                    SequenceFlow temp = outerFlows.get(i);
                    if (temp.getCondition() != null && this.evaluateCondition(temp.getDiagramId(), requestId)) {
                        logRequestStatus(entityId, requestId, temp.getTarget().getID());
                        break;
                    }
                }
            } else {
                logRequestStatus(entityId, requestId, target.getID());
            }
        }
    }

    @Override
    public Boolean connectedToGateway(String diagramId) {

        SequenceFlow flow = (SequenceFlow) sessionFactory.getCurrentSession().createCriteria(SequenceFlow.class)
                .add(Restrictions.eq("diagramId", diagramId))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("source"), "source")
                )
                .setResultTransformer(Transformers.aliasToBean(SequenceFlow.class))
                .uniqueResult();

        return flow.getSource().getType().toString().toLowerCase().contains("gateway");
    }

    @Override
    @Transactional
    public void setArrowCondition(Integer flowId, String condition) {

        sessionFactory
                .getCurrentSession()
                .createNativeQuery(String.format("UPDATE SequenceFlowTbl SET condition = '%s' WHERE ID = %s", condition, flowId))
                .executeUpdate();
        Integer processId = processService.getProcessIdFromNode(flowId);
        processService.incStatus(processId, ProcessStatus.ROLE_DESIGN);

    }

    @Override
    public Integer getCurrentStatus(Integer entityId, Integer requestId) {

        return (Integer) sessionFactory
                .getCurrentSession()
                .createNativeQuery(String.format("SELECT TOP(1) currentStateId AS status FROM SequenceLogTbl WHERE request_id = %s AND entityId= %s ORDER BY date DESC", requestId, entityId))
                .uniqueResult();
    }

    @Override
    public void logRequestStatus(Integer entityId, Integer requestId, Integer status) {
        NodeType nodeType = this.getNodeType(status);
        SequenceLog log = new SequenceLog();
        log.setEntityId(entityId);
        log.setRequest(new Request(requestId));
        log.setCurrentStateId(status);
        log.setDate(new Date());
        log.setComplete(nodeType == NodeType.EndEvent);

        sessionFactory.getCurrentSession().save(log);
    }

    @Override
    public NodeType getNodeType(Integer nodeID) {
        String query = String.format("SELECT type FROM NodeTbl WHERE ID = 1");
        Integer ordinal = (Integer) sessionFactory.getCurrentSession().createNativeQuery(query).uniqueResult();
        return NodeType.values()[ordinal];
    }
}
