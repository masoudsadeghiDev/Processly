package com.masoud.bpms.Model.Organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.BaseModel;
import com.masoud.bpms.Model.Bpms.BpmsBaseModel;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "SkillTbl")
public class Skill extends BpmsBaseModel {

    private String description;
    @JsonIgnore
    @ManyToOne
    private Organization organization;
    @JsonIgnore
    @ManyToMany(mappedBy = "skills")
    private List<User> users;

    public Skill() {
    }

    public Skill(Integer id) {
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

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
