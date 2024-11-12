package com.masoud.bpms.Model.Organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.BaseModel;
import com.masoud.bpms.Model.Bpms.BpmsBaseModel;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "BusinessRoleTbl")
public class BusinessRole extends BpmsBaseModel {

    private String description;
    @JsonIgnore
    @ManyToOne
    private Organization organization;

    public BusinessRole() {
    }

    public BusinessRole(Integer id) {
        super(id);
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
