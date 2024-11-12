package com.masoud.bpms.Service.Application;

import com.masoud.bpms.Model.Bpms.Application;
import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Service.BaseService;
import com.masoud.bpms.Service.Process.ProcessService;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.masoud.bpms.Model.Bpms.Process;

import java.util.List;

@Service
public class ApplicationServiceImpl extends BaseService implements ApplicationService {
    @Autowired
    private ProcessService processService;


    @Override
    public List<Application> getApplicationList() {
        return getSession().createCriteria(Application.class)
                .setProjection(Projections.projectionList()
                        .add(Projections.property("id"), "id")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("image"), "image")
                        .add(Projections.property("displayName"), "displayName"))
                .setResultTransformer(Transformers.aliasToBean(Application.class)).list();
    }

    @Override
    public List<Application> getApplicationListWithProcess() {
        List<Application> applications = this.getApplicationList();
        applications.stream().forEach(app -> {
            List<Process> processes = processService.getApplicationProcessList(app);
            app.setProcesses(processes);
        });
        return applications;
    }

    @Override
    public void save(Application application) {
        Session session = this.getSession();
        session.saveOrUpdate(application);
    }

}
