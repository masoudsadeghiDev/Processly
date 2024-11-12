package com.masoud.bpms.Service.Process;

import com.masoud.bpms.Model.Bpms.Application;
import com.masoud.bpms.Model.Bpms.Process;
import com.masoud.bpms.Model.Bpms.ProcessStatus;

import java.util.List;
import java.util.Map;

public interface ProcessService {

    Integer save(Process process);
    void saveXml(Process process);
    void submitProcess(Integer processId);
    Process getXml(Integer processId);

    public List<Process> getApplicationProcessList(Application application);
    public List<Process> getApplicationProcessList(Application application,ProcessStatus status,ProcessStatus justOneStatus);

    List<Process> getWizardProcess(Integer appId);

    boolean addToWizard(Integer processId);
    void changeStatus(Integer processId, ProcessStatus status);
    public void incStatus(Integer processId,ProcessStatus status);
    public Integer getProcessIdFromNode(Integer nodeID);
}
