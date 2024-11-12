package com.masoud.bpms.Model.Bpms;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ApplicationTbl")
public class Application extends BpmsBaseModel {

    private String image;

    public Application() {
    }

    public Application(Integer id) {
        this.setId(id);
    }

    @OneToMany(mappedBy = "application")
    private List<Process> processes = new ArrayList<>();

    public List<Process> getProcesses() {
        return processes;
    }

    public void setProcesses(List<Process> processes) {
        this.processes = processes;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
