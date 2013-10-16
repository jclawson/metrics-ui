package com.jasonclawson.metrics.ui.core.bundle;

import io.dropwizard.Bundle;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

import java.io.IOException;
import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class MetricsUiBundle implements Bundle {
    
    //private final String RESOURCE_PATH = "metrics-ui";
    private final String RESOURCE_PATH = "charming";
    
    private final String basePath;
    
    public MetricsUiBundle(String basePath) {
        if(basePath.endsWith("/"))
            this.basePath = basePath.substring(0, basePath.length() - 1);
        else
            this.basePath = basePath;
    }
    
    public MetricsUiBundle() {
        this.basePath = "/"+RESOURCE_PATH;
    }
    
    @Override
    public void initialize(Bootstrap<?> bootstrap) {       
        bootstrap.addBundle(new AssetsBundle("/"+RESOURCE_PATH+"/", basePath, "index.htm"));
    }

    @Override
    public void run(final Environment environment) {
        
        if(!basePath.equals("")) {
            //redirect metrics-ui to metrics-ui/
            FilterRegistration.Dynamic filterRegistration = environment.servlets().addFilter(RESOURCE_PATH, new Filter(){
                @Override
                public void init(FilterConfig filterConfig) throws ServletException {}
    
                @Override
                public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
                    ((HttpServletResponse)response).sendRedirect(basePath+"/");
                }
    
                @Override
                public void destroy() {}
                
            });
            
            filterRegistration.addMappingForUrlPatterns(EnumSet.of(DispatcherType.REQUEST), false, basePath);
        }
    }
    
}
