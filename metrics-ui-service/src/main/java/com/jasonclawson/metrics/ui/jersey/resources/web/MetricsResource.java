package com.jasonclawson.metrics.ui.jersey.resources.web;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import lombok.RequiredArgsConstructor;

import com.codahale.metrics.annotation.Timed;
import com.jasonclawson.metrics.ui.api.metrics.v3.MetricsPageResult;
import com.jasonclawson.metrics.ui.client.MetricsUiClient;

@Path("/metrics")
@Produces(MediaType.APPLICATION_JSON)
//@Consumes(MediaType.APPLICATION_JSON)
@RequiredArgsConstructor
public class MetricsResource {
    private final MetricsUiClient client;
    
    @GET
    @Timed
    public MetricsPageResult getLocalMetrics() {
        //FIXME: just use the fancy constructor in MetricsPageResult
        String url = "http://localhost:8081/metrics";
        return client.getMetrics(url);
    }
}
