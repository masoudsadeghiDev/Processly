package com.masoud.bpms.Service.Form;

import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Model.Form.Form;
import com.masoud.bpms.Service.Process.ProcessService;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.CriteriaDelete;

@Service
public class FormServiceImpl implements FormService {
    @Autowired
    private SessionFactory sessionFactory;
    @Autowired
    private ProcessService processService;


    @Override
    @Transactional
    public void create(Form form) {
        Form currentFrom = (Form) sessionFactory.getCurrentSession().createCriteria(Form.class).add(Restrictions.eq("activityId", form.getActivityId())).uniqueResult();
        if (currentFrom != null) {
            sessionFactory.getCurrentSession().createNativeQuery("delete from FormFieldTbl where form_id=" + currentFrom.getId()).executeUpdate();
            sessionFactory.getCurrentSession().createQuery("delete from Form where id=" + currentFrom.getId()).executeUpdate();
        }
        sessionFactory.getCurrentSession().saveOrUpdate(form);
        Integer processId = processService.getProcessIdFromNode(form.getActivityId());
        processService.incStatus(processId, ProcessStatus.FORM_DESIGN);
    }

    @Override
    public Form getFormByActivityId(Integer id) {
        return (Form) sessionFactory.getCurrentSession().createCriteria(Form.class).add(Restrictions.eq("activityId", id)).uniqueResult();

    }
}
