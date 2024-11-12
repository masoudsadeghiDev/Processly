package com.masoud.bpms.Config;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.cfg.Configuration;
import org.hibernate.tool.hbm2ddl.SchemaUpdate;
import org.hibernate.tool.schema.TargetType;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.ByteArrayInputStream;
import java.util.*;

//@Component
public class DynamicDdlTest {
	
    @Autowired
    private EntityManager entityManager;

	/**
	 * Persistent entities at runtime are not necessarily expressed in the form of POJO classes or JavaBean objects.
	  * Hibernate also supports dynamic models using Map during runtime and entity representations like DOM4J's tree model.
	  * With this method, you don't need to write persistent classes, just write mapping files.
	**/

    public static final String XML_MAPPING = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<!DOCTYPE hibernate-mapping PUBLIC\n" +
            "        \"-//Hibernate/Hibernate Mapping DTD 3.0//EN\"\n" +
            "        \"http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd\">\n" +
            "<hibernate-mapping>\n" +
            "    <class entity-name=\"Test\" table=\"test\">\n" +
            "        <id name=\"id\" type=\"java.lang.Long\" length=\"64\" unsaved-value=\"null\">\n" +
            "            <generator class=\"identity\" />\n" +
            "        </id>" +
            "      <property name = \"firstName\" column = \"first_name\" type = \"string\"/>\n" +
            "      <property name = \"lastName\" column = \"last_name\" type = \"string\"/>\n" +
            "      <property name = \"salary\" column = \"salary\" type = \"int\"/>"+
            "    </class>" +
            "</hibernate-mapping>";




    @PostConstruct
    public void testDynamicDdl() {
        System.out.println(XML_MAPPING);
        SessionFactory sessionFactory = entityManager.getEntityManagerFactory().unwrap(SessionFactory.class);
        StandardServiceRegistry serviceRegistry = sessionFactory.getSessionFactoryOptions().getServiceRegistry();
        MetadataSources metadataSources = new MetadataSources(serviceRegistry);
        sessionFactory.getSessionFactoryOptions();
        //Read the mapping file
        metadataSources.addInputStream(new ByteArrayInputStream(XML_MAPPING.getBytes()));
        Metadata metadata = metadataSources.buildMetadata();
        //Update the database schema, create the table if it does not exist, update the field if it exists, and will not affect the existing data
        SchemaUpdate schemaUpdate = new SchemaUpdate();
        schemaUpdate.execute(EnumSet.of(TargetType.DATABASE), metadata, serviceRegistry);

        //Merge configuration
        Configuration cfg = new Configuration();
        cfg.addInputStream(new ByteArrayInputStream(XML_MAPPING.getBytes()));
        SessionFactory newSessionFactory = cfg.buildSessionFactory(serviceRegistry);
        //Save the object
        Session newSession = newSessionFactory.openSession();
        for (int i = 0; i < 100; i++) {
            Map<String, Object> student = new HashMap<>();
            student.put("firstName", "Zhang San" + i);
            student.put("lastName", "Zhang San" + i);
            student.put("salary",  i);

            newSession.save("Test", student);
        }
        //Query all objects
        Query query = newSession.createQuery("from Test");
        List list = query.getResultList();
        System.out.println("resultList: " + list);
        list= newSession.createCriteria(Node.class).list();
//        list = query.getResultList();
        System.out.println("resultList: " + list);
    }

}