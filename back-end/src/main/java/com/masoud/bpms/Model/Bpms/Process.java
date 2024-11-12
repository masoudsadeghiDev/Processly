package com.masoud.bpms.Model.Bpms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.Attribute;
import com.masoud.bpms.Model.Bpms.BpmsDataModel.ProcessEntity;
import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ProcessTbl")
public class Process extends BpmsBaseModel {

    private boolean addTOWizard;
    @JsonIgnore
    @OneToMany(mappedBy = "process")
    private Set<Node> nodes = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "process")
    private List<ProcessEntity> entities;

    @JsonIgnore
    @ManyToOne
    @JoinColumn
    private Application application;

    @Column(columnDefinition = "ntext")
    private String xml;

    private ProcessStatus status;

    public Process() {

    }

    public Process(Integer id) {
        super(id);
    }


    public Set<Node> getNodes() {
        return nodes;
    }

    public void setNodes(Set<Node> nodes) {
        this.nodes = nodes;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public String getXml() {
        return xml;
    }

    public void setXml(String xml) {
        this.xml = xml;
    }

    public List<ProcessEntity> getEntities() {
        return entities;
    }

    public void setEntities(List<ProcessEntity> entities) {
        this.entities = entities;
    }

    public boolean isAddTOWizard() {
        return addTOWizard;
    }

    public void setAddTOWizard(boolean addTOWizard) {
        this.addTOWizard = addTOWizard;
    }

    public ProcessStatus getStatus() {
        return status;
    }

    public void setStatus(ProcessStatus status) {
        this.status = status;
    }
}
