package com.masoud.bpms.Model.Bpms.BpmsNodes.Flow;

import com.masoud.bpms.Model.Bpms.BpmsDataModel.Attribute;
import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;
import com.masoud.bpms.Model.Bpms.Process;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.util.List;

@Entity
@Table(name = "SequenceFlowTbl")
public class SequenceFlow extends Node {

    @OneToOne()
    private Node target;
    @OneToOne()
    private Node source;
    private String condition;

    public SequenceFlow() {
        this.type = NodeType.SequenceFlow;
    }

    public Node getTarget() {
        return target;
    }

    public void setTarget(Node target) {
        this.target = target;
        this.setBefore(target);
    }

    public Node getSource() {
        return source;
    }

    public void setSource(Node source) {
        this.source = source;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public void evaluateCondition(List<Attribute> attributes) {
        Process process = this.getProcess();
        ScriptEngineManager factory = new ScriptEngineManager();
        ScriptEngine engine = factory.getEngineByName("JavaScript");
    }
}
