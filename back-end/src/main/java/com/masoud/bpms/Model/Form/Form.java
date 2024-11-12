package com.masoud.bpms.Model.Form;

import com.masoud.bpms.Model.Bpms.BpmsBaseModel;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "FormTbl")
public class Form extends BpmsBaseModel {

    private Integer activityId;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "form_id", nullable = false)
    private List<FormField> fields;

    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }

    public List<FormField> getFields() {
        return fields;
    }

    public void setFields(List<FormField> items) {
        this.fields = items;
    }
}
