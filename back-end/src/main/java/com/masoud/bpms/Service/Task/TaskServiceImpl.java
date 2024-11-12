package com.masoud.bpms.Service.Task;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Task.Task;
import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Model.Form.Form;
import com.masoud.bpms.Service.Process.ProcessService;
import com.masoud.bpms.Utility.Security.TokenPrinciple;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private SessionFactory sessionFactory;
    @Autowired
    private TokenPrinciple tokenPrinciple;
    @Autowired
    private ProcessService processService;

    @Override
    @Transactional
    public void addFilter(Map<String, Object> input) {

        String task = (String) input.get("task");
        String query = "";
        if (input.containsKey("areas")) {
            String areas = ((List<Map<String, Object>>) input.get("areas")).stream().map(item -> (Integer) item.get("id")).collect(Collectors.toList()).toString();
            query += String.format("" +
                    "INSERT INTO TaskTbl_Area (task_id,area_id) " +
                    "SELECT %s , value FROM OpenJson('%s') " +
                    "WHERE NOT EXISTS( SELECT * FROM TaskTbl_Area WHERE task_id = %s AND area_id = value)", task, areas, task);
            sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
        }

        if (input.containsKey("businessRoles")) {
            String businessRoles = ((List<Map<String, Object>>) input.get("businessRoles")).stream().map(item -> (Integer) item.get("id")).collect(Collectors.toList()).toString();
            query += String.format("" +
                    "INSERT INTO TaskTbl_BusinessRole (task_id,businessRole_id) " +
                    "SELECT %s , value FROM OpenJson('%s') " +
                    "WHERE NOT EXISTS( SELECT * FROM TaskTbl_BusinessRole WHERE task_id = %s AND businessRole_id = value)", task, businessRoles, task);
            sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
        }

        if (input.containsKey("skills")) {
            String skills = ((List<Map<String, Object>>) input.get("skills")).stream().map(item -> (Integer) item.get("id")).collect(Collectors.toList()).toString();
            query += String.format("" +
                    "INSERT INTO TaskTbl_Skill (task_id,skill_id) " +
                    "SELECT %s , value FROM OpenJson('%s') " +
                    "WHERE NOT EXISTS( SELECT * FROM TaskTbl_Skill WHERE task_id = %s AND skill_id = value)", task, skills, task);
            sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
        }

        if (input.containsKey("positions")) {
            String positions = ((List<Map<String, Object>>) input.get("positions")).stream().map(item -> (Integer) item.get("id")).collect(Collectors.toList()).toString();
            query += String.format("" +
                    "INSERT INTO TaskTbl_Position (task_id,position_id) " +
                    "SELECT %s , value FROM OpenJson('%s') " +
                    "WHERE NOT EXISTS( SELECT * FROM TaskTbl_Position WHERE task_id = %s AND position_id = value)", task, positions, task);
            sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
        }


        Integer processId = processService.getProcessIdFromNode(Integer.parseInt(task));
        processService.incStatus(processId, ProcessStatus.PERFORMERS);
    }

    @Override
    public List getTaskUserCanCreate() {
        Integer userId = tokenPrinciple.getUserId();
        String query = String.format(
                        "                        DECLARE @UserArea int\n" +
                        "                        DECLARE @UserPosition int\n" +
                        "                        DECLARE @UserRule int\n" +
                        "                        DECLARE @UserID int = %s\n" +
                        "                        SELECT @UserArea = area_ID,\n" +
                        "                               @UserPosition = position_ID,\n" +
                        "                                @UserRule = businessRole_ID\n" +
                        "                        FROM UserTbl WHERE ID = @UserID\n" +
                        "                        SELECT DISTINCT\n" +
                        "                                        task.*,\n" +
                        "                                        ProcessTbl.displayName AS processName,\n" +
                        "                                        ( SELECT TOP(1) PET.id FROM ProcessEntityTbl PET WHERE PET.process_id = ProcessTbl.id AND mainModel=1 ) AS entityId\n" +
                        "                        FROM NodeTbl start\n" +
                        "                        INNER JOIN NodeTbl flow ON start.before_ID = flow.ID\n" +
                        "                        INNER JOIN NodeTbl task ON flow.before_ID = task.ID\n" +
                        "                        LEFT JOIN TaskTbl ON TaskTbl.ID = task.ID\n" +
                        "                        LEFT JOIN TaskTbl_Area TTA on TaskTbl.ID = TTA.task_id\n" +
                        "                        LEFT JOIN TaskTbl_BusinessRole TTBR on TaskTbl.ID = TTBR.task_id\n" +
                        "                        LEFT JOIN TaskTbl_Position TTP on TaskTbl.ID = TTP.task_id\n" +
                        "                        LEFT JOIN TaskTbl_Skill TTS on TaskTbl.ID = TTS.task_id\n" +
                        "                        INNER JOIN ProcessTbl ON ProcessTbl.id = task.process_id\n" +
                        "                        WHERE ProcessTbl.status = %s AND flow.type = 20 AND task.diagramId like '%%Activity%%' AND\n" +
                        "                        ( TTA.area_id = @UserArea OR\n" +
                        "                                TTBR.businessRole_id = @UserRule OR\n" +
                        "                                TTP.position_id = @UserPosition OR\n" +
                        "                                TTS.skill_id IN ( SELECT Us.Skill_id FROM User_Skill US WHERE user_id = @UserID ))",
                userId,
                ProcessStatus.RUNNING.ordinal()
        );

        return sessionFactory
                .getCurrentSession()
                .createNativeQuery(query)
                .setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE)
                .list();
    }

    @Override
    public Form getTaskForm(Integer activityId) {
        return (Form) sessionFactory.getCurrentSession().createCriteria(Form.class).add(Restrictions.eq("activityId", activityId)).uniqueResult();
    }
}
