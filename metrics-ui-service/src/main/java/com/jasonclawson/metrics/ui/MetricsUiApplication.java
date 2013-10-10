package com.jasonclawson.metrics.ui;

import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

import com.jasonclawson.metrics.ui.client.MetricsUiClient;
import com.jasonclawson.metrics.ui.config.MetricsUiConfig;
import com.jasonclawson.metrics.ui.core.bundle.MetricsUiBundle;
import com.jasonclawson.metrics.ui.jersey.resources.web.MetricsResource;


public class MetricsUiApplication extends Application<MetricsUiConfig> {

    public static void main(String[] args) throws Exception {
        if (args.length >= 2 && args[1].startsWith("~")) {
            args[1] = System.getProperty("user.home") + args[1].substring(1);
        }

        new MetricsUiApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<MetricsUiConfig> bootstrap) {
        bootstrap.addBundle(new MetricsUiBundle("/"));
    }

    @Override
    public void run(MetricsUiConfig configuration, Environment environment) throws Exception {
        //environment.jersey().disable();
        environment.jersey().setUrlPattern("/api/*");

        MetricsUiClient client = new MetricsUiClient(configuration.getJerseyClient(), environment);        
        environment.jersey().register(new MetricsResource(client));
    }
}