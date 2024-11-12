package com.masoud.bpms.Model.Organization;

import com.masoud.bpms.Model.BaseModel;
import com.masoud.bpms.Model.Bpms.BpmsBaseModel;
import com.masoud.bpms.Model.Role;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "OrganizationTbl")
public class Organization extends BpmsBaseModel {

    private String description;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private List<Position> positions;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private List<BusinessRole> roles;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private List<User> users;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private List<Skill>  skills;

    public Organization() {
    }

    public Organization(Integer id) {
        this.setId(id);
    }


    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
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

    public List<BusinessRole> getRoles() {
        return roles;
    }

    public void setRoles(List<BusinessRole> roles) {
        this.roles = roles;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
}
