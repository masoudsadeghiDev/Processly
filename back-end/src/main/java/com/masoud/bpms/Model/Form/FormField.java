package com.masoud.bpms.Model.Form;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "FormFieldTbl")
public class FormField {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "ntext")
    private String fieldUi;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFieldUi() {
        return fieldUi;
    }

    public void setFieldUi(String itemUi) {
        this.fieldUi = itemUi;
    }

}
