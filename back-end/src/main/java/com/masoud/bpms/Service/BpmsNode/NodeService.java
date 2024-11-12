package com.masoud.bpms.Service.BpmsNode;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import java.util.List;

public interface NodeService {

    public Object getNodeByDiagramId(String diagramId);

    public Object getNodeById(Integer id);

    List getNextNodeByDiagramId(String diagramId);

    Object getFlowNextNodeByDiagramId(String diagramId);

    boolean evaluateCondition(String diagramId, Integer dataId);

    public void moveOnDiagram(Integer entityId, Integer requestId);

    Boolean connectedToGateway(String diagramId);

    void setArrowCondition(Integer flowId, String condition);

    Integer getCurrentStatus(Integer entityId, Integer requestId);

    void logRequestStatus(Integer entityId, Integer requestId, Integer status);

    NodeType getNodeType(Integer nodeID);
}
