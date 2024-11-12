package com.masoud.bpms.Model.Bpms.BpmsNodes.Task;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "BusinessRuleTaskTbl")
public class BusinessRuleTask extends Node {

    public BusinessRuleTask() {
        this.type = NodeType.BusinessRuleTask;
    }
}
