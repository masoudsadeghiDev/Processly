package com.masoud.bpms.Model.Bpms.BpmsNodes;

import com.masoud.bpms.Model.Bpms.Request;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "SequenceLogTbl")
public class SequenceLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Request request;
    private Integer entityId;
    private Integer currentStateId;
    private Date date;
    private Boolean isComplete;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEntityId() {
        return entityId;
    }

    public void setEntityId(Integer entityId) {
        this.entityId = entityId;
    }

    public Integer getCurrentStateId() {
        return currentStateId;
    }

    public void setCurrentStateId(Integer currentStateId) {
        this.currentStateId = currentStateId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Request getRequest() {
        return request;
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    public Boolean getComplete() {
        return isComplete;
    }

    public void setComplete(Boolean complete) {
        isComplete = complete;
    }
}
