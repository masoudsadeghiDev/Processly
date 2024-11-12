package com.masoud.bpms.Model.Bpms.BpmsNodes.Event;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "IntermediateCatchEventTbl")
public class IntermediateCatchEvent extends Node {

    public IntermediateCatchEvent() {
        this.type = NodeType.IntermediateCatchEvent;
    }
}
