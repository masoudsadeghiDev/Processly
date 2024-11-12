package com.masoud.bpms.Service.Request;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Event.StartEvent;
import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Model.Bpms.Request;
import com.masoud.bpms.Service.User.UserService;
import com.masoud.bpms.Utility.Security.TokenPrinciple;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {

    @Autowired
    private TokenPrinciple tokenPrinciple;
    @Autowired
    private SessionFactory sessionFactory;
    @Autowired
    private UserService userService;

    @Override
    public Integer createRequest(Integer processId) {
        Request request = new Request();
        request.setDate(new Date());
        request.setProcessId(processId);
        request.setSender(tokenPrinciple.getUserId());
        return (Integer) sessionFactory.getCurrentSession().save(request);
    }

    @Override
    public List<Request> getUserSendRequests(Integer page, Integer size) {
        Integer userId = tokenPrinciple.getUserId();
        String query = String.format(
                        "       DECLARE @PageIndex int = %s\n" +
                                "DECLARE @PageSize int = %s\n" +
                                "DECLARE @UserID int = %s\n" +
                                "SELECT DISTINCT\n" +
                                "       request.*,\n" +
                                "       CONCAT(UserTbl.name,' ',UserTbl.family) AS senderFullName,\n" +
                                "      process.name ,\n" +
                                "      process.displayName,\n" +
                                "       (\n" +
                                "           SELECT name FROM NodeTbl WHERE  NodeTbl.ID = (\n" +
                                "                    SELECT TOP(1) currentStateId FROM SequenceLogTbl WHERE request_id = request.id ORDER BY SequenceLogTbl.date DESC\n" +
                                "               )\n" +
                                "           ) AS status\n" +
                                "FROM RequestTbl request\n" +
                                "INNER JOIN ProcessTbl process ON process.id = request.processId\n" +
                                "INNER JOIN UserTbl on request.sender = UserTbl.ID\n" +
                                "WHERE process.status = %s AND request.sender =@UserID\n" +
                                "ORDER BY request.date DESC\n" +
                                "OFFSET (@PageIndex -1 ) * @PageSize   ROWS\n" , page, size,userId, ProcessStatus.RUNNING.ordinal());
        return sessionFactory
                .getCurrentSession()
                .createNativeQuery(query)
                .setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE)
                .list();
    }

    @Override
    public List<Request> getUserReceivedRequests(Integer page, Integer size) {
        Integer userId = tokenPrinciple.getUserId();
        String query = String.format("" +
                "\n" +
                "DECLARE @PageIndex int = %s\n" +
                "DECLARE @PageSize int = %s\n" +
                "DECLARE @UserID int = %s\n" +
                "DECLARE @UserArea int\n" +
                "DECLARE @UserRule int\n" +
                "DECLARE @UserPosition int\n" +
                "\n" +
                "SELECT\n" +
                "       @UserArea = area_ID,\n" +
                "       @UserPosition = position_ID,\n" +
                "       @UserRule = businessRole_ID\n" +
                "FROM UserTbl WHERE ID = @UserID\n" +
                "\n" +
                "SELECT DISTINCT\n" +
                "    RequestTbl.*,\n" +
                "    CONCAT(UserTbl.name,' ',UserTbl.family) AS senderFullName,\n" +
                "    process.name ,\n" +
                "    process.displayName,\n" +
                "    node.name AS status," +
                "    TaskTbl.ID  activityId\n" +
                "FROM RequestTbl\n" +
                "INNER JOIN ProcessTbl process ON process.id = RequestTbl.processId\n" +
                "INNER JOIN TaskTbl ON TaskTbl.ID = (SELECT TOP (1) currentStateId FROM SequenceLogTbl WHERE request_id = RequestTbl.id ORDER BY date DESC)\n" +
                "INNER JOIN NodeTbl node ON TaskTbl.ID = node.ID\n" +
                "INNER JOIN UserTbl on RequestTbl.sender = UserTbl.ID\n" +
                "LEFT JOIN TaskTbl_Area TTA on TaskTbl.ID = TTA.task_id\n" +
                "LEFT JOIN TaskTbl_BusinessRole TTBR on TaskTbl.ID = TTBR.task_id\n" +
                "LEFT JOIN TaskTbl_Position TTP on TaskTbl.ID = TTP.task_id\n" +
                "LEFT JOIN TaskTbl_Skill TTS on TaskTbl.ID = TTS.task_id\n" +
                "WHERE process.status = %s AND TTA.area_id = @UserArea OR\n" +
                "      TTBR.businessRole_id = @UserRule OR\n" +
                "      TTP.position_id = @UserPosition OR\n" +
                "      TTS.skill_id IN ( SELECT Us.Skill_id FROM User_Skill US WHERE user_id = @UserID )\n" +
                "ORDER BY RequestTbl.date DESC\n" +
                "OFFSET (@PageIndex -1 ) * @PageSize   ROWS\n" +
                "FETCH NEXT @PageSize ROWS ONLY\n" , page, size, userId,ProcessStatus.RUNNING.ordinal());

        return sessionFactory
                .getCurrentSession()
                .createNativeQuery(query)
                .setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE)
                .list();
    }

    @Override
    public void getRequestCanStart() {

    }

    @Override
    public Object getRequestStatistic(Integer appId,boolean allUser) {
        String query=String.format(
                        "DECLARE @Complete int = 0\n" +
                        "DECLARE @Running int = 0\n" +
                        "DECLARE @UserID int = %s\n" +
                        "DECLARE @App int =%s\n" +
                        "DECLARE @CompleteRequest Table (\n" +
                        "\tid int ,\n" +
                        "\trequest_id int\n" +
                        ");\n" +
                        "DECLARE @RunningRequest Table (\n" +
                        "\tid int ,\n" +
                        "\trequest_id int\n" +
                        ");\n" +
                        "\n" +
                        "INSERT INTO @CompleteRequest\n" +
                        "SELECT RequestTbl.id,request_id  FROM SequenceLogTbl \n" +
                        "INNER JOIN RequestTbl ON RequestTbl.id = request_id\n" +
                        "INNER JOIN ProcessTbl ON RequestTbl.processId = ProcessTbl.id\n" +
                        "INNER JOIN ApplicationTbl ON ApplicationTbl.id = application_id\n" +
                        "WHERE isComplete = 1 AND application_id = @App AND (@UserID IS NULL OR request_id IN (SELECT id FROM RequestTbl WHERE sender = @UserID))\n" +
                        "\n" +
                        "INSERT INTO @RunningRequest\n" +
                        "SELECT RequestTbl.id,request_id  FROM SequenceLogTbl \n" +
                        "INNER JOIN RequestTbl ON RequestTbl.id = request_id\n" +
                        "INNER JOIN ProcessTbl ON RequestTbl.processId = ProcessTbl.id\n" +
                        "INNER JOIN ApplicationTbl ON ApplicationTbl.id = application_id\n" +
                        "WHERE isComplete = 0AND application_id = @App AND (@UserID IS NULL OR request_id IN (SELECT id FROM RequestTbl WHERE sender = @UserID))\n" +
                        "\n" +
                        "SET @Complete= ( SELECT ISNULL(SUM(1), 0 ) AS Complete FROM (\n" +
                        "\tSELECT COUNT(*) AS reqCount FROM @CompleteRequest  \n" +
                        "\tGROUP BY request_id) AS temp\n" +
                        ")\n" +
                        "SET @Running= ( SELECT ISNULL(SUM(1), 0 )  AS Complete FROM (\n" +
                        "\tSELECT COUNT(*) AS reqCount FROM  @RunningRequest \n" +
                        "\tGROUP BY request_id) AS temp\n" +
                        ")\n" +

                        "DECLARE @CompleteByProcess nvarchar(MAX) \n" +
                        "DECLARE @RunningByProcess nvarchar(MAX) \n" +
                        "\n" +
                        "SET @CompleteByProcess= (SELECT processId,displayName,COUNT(*) AS CompleteCount FROM RequestTbl\n" +
                        "INNER JOIN ProcessTbl ON processId = ProcessTbl.id\n" +
                        "WHERE RequestTbl.id IN (SELECT DISTINCT request_id FROM @RunningRequest)\n" +
                        "GROUP BY processId ,displayName\n" +
                        "FOR JSON PATH)\n" +

                        "SET @RunningByProcess = (SELECT processId,displayName,COUNT(*) AS RunningCount FROM RequestTbl\n" +
                        "INNER JOIN ProcessTbl ON processId = ProcessTbl.id\n" +
                        "WHERE RequestTbl.id IN (SELECT DISTINCT request_id FROM @CompleteRequest)\n" +
                        "GROUP BY processId ,displayName\n" +
                        "FOR JSON PATH)\n" +
                        "SELECT @Complete AS Complete,@Running AS Running,@CompleteByProcess AS CompleteByProcess,@RunningByProcess AS RunningByProcess",
                allUser ? null:tokenPrinciple.getUserId(),appId
        );

        return sessionFactory.getCurrentSession().createNativeQuery(query).setResultTransformer(AliasToEntityMapResultTransformer.INSTANCE).uniqueResult();
    }
}
