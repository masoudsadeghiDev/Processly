package com.masoud.bpms.Model.Bpms.BpmsNodes.Event;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EndEventTbl")
public class EndEvent extends Node {
    private String eventName;

    public EndEvent() {
        this.type = NodeType.EndEvent;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
}
