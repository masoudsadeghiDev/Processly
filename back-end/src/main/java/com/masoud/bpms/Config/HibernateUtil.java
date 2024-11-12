package com.masoud.bpms.Config;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Component;

public class HibernateUtil {


    private SessionFactory sessionFactory;

    private HibernateUtil() {
        this.sessionFactory = buildSessionFactory();
    }

    private synchronized static SessionFactory buildSessionFactory() {
        return new Configuration().configure().buildSessionFactory();
    }

    public Session getSessionFactory() {
        try {
            return this.sessionFactory.getCurrentSession();
        }catch (HibernateException exception){
            return this.sessionFactory.openSession();
        }
    }

}