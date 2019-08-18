package com.turanyuksel.geocounter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;
import org.springframework.web.reactive.config.EnableWebFlux;

@Configuration
@EnableWebFlux
@EnableReactiveMongoRepositories
public class GeoStatConfiguration {    
    @Value("${MONGO_HOST:localhost}")
    private String host;
    @Value("27017")
    private Integer port;
    @Value("${MONGO_DBNAME:popularity}")
    private String databaseName;
    
    @Bean
    @Primary
    public MongoProperties getProperties() {
    	MongoProperties ret = new MongoProperties();
    	ret.setHost(host);
    	ret.setPort(port);
    	ret.setDatabase(databaseName);
    	return ret;
    }
}
