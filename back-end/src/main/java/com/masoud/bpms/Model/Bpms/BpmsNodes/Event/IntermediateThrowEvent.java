package com.masoud.bpms.Model.Bpms.BpmsNodes.Event;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "IntermediateThrowEventTbl")
public class IntermediateThrowEvent extends Node {
    public IntermediateThrowEvent() {
        this.type = NodeType.IntermediateThrowEvent;
    }
}
