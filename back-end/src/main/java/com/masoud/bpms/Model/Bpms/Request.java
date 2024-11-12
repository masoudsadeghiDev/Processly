package com.masoud.bpms.Model.Bpms;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "RequestTbl")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = 0;
    private Date date;
    private Integer sender;
    private Integer processId;

    public Request() {
    }

    public Request(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date data) {
        this.date = data;
    }

    public Integer getSender() {
        return sender;
    }

    public void setSender(Integer sender) {
        this.sender = sender;
    }

    public Integer getProcessId() {
        return processId;
    }

    public void setProcessId(Integer processId) {
        this.processId = processId;
    }
}
