package com.masoud.bpms.Model;

import javax.persistence.*;

@MappedSuperclass
public class BaseModel {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer ID;

    public Integer getID() {
        return ID;
    }

    public void setID(Integer id) {
        this.ID = id;
    }
}
