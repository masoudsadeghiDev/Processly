package com.masoud.bpms.Model.Bpms.BpmsNodes.Activity;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "CallActivityTbl")
public class CallActivity extends Node {

    private String name;

    public CallActivity() {
        this.type = NodeType.CallActivity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
