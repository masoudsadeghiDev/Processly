package com.masoud.bpms.Model.Bpms.BpmsNodes.Gateway;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EventBasedGatewayTbl")
public class EventBasedGateway extends Node {

    public EventBasedGateway() {
        this.type = NodeType.EventBasedGateway;
    }
}
