package com.jasonclawson.metrics.ui.api.metrics.v3;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class TimerResult {
    private long count;
    private double max;
    private double mean;
    private double min;
    private double p50;
    private double p75;
    private double p95;
    private double p98;
    private double p99;
    private double p999;
    private double stddev;
    private double m15_rate;
    private double m1_rate;
    private double m5_rate;
    private double mean_rate;    
    private String duration_units;
    private String rate_units;
    
//    public TimerResult(Timer timer) {
//        count = timer.getCount();
//        m15_rate = timer.getFifteenMinuteRate();
//        m5_rate = timer.getFiveMinuteRate();
//        mean_rate = timer.getMeanRate();
//        m1_rate = timer.getOneMinuteRate();
//        
//        Snapshot snapshot = timer.getSnapshot();
//        max = snapshot.getMax();
//        mean = snapshot.getMean();
//        min = snapshot.getMin();
//        p50 = snapshot.getValue(0.5);
//        p75 = snapshot.get75thPercentile();
//        p95 = snapshot.get95thPercentile();
//        p98 = snapshot.get98thPercentile();
//        p99 = snapshot.get99thPercentile();
//        p999 = snapshot.get999thPercentile();
//        stdev = snapshot.getStdDev();     
//        
//        rate_units = MetricsPageResult.calculateRateUnit(TimeUnit.SECONDS, "calls");
//        duration_units = TimeUnit.SECONDS.toString().toLowerCase(Locale.US);
//    }
}
