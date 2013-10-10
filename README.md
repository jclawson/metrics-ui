metrics-ui
==========

Milestone Planning
==========
v1: Realtime graphing of codahale metrics (remote servers, and local dropwizard via bundle)
v2: allow creation of heatmaps
v3: optionally store metrics data in elastic search to do historical graphing. Have simple trending
v4: create MetricsReporter that can push metrics to the metrics-ui service
v5: start supporting other metrics sources

Proposed deployment types
==========
- dropwizard bundle 
- standalone service that queries the MetricsServlet
- MetricsReporter that pushes updates to the standalone service

