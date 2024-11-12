package com.masoud.bpms.Model.Organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.BaseModel;
import com.masoud.bpms.Model.Bpms.BpmsBaseModel;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "AreaTbl")
public class Area extends BpmsBaseModel {

    @ManyToOne
    @JsonIgnore
    private Organization organization;

    private String description;

    public Area() {
    }

    public Area(Integer id) {
        super(id);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }
}
