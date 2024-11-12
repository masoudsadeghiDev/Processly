package com.masoud.bpms.Service.Application;

import com.masoud.bpms.Model.Bpms.Application;

import java.util.List;

public interface ApplicationService {

    List<Application> getApplicationList();
    List<Application> getApplicationListWithProcess();

    void save(Application application);

}
