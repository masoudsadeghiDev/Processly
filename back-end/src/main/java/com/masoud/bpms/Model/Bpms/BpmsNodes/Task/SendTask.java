package com.masoud.bpms.Model.Bpms.BpmsNodes.Task;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "SendTaskTbl")
public class SendTask extends Node {

    private String sendTask="hello";
    public SendTask() {
        this.type = NodeType.SendTask;
    }
}
