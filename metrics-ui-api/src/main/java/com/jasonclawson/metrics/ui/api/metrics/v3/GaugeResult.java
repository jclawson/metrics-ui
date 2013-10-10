package com.jasonclawson.metrics.ui.api.metrics.v3;

import lombok.Getter;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;

@NoArgsConstructor
@Getter
public class GaugeResult {
    @JsonProperty
    private Object value;
    
//    public GaugeResult(Gauge<?> gauge) {
//        this.value = gauge.getValue();
//    }
}
