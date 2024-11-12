package com.masoud.bpms.Model.Bpms.BpmsNodes.Gateway;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ComplexGatewayTbl")
public class ComplexGateway extends Node {
    private String ManualTask="hello";
    public ComplexGateway() {
        this.type = NodeType.ComplexGateway;
    }

    public String getManualTask() {
        return ManualTask;
    }

    public void setManualTask(String manualTask) {
        ManualTask = manualTask;
    }
}
