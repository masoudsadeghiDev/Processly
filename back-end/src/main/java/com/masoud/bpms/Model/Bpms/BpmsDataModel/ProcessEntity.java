package com.masoud.bpms.Model.Bpms.BpmsDataModel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.Bpms.BpmsBaseModel;
import com.masoud.bpms.Model.Bpms.Process;
import org.hibernate.SessionFactory;

import javax.persistence.*;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "ProcessEntityTbl")
public class ProcessEntity extends BpmsBaseModel {

    private String description;
    private EntityType entityType;
    private Boolean mainModel;

    @JsonIgnore
    @ManyToOne
    private Process process;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "entity_id", nullable = false)
    private List<Attribute> attributes;

    @ManyToMany
    @JoinTable(name = "ProcessEntityTbl_ProcessEntityTbl",
            joinColumns = @JoinColumn(name = "source_id"),
            inverseJoinColumns = @JoinColumn(name = "target_id")
    )
    private Set<ProcessEntity> connectedEntity;

    public ProcessEntity() {
        this.setDisplayName(this.getName());
    }

    public ProcessEntity(Integer id) {
        this.setId(id);
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<Attribute> attributes) {
        this.attributes = attributes;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ProcessEntity> getConnectedEntity() {
        return connectedEntity;
    }

    public void setConnectedEntity(Set<ProcessEntity> connectedEntity) {
        this.connectedEntity = connectedEntity;
    }

    public Process getProcess() {
        return process;
    }

    public void setProcess(Process process) {
        this.process = process;
    }

    public String getTableName() {
        return String.format("PROCESS_ENTITY_%s_%s_TBL", this.process.getId(), getName().toUpperCase());
    }

    public EntityType getEntityType() {
        return entityType;
    }

    public void setEntityType(EntityType entityType) {
        this.entityType = entityType;
    }

    public Boolean getMainModel() {
        return mainModel;
    }

    public void setMainModel(Boolean mainModel) {
        this.mainModel = mainModel;
    }

    @Override
    public String getName() {
        if (this.process != null) {
            return String.format("%s_%s", super.getName(), process.getId());
        } else {
            return super.getName();
        }

    }

    @JsonIgnore
    public String getOriginalName() {
        return super.getName();
    }

    @Override
    public String toString() {
        if (attributes == null || attributes.equals(""))
            return "";
        String attributes = this.attributes
                .stream()
                .map(attr -> attr.toString())
                .reduce("", (total, item) -> total + item);

        String result = String.format(
                "<class  entity-name= \"%s\" table = \"%s\">\n" +
                        "<id name = \"id\" type = \"int\" column = \"id\">\n" +
                        "   <generator class=\"native\"/>\n" +
                        "</id>\n" +
                        "%s" +
                        "</class>\n",
                getName(), getTableName(), attributes);

        return result.replace("<entity>", getName());
    }

    public static String toHibernateMapping(List<ProcessEntity> entities) {
        return String.format(
                "<?xml version = \"1.0\" encoding = \"utf-8\"?>\n" +
                        "<!DOCTYPE hibernate-mapping PUBLIC \n" +
                        "\"-//Hibernate/Hibernate Mapping DTD//EN\"\n" +
                        "\"http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd\"> \n" +
                        "\n" +
                        "<hibernate-mapping>\n" +
                        "%s" +
                        "</hibernate-mapping>",
                entities
                        .stream()
                        .map(entity -> entity.toString())
                        .reduce("", (total, item) -> total + item));
    }

    @JsonIgnore
    public Map toValidData(Map<String, Object> data) {

        this.attributes.forEach(attribute -> {
            String name = attribute.getName();
            switch (attribute.getType()) {
                case ONE_TO_MANY:
                case MANY_TO_MANY:
                    data.put(name, new HashSet((List) data.get(name)));
                    break;
            }
        });

        return data;
    }


}
