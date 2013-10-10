/**
 * @class Ext.app.Portlet
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class that is managed by {@link Ext.app.PortalPanel}.
 */
Ext.define('ui.GaugePortlet', {
    extend: 'Ext.app.Portlet',
    alias: 'ui.portlet.gauge',
    
    
    constructor: function (config) {
    	Ext.apply(config, {
    		//cls : 'portlet-content',
    		border : false,
    		items : {
    			html : '<pre class="portlet-content">'+config.metricData.value+"</pre>"
    		}
    	});
    	
    	this.callParent(arguments);
    },
    
    updateMetric : function(metric) {
    	this.items.get(0).update('<pre class="portlet-content">'+metric.value+"</pre>");
    }
    
});