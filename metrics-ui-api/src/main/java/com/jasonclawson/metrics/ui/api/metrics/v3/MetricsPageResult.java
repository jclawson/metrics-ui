package com.jasonclawson.metrics.ui.api.metrics.v3;

import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * This is used to parse the output of the {@link MetricsServlet} so we can query remove metrics instances
 * 
 * @author jclawson
 *
 */
@NoArgsConstructor
@Getter
public class MetricsPageResult {
    @JsonProperty("version")
    private String version;
    
    private Map<String, GaugeResult>     gauges;
    private Map<String, CounterResult>   counters;
    private Map<String, MeterResult>     meters;
    private Map<String, HistogramResult> histograms;
    private Map<String, TimerResult>     timers;
    
//    @SuppressWarnings("rawtypes")
//    public MetricsPageResult(MetricRegistry metrics) {
//        //FIXME: this is kinda shitty
//        MetricsModule metricsModule = new MetricsModule(TimeUnit.SECONDS, TimeUnit.SECONDS, false);
//        this.version = metricsModule.version().toString();
//        
//        //metrics.getGauges()
//        gauges = Maps.transformValues(metrics.getGauges(), new Function<Gauge, GaugeResult>(){
//            @Override
//            public GaugeResult apply(Gauge gauge) {
//                return new GaugeResult(gauge);
//            }            
//        });
//        
//        counters = Maps.transformValues(metrics.getCounters(), new Function<Counter, CounterResult>(){
//            @Override
//            public CounterResult apply(Counter counter) {
//                return new CounterResult(counter);
//            }            
//        });
//        
//        meters = Maps.transformValues(metrics.getMeters(), new Function<Meter, MeterResult>(){
//            @Override
//            public MeterResult apply(Meter meter) {
//                return new MeterResult(meter);
//            }            
//        });
//        
//        histograms = Maps.transformValues(metrics.getHistograms(), new Function<Histogram, HistogramResult>(){
//            @Override
//            public HistogramResult apply(Histogram histogram) {
//                return new HistogramResult(histogram);
//            }            
//        });
//        
//        timers = Maps.transformValues(metrics.getTimers(), new Function<Timer, TimerResult>(){
//            @Override
//            public TimerResult apply(Timer timer) {
//                return new TimerResult(timer);
//            }            
//        });
//    }
    
//    protected static String calculateRateUnit(TimeUnit unit, String name) {
//        final String s = unit.toString().toLowerCase(Locale.US);
//        return name + '/' + s.substring(0, s.length() - 1);
//    }
}
