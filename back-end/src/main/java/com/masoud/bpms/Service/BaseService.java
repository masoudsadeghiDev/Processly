package com.masoud.bpms.Service;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BaseService {

    @Autowired(required = false)
    protected SessionFactory sessionFactory;

    public Session getSession() {
        try {
            return sessionFactory.getCurrentSession();
        }catch (Exception e){
            return sessionFactory.openSession();
        }
    }
}
