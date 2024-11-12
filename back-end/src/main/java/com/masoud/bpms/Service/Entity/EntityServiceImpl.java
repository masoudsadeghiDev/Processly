package com.masoud.bpms.Service.Entity;

import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Model.Bpms.Request;
import com.masoud.bpms.Service.BpmsNode.NodeService;
import com.masoud.bpms.Service.Process.ProcessService;
import com.masoud.bpms.Service.Request.RequestService;
import org.apache.commons.lang3.StringUtils;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.Attribute;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.AttributeType;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.EntityType;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.ProcessEntity;
import com.masoud.bpms.Model.Bpms.Process;
import com.masoud.bpms.Model.Form.Designer.FormDesignRow;
import com.masoud.bpms.Model.Form.Designer.RowData;
import com.masoud.bpms.Model.Form.Designer.RowKind;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.hql.internal.ast.tree.MapEntryNode;
import org.hibernate.tool.hbm2ddl.SchemaUpdate;
import org.hibernate.tool.schema.TargetType;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class EntityServiceImpl implements EntityService {

    @Autowired
    private SessionFactory sessionFactory;
    private String entities = "";
    private Session entitySession;
    private List<ProcessEntity> processEntities = new ArrayList<>();
    private int count = 0;
    @Autowired
    private NodeService nodeService;
    @Autowired
    private RequestService requestService;
    @Autowired
    private ProcessService processService;

    @Override
    public void save(ProcessEntity entity) {
        Session session = sessionFactory.getCurrentSession();
        if (entity.getMainModel()) {
            Attribute attribute = new Attribute();
            attribute.setName("request");
            attribute.setDisplayName("request");
            attribute.setType(AttributeType.PRIMITIVE);
            attribute.setPrimitiveType("integer");
            List<Attribute> attributes = new ArrayList<>();
            attributes.add(attribute);
            entity.setAttributes(attributes);
        }
        Integer id = (Integer) session.save(entity);
        entity.setId(id);
        if (entity.getEntityType() == EntityType.PARAMETER) {
            this.submit(entity);
        }
    }

    @Override
    public void submit(Integer processId) {
        Session session = sessionFactory.getCurrentSession();
        this.initEntityConfig(session);

        StandardServiceRegistry serviceRegistry = sessionFactory.getSessionFactoryOptions().getServiceRegistry();
        MetadataSources metadataSources = new MetadataSources(serviceRegistry);
        sessionFactory.getSessionFactoryOptions();
        //Read the mapping file
        metadataSources.addInputStream(new ByteArrayInputStream(this.entities.getBytes()));
        Metadata metadata = metadataSources.buildMetadata();
        //Update the database schema, create the table if it does not exist, update the field if it exists, and will not affect the existing data
        SchemaUpdate schemaUpdate = new SchemaUpdate();
        schemaUpdate.execute(EnumSet.of(TargetType.DATABASE), metadata, serviceRegistry);
        processService.incStatus(processId, ProcessStatus.MODEL_DESIGN);
    }

    public void submit(ProcessEntity entity) {
        Session session = sessionFactory.getCurrentSession();
        this.initEntityConfig(entity);

        StandardServiceRegistry serviceRegistry = sessionFactory.getSessionFactoryOptions().getServiceRegistry();
        MetadataSources metadataSources = new MetadataSources(serviceRegistry);
        sessionFactory.getSessionFactoryOptions();
        //Read the mapping file
        metadataSources.addInputStream(new ByteArrayInputStream(this.entities.getBytes()));
        Metadata metadata = metadataSources.buildMetadata();
        //Update the database schema, create the table if it does not exist, update the field if it exists, and will not affect the existing data
        SchemaUpdate schemaUpdate = new SchemaUpdate();
        schemaUpdate.execute(EnumSet.of(TargetType.DATABASE), metadata, serviceRegistry);
    }

    @Override
    public void bulkSave(List<ProcessEntity> entities) {
        Session session = sessionFactory.getCurrentSession();
        entities.forEach(entity -> session.save(entity));

        this.initEntityConfig(session);

        StandardServiceRegistry serviceRegistry = sessionFactory.getSessionFactoryOptions().getServiceRegistry();
        MetadataSources metadataSources = new MetadataSources(serviceRegistry);
        sessionFactory.getSessionFactoryOptions();
        //Read the mapping file

        metadataSources.addInputStream(new ByteArrayInputStream(this.entities.getBytes()));
        Metadata metadata = metadataSources.buildMetadata();
        //Update the database schema, create the table if it does not exist, update the field if it exists, and will not affect the existing data
        SchemaUpdate schemaUpdate = new SchemaUpdate();
        schemaUpdate.execute(EnumSet.of(TargetType.DATABASE), metadata, serviceRegistry);

    }

    @Override
    public void saveData(Map input) {
        Integer processId = (Integer) input.get("processId");
        Integer requestId = requestService.createRequest(processId);
        input.put("requestId", requestId);
        this.updateData(input);
    }

    @Override
    public void updateData(Map input) {
        Integer requestId = (Integer) input.get("requestId");
        Map data = (Map) input.get("data");

        ProcessEntity entity = this.getMainEntityWithProcessID((Integer) input.get("processId"));
        if (entity != null) {
            Integer entityId = entity.getId();
            Session session = this.getEntitySession();
            data.put("request", requestId);
            session.save(entity.getName(), data);
            session.close();
            if (input.containsKey("currentStatus")) {
                nodeService.logRequestStatus(entityId, requestId, (Integer) input.get("currentStatus"));
            }
            nodeService.moveOnDiagram(entityId, requestId);
        }

    }

    private void connectRelations(ProcessEntity entity, Map data) {

        String entityName = entity.getName().toUpperCase();
        Integer entityId = (Integer) data.get("id");
        entity.getAttributes().forEach(attribute -> {
            if (attribute.getType() == AttributeType.MANY_TO_MANY) {
                String middleTable = attribute.getTableName().replace("<entity>", entityName);
                String entityColumn = String.format("%s_COL", entityName);
                String attrColumn = String.format("%s_COL", attribute.getClassName().toUpperCase());
                Set<Map> set = (Set) data.get(attribute.getName());
                set.stream().forEach(s -> {
                    String query = String.format(
                            "INSERT INTO %s (%s,%s) VALUES (%d,%d)",
                            middleTable,
                            entityColumn,
                            attrColumn,
                            entityId,
                            s.get("id")
                    );
                    sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
                });
            } else if (attribute.getType() == AttributeType.ONE_TO_MANY) {
                String tableName = attribute.getName().toUpperCase();
                Set<Map> set = (Set) data.get(attribute.getName());
                set.stream().forEach(s -> {
                    String query = String.format(
                            "UPDATE %s SET %s=%d WHERE id =%d",
                            tableName,
                            entityName + "_COL",
                            entityId,
                            s.get("id")
                    );
                    sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
                });
            }
        });
    }

    @Override
    public ProcessEntity getOne(Integer id) {
        Session session = sessionFactory.getCurrentSession();
        return (ProcessEntity) session
                .createCriteria(ProcessEntity.class)
                .add(Restrictions.eq("id", id))
                .uniqueResult();

    }

    @Override
    public List<ProcessEntity> getList(Integer processId) {
        Session session = sessionFactory.getCurrentSession();
        ProcessEntity process = new ProcessEntity(processId);
        return session
                .createCriteria(ProcessEntity.class)
                .add(Restrictions.eq("process", process))
                .list();
    }

    @Override
    public FormDesignRow getEntityListForFormDesign(Integer processId) {
        Session session = sessionFactory.getCurrentSession();
        Process process = new Process(processId);
        ProcessEntity mainEntity = (ProcessEntity) session
                .createCriteria(ProcessEntity.class)
                .add(Restrictions.eq("process", process))
                .add(Restrictions.eq("mainModel", true))
                .uniqueResult();
        FormDesignRow row = this.toFetDesignerRow(mainEntity, session, process);
        return row;
    }

    @Override
    public FormDesignRow getEntityListForRuleDesign(Integer processId) {
        Session session = sessionFactory.getCurrentSession();
        Process process = new Process(processId);
        ProcessEntity mainEntity = (ProcessEntity) session
                .createCriteria(ProcessEntity.class)
                .add(Restrictions.eq("process", process))
                .add(Restrictions.eq("mainModel", true))
                .uniqueResult();
        FormDesignRow row = this.toRuleDesignerRow(mainEntity, session, process);
        return row;
    }

    private FormDesignRow toFetDesignerRow(ProcessEntity entity, Session session, Process process) {

        FormDesignRow row = new FormDesignRow();
        RowData data = new RowData();
        List children = new ArrayList<>();

        data.setDisplayName(entity.getOriginalName());
        data.setKind(RowKind.model);
        row.setData(data);
        row.setChildren(children);

        entity.getAttributes().stream().filter(attribute -> !attribute.getName().equals("request")).forEach(attribute -> {
            RowData attrData = new RowData();
            attrData.setDisplayName(attribute.getDisplayName());
            if (attribute.getType() == AttributeType.PRIMITIVE) {
                attrData.setKind(RowKind.attr);
                attrData.setData(attribute);
                children.add(attrData);
            } else {

                if (attribute.getClassName() != null) {
                    String attrName = StringUtils.substringBeforeLast(attribute.getClassName(), "_").toLowerCase();
                    ProcessEntity attributeEntity = (ProcessEntity) session
                            .createCriteria(ProcessEntity.class)
                            .add(Restrictions.eq("name", attrName))
                            .add(Restrictions.eq("process", process))
                            .add(Restrictions.eq("mainModel", false)).uniqueResult();
                    if (attributeEntity.getEntityType() == EntityType.PARAMETER) {

                        JSONObject attributeJson = new JSONObject(attribute);
                        List options = ((List<Map>) this.getAllData(attributeEntity.getId())).stream().map(opt -> {
                            Map map = new HashMap();
                            map.put("title", opt.get("value"));
                            map.put("value", opt.get("id"));
                            return map;
                        }).collect(Collectors.toList());

                        attributeJson.put("options", options);
                        attrData.setKind(RowKind.attr);

                        attrData.setData(attributeJson.toMap());
                        children.add(attrData);
                    } else {
                        FormDesignRow attrRow = this.toFetDesignerRow(attributeEntity, session, process);
                        children.add(attrRow);
                    }
                }

            }
        });
        return row;
    }

    private FormDesignRow toRuleDesignerRow(ProcessEntity entity, Session session, Process process) {

        FormDesignRow row = new FormDesignRow();
        RowData data = new RowData();
        List children = new ArrayList<>();

        data.setDisplayName(entity.getOriginalName());
        data.setKind(RowKind.model);
        row.setData(data);
        row.setChildren(children);

        entity.getAttributes().stream()
                .forEach(attribute -> {
                    RowData attrData = new RowData();
                    attrData.setDisplayName(attribute.getDisplayName());
                    if (attribute.getType() == AttributeType.PRIMITIVE) {
                        JSONObject jsonObject = new JSONObject(attribute);
                        jsonObject.put("name", String.format("%s.%s", entity.getOriginalName(), attribute.getName()));
                        attrData.setKind(RowKind.attr);
                        attrData.setData(jsonObject.toMap());
                        children.add(attrData);
                    } else {

                        if (attribute.getClassName() != null) {
                            String attrName = StringUtils.substringBeforeLast(attribute.getClassName(), "_").toLowerCase();
                            ProcessEntity attributeEntity = (ProcessEntity) session
                                    .createCriteria(ProcessEntity.class)
                                    .add(Restrictions.eq("name", attrName))
                                    .add(Restrictions.eq("process", process))
                                    .add(Restrictions.eq("mainModel", false)).uniqueResult();
                            if (attributeEntity.getEntityType() == EntityType.PARAMETER) {

                                JSONObject attributeJson = new JSONObject(attribute);
                                List options = ((List<Map>) this.getAllData(attributeEntity.getId())).stream().map(opt -> {
                                    Map map = new HashMap();
                                    map.put("title", opt.get("value"));
                                    map.put("value", opt.get("id"));
                                    return map;
                                }).collect(Collectors.toList());

                                attributeJson.put("options", options);
                                attrData.setKind(RowKind.attr);

                                attributeJson.put("name", String.format("%s.%s", entity.getOriginalName(), attribute.getName()));
                                attrData.setData(attributeJson.toMap());
                                children.add(attrData);
                            } else {
                                FormDesignRow attrRow = this.toFetDesignerRow(attributeEntity, session, process);
                                children.add(attrRow);
                            }
                        }

                    }
                });
        return row;
    }

    @Override
    public Object getOneData(Integer id, Integer dataId) {
        ProcessEntity processEntity = this.getOne(id);
        Object data = null;
        try {
            this.manageDataSession();
            data = this.entitySession
                    .createCriteria(processEntity.getName())
                    .add(Restrictions.eq("id", dataId))
                    .uniqueResult();
        } catch (Exception e) {
            this.initDataSession();
            data = this.entitySession
                    .createCriteria(processEntity.getName())
                    .add(Restrictions.eq("id", dataId))
                    .uniqueResult();
        }
        return data;
    }

    @Override
    public Object getLastData(Integer processId, Integer requestId) {
        ProcessEntity processEntity = this.getMainEntityWithProcessID(processId);
        Object data = null;
        try {
            this.manageDataSession();
            data = this.entitySession
                    .createCriteria(processEntity.getName())
                    .add(Restrictions.eq("request", requestId))
                    .addOrder(Order.desc("id"))
                    .setMaxResults(1)
                    .uniqueResult();
        } catch (Exception e) {
            this.initDataSession();
            data = this.entitySession
                    .createCriteria(processEntity.getName())
                    .add(Restrictions.eq("request", requestId))
                    .addOrder(Order.desc("id"))
                    .setMaxResults(1)
                    .uniqueResult();
        }
        return data;
    }

    @Override
    public ScriptEngine getEvaluationScriptEngine(Integer processId, Integer requestId) {

        ProcessEntity processEntity = this.getMainEntityWithProcessID(processId);
        Map data = null;
        try {
            this.manageDataSession();
            data = (Map) this.entitySession
                    .createCriteria(processEntity.getName())
                    .add(Restrictions.eq("request", requestId))
                    .addOrder(Order.desc("id"))
                    .setMaxResults(1)
                    .uniqueResult();
        } catch (Exception e) {
            this.initDataSession();
            data = (Map) this.entitySession
                    .createCriteria(processEntity.getName())
                    .add(Restrictions.eq("request", requestId))
                    .addOrder(Order.desc("id"))
                    .setMaxResults(1)
                    .uniqueResult();
        }

        ScriptEngineManager factory = new ScriptEngineManager();
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        JSONObject json = new JSONObject(data);
        json.remove("$type$");

        try {

            for (String key : json.keySet()) {
                if (json.get(key) instanceof JSONObject) {
                    JSONObject innerJson = (JSONObject) json.get(key);
                    innerJson.remove("$type$");
                }
            }
            engine.eval(String.format("%s=%s", processEntity.getOriginalName(), json.toString()));
            return engine;
        } catch (ScriptException e) {
            e.printStackTrace();
            return null;
        }


    }

    @Override
    public Object getAllData(Integer id) {
        ProcessEntity entity = this.getOne(id);
        Object data = null;
        try {
            this.manageDataSession();
            data = this.entitySession.createCriteria(entity.getName()).list();
        } catch (Exception e) {
            initDataSession();
            data = this.entitySession.createCriteria(entity.getName()).list();
        }
        return data;
    }

    private void manageDataSession() {

        if (count <= 10) {
            count++;
        } else {
            this.entitySession.close();
            this.entitySession = this.getEntitySession();
            count = 0;
        }
    }

    private void initDataSession() {
        if (this.entitySession != null) {
            this.entitySession.close();
        }
        this.getEntitySession();
        count = 0;
    }

    @Override
    public List<ProcessEntity> getList() {
        return sessionFactory.getCurrentSession().createCriteria(ProcessEntity.class).list();
    }

    @Transactional
    @Override
    public void connect(Integer source, Integer target) {
        String query = String.format("INSERT ProcessEntityTbl_ProcessEntityTbl ([source_id],[target_id]) " +
                "SELECT %d, %d " +
                "WHERE " +
                "NOT EXISTS (SELECT * FROM ProcessEntityTbl_ProcessEntityTbl WHERE " +
                "(source_id = %d AND target_id = %d) OR (target_id = %d AND source_id = %d))", source, target, source, target, source, target);
        this.sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
    }

    @Override
    public void createAttribute(Attribute attribute, Integer entityId) {
        ProcessEntity entity = (ProcessEntity) this.sessionFactory
                .getCurrentSession()
                .createCriteria(ProcessEntity.class)
                .add(Restrictions.eq("id", entityId))
                .uniqueResult();
        entity.getAttributes().add(attribute);
        this.sessionFactory.getCurrentSession().update(entity);
    }

    @Override
    public List<Attribute> getAttributes(Integer entityId) {
        return sessionFactory
                .getCurrentSession()
                .createQuery("from Attribute where entity_id=" + entityId)
                .list();
    }

    @Override
    @Transactional
    public void insertParameterData(List<Map<String, Object>> data, Integer entityId) {

        ProcessEntity entity = this.getOne(entityId);
        Session session = this.getEntitySession();

        Transaction tr = session.beginTransaction();
        session.createNativeQuery("delete from " + entity.getTableName()).executeUpdate();
        tr.commit();
        data.forEach(item -> {
            session.save(entity.getName(), item);
        });


    }

    @Override
    public Boolean haveEntity(Integer processId) {
        Process process = new Process(processId);
        return !sessionFactory.getCurrentSession()
                .createCriteria(ProcessEntity.class)
                .add(Restrictions.eq("process", process))
                .list().isEmpty();
    }

    @Override
    public ProcessEntity getMainEntityWithProcessID(Integer processId) {
        return (ProcessEntity) this.sessionFactory.getCurrentSession()
                .createCriteria(ProcessEntity.class)
                .add(Restrictions.eq("mainModel", true))
                .add(Restrictions.eq("process", new Process(processId)))
                .uniqueResult();
    }

    private Session getEntitySession() {

        Configuration cfg = new Configuration();
        cfg.addInputStream(new ByteArrayInputStream(entities.getBytes()));
        StandardServiceRegistry serviceRegistry = sessionFactory.getSessionFactoryOptions().getServiceRegistry();
        SessionFactory newSessionFactory = cfg.buildSessionFactory(serviceRegistry);
        this.entitySession = newSessionFactory.openSession();
        return this.entitySession;
    }

    private Criteria getCriteria(Integer entityId) {
        ProcessEntity entity = this.getOne(entityId);
        Session session = this.getEntitySession();
        return session.createCriteria(entity.getName());
    }

    @PostConstruct
    @Transactional
    public void initEntityConfig() {
        List<ProcessEntity> entities = sessionFactory.openSession().createCriteria(ProcessEntity.class).list();
        this.processEntities = entities;
        this.entities = ProcessEntity.toHibernateMapping(entities);
        this.getEntitySession();
    }

    @Transactional
    public void initEntityConfig(Session session) {
        List<ProcessEntity> entities = session.createCriteria(ProcessEntity.class).list();
        this.processEntities = entities;
        this.entities = ProcessEntity.toHibernateMapping(entities);
        this.getEntitySession();
    }

    @Transactional
    public void initEntityConfig(ProcessEntity newEntity) {

        this.processEntities.add(newEntity);
        this.entities = ProcessEntity.toHibernateMapping(this.processEntities);
        this.getEntitySession();
    }
}
