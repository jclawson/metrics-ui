Ext.onReady(function(){
//	var getTools = function(){
//        return [{
//            xtype: 'tool',
//            type: 'gear',
//            handler: function(e, target, header, tool){
//                var portlet = header.ownerCt;
//                portlet.setLoading('Loading...');
//                Ext.defer(function() {
//                    portlet.setLoading(false);
//                }, 2000);
//            }
//        }];
//    };
    
	
	Ext.create('Ext.Viewport', {
		layout: 'border',
		
		items:[new ui.MetricsTree({
			id : "metrics-tree",
			region : "west",
			split : true,
			width : 200,
			listeners : {
				'openmetric' : function(type, name, metric) {
					var panel = null;
					switch(type) {
						case 'gauge':
							panel = new ui.GaugePortlet({	                	
			                    title: type+" | "+name,
			                    metricName : name,
			                    metricData : metric
			                });
							break;
						case 'counter':
						case 'meter':
						case 'histogram':
							panel = new ui.JsonObjectPortlet({
								title: type+" | "+name,
			                    metricName : name,
			                    metricData : metric
							});
					}
					
					if(panel) {
						Ext.getCmp('col-1').add(panel);
					} else {
						console.error("Metric type ",type," is not supported yet");
					}
				},
				
				'updatemetric' : function( metricType, metricKey, metric) {
					Ext.getCmp('metrics-panel').items.each(function(colPanel){
						colPanel.items.each(function(panel){
							if(panel.metricName == metricKey) {
								console.log("updating metric panel ",metricKey);
								panel.updateMetric(metric);
							}
						});
					});
				}
			}
		}), {
			region: 'center',
			xtype: 'portalpanel',
			id : 'metrics-panel',
			tbar : [{
				text : "Refresh",
				handler : function(){
					Ext.getCmp('metrics-tree').reloadMetrics();
				}
			}],
			items: [{
                id: 'col-1',
                items: []
            },{
                id: 'col-2',
                items: []
            },{
                id: 'col-3',
                items: []
            }]
		}]
	});	
});