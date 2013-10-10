package com.jasonclawson.metrics.ui.client;

import io.dropwizard.client.JerseyClientBuilder;
import io.dropwizard.client.JerseyClientConfiguration;
import io.dropwizard.setup.Environment;

import com.codahale.metrics.MetricRegistry;
import com.jasonclawson.metrics.ui.api.metrics.v3.MetricsPageResult;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;

public class MetricsUiClient {
    private final Client client;

    public MetricsUiClient(JerseyClientConfiguration config, MetricRegistry metricsRegistry) {
        client = new JerseyClientBuilder(metricsRegistry)
                .using(config)
                .build("metrics-ui-client");
    }
    
    public MetricsUiClient(JerseyClientConfiguration config, Environment environment) {
        client = new JerseyClientBuilder(environment)
                .using(config)
                .using(environment)
                .build("metrics-ui-client");
    }
    
    public MetricsPageResult getMetrics(String metricsPageUrl) {
        WebResource webResource = client.resource(metricsPageUrl);
        return webResource.get(MetricsPageResult.class);
    }
}
