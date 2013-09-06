package com.angular.sandbox;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.web.context.ConfigurableWebApplicationContext;

/**
 * ContextProfileInitializer -
 *
 * @author spark <pierre.gayvallet@gmail.com>
 */
public class ContextProfileInitializer implements ApplicationContextInitializer<ConfigurableWebApplicationContext> {

    private static final Logger log = Logger.getLogger(ContextProfileInitializer.class);

    @Override
    public void initialize(ConfigurableWebApplicationContext applicationContext) {
        // log.info("**** koin !");
        // applicationContext.getEnvironment().getActiveProfiles();
        // log.warn("getenv  " + System.getenv("ENV_NAME"));
        // log.warn("getProperty " +  System.getProperty("ENV_NAME"));
    }
}
