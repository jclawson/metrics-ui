package com.jasonclawson.metrics.ui.api.metrics.v3;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class HistogramResult {
    private long   count;
    private long   max;
    private double mean;
    private long   min;
    private double p50;
    
    private double p75;
    private double p95;
    private double p98;
    private double p99;
    private double p999;
    private double stddev;
    
//    public HistogramResult(Histogram histogram) {
//        this.count = histogram.getCount();
//        
//        Snapshot snapshot = histogram.getSnapshot();
//        max = snapshot.getMax();
//        mean = snapshot.getMean();
//        min = snapshot.getMin();
//        p50 = snapshot.getValue(0.5);
//        p75 = snapshot.get75thPercentile();
//        p95 = snapshot.get95thPercentile();
//        p98 = snapshot.get98thPercentile();
//        p99 = snapshot.get99thPercentile();
//        p999 = snapshot.get999thPercentile();
//        stddev = snapshot.getStdDev();
//                
//    }
}
