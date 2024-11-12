package com.masoud.bpms.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
public class PersistanceJpaConfig {

    @Bean
    public LocalSessionFactoryBean hibernateSessionFactory(DataSource dataSource) {
        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);
        sessionFactory.setPackagesToScan("com.masoud.bpms.Model");
        sessionFactory.setHibernateProperties(additionalProperties());
        return sessionFactory;
    }


    Properties additionalProperties() {
        Properties properties = new Properties();
        properties.setProperty("spring.jpa.hibernate.dialect", "org.hibernate.dialect.SQLServer2012Dialect");
        properties.setProperty("spring.jpa.show-sql", "true");
        properties.setProperty("spring.jpa.generate-ddl", "true");
        properties.setProperty("spring.jpa.hibernate.ddl-auto", "update");
        properties.setProperty("spring.jpa.hibernate.naming.physical-strategy", "org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl");
        properties.setProperty("spring.jpa.properties.hibernate.use_nationalized_character_data", "true");
        return properties;
    }

}