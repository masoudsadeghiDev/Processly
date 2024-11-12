package com.masoud.bpms.Service.Process;

import com.masoud.bpms.Config.SessionManagerService;
import com.masoud.bpms.Model.Bpms.Application;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.ProcessEntity;
import com.masoud.bpms.Model.Bpms.BpmsNodes.Flow.SequenceFlow;
import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;
import com.masoud.bpms.Model.Bpms.Process;
import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Service.BaseService;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManagerFactory;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;


@Service
public class ProcessServiceImpl extends BaseService implements ProcessService {


    @Override
    public List<Process> getApplicationProcessList(Application application, ProcessStatus status, ProcessStatus justOneStatus) {
        String query = String.format(
                "DECLARE @Status int = %s\n" +
                        "DECLARE @JustOne int = %s\n" +
                        "SELECT ID as  id, DISPLAYNAME as displayName, NAME as name FROM ProcessTbl\n" +
                        "                         WHERE application_id = %s AND\n" +
                        "                         (@JustOne IS NULL AND status >= @Status)OR\n" +
                        "                         (@JustOne IS NOT NULL AND status = @JustOne)" +
                        "                          ORDER BY status DESC",
                status != null ? status.ordinal() : null,
                justOneStatus != null ? justOneStatus.ordinal() : null,
                application.getId()
        );
        return getSession().createNativeQuery(query).setResultTransformer(Transformers.aliasToBean(Process.class)).list();
    }

    @Override
    public List<Process> getApplicationProcessList(Application application) {
        return getSession().createCriteria(Process.class)
                .add(Restrictions.eq("application", application))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("id"), "id")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("displayName"), "displayName"))
                .setResultTransformer(Transformers.aliasToBean(Process.class)).list();
    }

    @Override
    public List<Process> getWizardProcess(Integer appId) {
        return getSession().createCriteria(Process.class)
                .add(Restrictions.eq("application", new Application(appId)))
                .add(Restrictions.eq("addTOWizard", true))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("id"), "id")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("displayName"), "displayName"))
                .setResultTransformer(Transformers.aliasToBean(Process.class)).list();
    }

    @Override
    @Transactional
    public boolean addToWizard(Integer processId) {
        try {

            sessionFactory.getCurrentSession().createNativeQuery(String.format("UPDATE ProcessTbl SET addTOWizard='true' WHERE ID = %s", processId)).executeUpdate();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional
    public void changeStatus(Integer processId, ProcessStatus status) {

        sessionFactory
                .getCurrentSession()
                .createNativeQuery(String.format("UPDATE ProcessTbl SET status= %s WHERE id = %s", status.ordinal(), processId))
                .executeUpdate();
    }

    @Override
    @Transactional
    public void incStatus(Integer processId, ProcessStatus status) {

        String query = String.format("UPDATE ProcessTbl SET status = status+1 WHERE status = %s AND id = %s", status.ordinal(), processId);
        sessionFactory
                .getCurrentSession()
                .createNativeQuery(query)
                .executeUpdate();
    }

    @Override
    public Integer getProcessIdFromNode(Integer nodeID) {
        return (Integer) sessionFactory.getCurrentSession().createNativeQuery(String.format(" SELECT process_id FROM NodeTbl WHERE ID =%s", nodeID)).uniqueResult();
    }

    @Override
    public Integer save(Process process) {
        process.setStatus(ProcessStatus.PROCESS_DESIGN);
        process.setEntities(Arrays.asList());
        process.setSubmitDate(new Date());
        return (Integer) getSession().save(process);
    }

    @Override
    public void saveXml(Process process) {
        getSession()
                .createNativeQuery("update ProcessTbl set xml=N'" + process.getXml() + "' where id=" + process.getId())
                .executeUpdate();
        this.incStatus(process.getId(), ProcessStatus.PROCESS_DESIGN);
    }

    @Override
    public void submitProcess(Integer processId) {
        Process process = (Process) getSession()
                .createCriteria(Process.class)
                .add(Restrictions.eq("id", processId))
                .uniqueResult();
        JSONObject xmlJSONObj = XML.toJSONObject(process.getXml());
        JSONObject definitions = null;
        if (xmlJSONObj.has("bpmn2:definitions")) {
            definitions = xmlJSONObj.getJSONObject("bpmn2:definitions");
        } else if (xmlJSONObj.has("definitions")) {
            definitions = xmlJSONObj.getJSONObject("definitions");
        } else if (xmlJSONObj.has("bpmn:definitions")) {
            definitions = xmlJSONObj.getJSONObject("bpmn:definitions");
        } else {
            return;
        }
        this.handleBpmn2Elements(definitions, process);
        this.incStatus(process.getId(), ProcessStatus.PROCESS_DESIGN);
    }

    @Override
    public Process getXml(Integer processId) {

        return (Process) getSession().createCriteria(Process.class)
                .add(Restrictions.eq("id", processId))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("xml"), "xml"))
                .setResultTransformer(Transformers.aliasToBean(Process.class))
                .uniqueResult();

    }

    private void handleBpmn2Elements(JSONObject definitions, Process process) {
        for (String key : definitions.keySet()
        ) {
            if (key.contains("bpmn2:")) {
                key = key.replace("bpmn2:", "");
                switch (key) {
                    case "process": {
                        this.handleBpmn2ProcessElements(definitions, process);
                        break;
                    }
                    case "collaboration": {
                        break;
                    }
                    case "BPMNDiagram": {
                        break;
                    }
                }
            }
        }
    }

    private void handleBpmn2ProcessElements(JSONObject definitions, Process process) {
        String key = "bpmn2:process";
        if (!this.isJsonArray(key, definitions)) {
            JSONObject processJson = definitions.getJSONObject(key);
            this.saveBpmn2ProcessElement(processJson, process);
        } else {
            JSONArray processJson = definitions.getJSONArray(key);
            processJson.forEach(prc -> this.saveBpmn2ProcessElement((JSONObject) prc, process));
        }
    }

    private void saveBpmn2ProcessElement(JSONObject processJson, Process process) {
        Node node = null;
        for (String key : processJson.keySet()
        ) {

            if (key.contains("bpmn2:") && !key.equals("bpmn2:sequenceFlow")) {

                if (!isJsonArray(key, processJson)) {
                    JSONObject jsonObject = processJson.getJSONObject(key);
                    String name = null;
                    String id = jsonObject.getString("id");
                    if (jsonObject.has("name")) {
                        name = jsonObject.get("name").toString();
                    }
                    this.saveNode(key, id, name, process);
                } else {
                    JSONArray array = processJson.getJSONArray(key);

                    array.toList().stream().forEach(item -> {
                        String id = (String) ((Map) item).get("id");
                        String name = null;
                        if (((Map) item).containsKey("name"))
                            name = (String) ((Map) item).get("name");
                        this.saveNode(key, id, name, process);
                    });
                }
            }
        }

        if (processJson.has("bpmn2:sequenceFlow")) {
            this.connectNodes(process, processJson.get("bpmn2:sequenceFlow"));
        }
    }

    private void saveNode(String key, String id, String name, Process process) {
        Node node = null;
        try {
            node = (Node) NodeType.toClass(key).newInstance();

            node.setDiagramId(id);
            node.setProcess(process);
            node.setName(name);
            getSession().saveOrUpdate(node);
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    private void connectNodes(Process process, Object object) {
        if (object instanceof JSONObject) {
            this.saveSequence(process, (JSONObject) object);
        } else if (object instanceof JSONArray) {
            ((JSONArray) object).forEach((arrayItem) -> {
                this.saveSequence(process, (JSONObject) arrayItem);
            });
        }
    }

    private void saveSequence(Process process, JSONObject sequenceJson) {

        SequenceFlow sequence = new SequenceFlow();
        sequence.setProcess(process);
        sequence.setDiagramId(sequenceJson.getString("id"));
        String targetId = sequenceJson.getString("targetRef");
        Node target = this.findNode(targetId);
        String sourceId = sequenceJson.getString("sourceRef");
        Node source = this.findNode(sourceId);
        sequence.setTarget(target);
        sequence.setSource(source);

        getSession().saveOrUpdate(sequence);
        source.setBefore(sequence);
        getSession().update(source);

    }

    private Node findNode(String diagramId) {
        return (Node) getSession().createCriteria(Node.class)
                .add(Restrictions.eq("diagramId", diagramId))
                .setMaxResults(1)
                .uniqueResult();
    }

    private boolean isJsonArray(String key, JSONObject jsonobject) {
        Object object = jsonobject.get(key);
        if (object instanceof JSONArray) {
            return true;
        } else {
            return false;
        }
    }


}
