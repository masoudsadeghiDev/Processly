package com.masoud.bpms.Config;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;

import static com.masoud.bpms.Config.DynamicDdlTest.XML_MAPPING;

@Component
public class SessionManagerService {

    private SessionFactory hibernateFactory;

    @Autowired(required = false)
    public SessionManagerService(EntityManagerFactory factory) {
        if (factory.unwrap(SessionFactory.class) == null) {
            throw new NullPointerException("factory is not a hibernate factory");
        }
        this.hibernateFactory = factory.unwrap(SessionFactory.class);

    }

    public Session getSession() {
            return this.hibernateFactory.openSession();
    }
}