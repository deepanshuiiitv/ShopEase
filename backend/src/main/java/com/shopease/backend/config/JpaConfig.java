package com.shopease.backend.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
public class JpaConfig {

    @Bean(name="mysqlEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean mysqlEntityManager(
            EntityManagerFactoryBuilder builder,
            @Qualifier("mysqlDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.shopease.backend.database.mysql")
                .persistenceUnit("mysql")
                .build();
    }

    @Bean(name="mysqlTransactionManager")
    public PlatformTransactionManager mysqlTransactionManager(
            @Qualifier("mysqlEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
