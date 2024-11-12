package com.masoud.bpms.Model.Bpms.BpmsNodes.Gateway;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ParallelGatewayTbl")
public class ParallelGateway extends Node {

    public ParallelGateway() {
        this.type = NodeType.ParallelGateway;
    }
}
