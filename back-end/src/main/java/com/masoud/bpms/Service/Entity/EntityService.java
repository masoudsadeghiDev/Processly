package com.masoud.bpms.Service.Entity;

import com.masoud.bpms.Model.Bpms.BpmsDataModel.Attribute;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.ProcessEntity;
import com.masoud.bpms.Model.Form.Designer.FormDesignRow;

import javax.script.ScriptEngine;
import java.util.List;
import java.util.Map;

public interface EntityService {

    public void save(ProcessEntity entity);

    public void submit(Integer processId);

    public void bulkSave(List<ProcessEntity> entities);

    void saveData(Map input);
    void updateData(Map input);


    ProcessEntity getOne(Integer id);

    List<ProcessEntity> getList(Integer processId);

    FormDesignRow getEntityListForFormDesign(Integer processId);

    FormDesignRow getEntityListForRuleDesign(Integer processId);

    Object getOneData(Integer id, Integer dataId);
    Object getLastData(Integer id, Integer dataId);

    public ScriptEngine getEvaluationScriptEngine(Integer processId, Integer requestId);

    Object getAllData(Integer id);

    List<ProcessEntity> getList();

    void connect(Integer source, Integer target);

    void createAttribute(Attribute attribute, Integer entityId);

    List<Attribute> getAttributes(Integer entityId);

    void insertParameterData(List<Map<String, Object>> data, Integer entityId);

    Boolean haveEntity(Integer processId);

    ProcessEntity getMainEntityWithProcessID(Integer processId);

}
