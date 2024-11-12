package com.masoud.bpms.Model.Organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.BaseModel;
import com.masoud.bpms.Model.Bpms.BpmsBaseModel;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name = "Position")
@Table(name = "PositionTbl")
public class Position extends BpmsBaseModel {

    private Integer parentId;
    private String description;
    private Boolean existInChart;

    public Position() {
    }

    public Position(Integer id) {
        super(id);
    }

    @ManyToOne
    @JsonIgnore
    private Organization organization;

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
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

    public Boolean getExistInChart() {
        return existInChart;
    }

    public void setExistInChart(Boolean existInChart) {
        this.existInChart = existInChart;
    }
}
