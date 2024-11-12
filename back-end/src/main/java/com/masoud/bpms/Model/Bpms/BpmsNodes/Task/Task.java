package com.masoud.bpms.Model.Bpms.BpmsNodes.Task;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;
import com.masoud.bpms.Model.Organization.Area;
import com.masoud.bpms.Model.Organization.BusinessRole;
import com.masoud.bpms.Model.Organization.Position;
import com.masoud.bpms.Model.Organization.Skill;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "TaskTbl")
public class Task extends Node {

    @ManyToMany
    @JoinTable(
            name = "TaskTbl_Position",
            joinColumns = { @JoinColumn(name = "task_id") },
            inverseJoinColumns = { @JoinColumn(name = "position_id") }
    )
    private List<Position> positions;

    @ManyToMany
    @JoinTable(
            name = "TaskTbl_Area",
            joinColumns = { @JoinColumn(name = "task_id") },
            inverseJoinColumns = { @JoinColumn(name = "area_id") }
    )
    private List<Area> areas;

    @ManyToMany
    @JoinTable(
            name = "TaskTbl_BusinessRole",
            joinColumns = { @JoinColumn(name = "task_id") },
            inverseJoinColumns = { @JoinColumn(name = "businessRole_id") }
    )
    private List<BusinessRole> businessRoles;

    @ManyToMany
    @JoinTable(
            name = "TaskTbl_Skill",
            joinColumns = { @JoinColumn(name = "task_id") },
            inverseJoinColumns = { @JoinColumn(name = "skill_id") }
    )
    private List<Skill> skills;

    public Task() {
        this.type = NodeType.Task;
    }

    public List<Position> getPositions() {
        return positions;
    }

    public void setPositions(List<Position> positions) {
        this.positions = positions;
    }

    public List<Area> getAreas() {
        return areas;
    }

    public void setAreas(List<Area> areas) {
        this.areas = areas;
    }

    public List<BusinessRole> getBusinessRoles() {
        return businessRoles;
    }

    public void setBusinessRoles(List<BusinessRole> businessRoles) {
        this.businessRoles = businessRoles;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }
}
