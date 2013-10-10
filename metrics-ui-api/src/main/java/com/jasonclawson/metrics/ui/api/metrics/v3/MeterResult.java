package com.jasonclawson.metrics.ui.api.metrics.v3;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class MeterResult {
    private long count;
    private double m15_rate;
    private double m1_rate;
    private double m5_rate;
    private double mean_rate;
    private String units;
    
//    public MeterResult(Meter meter) {
//        count = meter.getCount();
//        m15_rate = meter.getFifteenMinuteRate();
//        m1_rate = meter.getOneMinuteRate();
//        m5_rate = meter.getFiveMinuteRate();
//        mean_rate = meter.getMeanRate();
//        units = MetricsPageResult.calculateRateUnit(TimeUnit.SECONDS, "events");
//    }
}
