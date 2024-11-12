package com.masoud.bpms.Model.Bpms.BpmsNodes.Other;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PollTbl")
public class Poll  {

    @Id
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
