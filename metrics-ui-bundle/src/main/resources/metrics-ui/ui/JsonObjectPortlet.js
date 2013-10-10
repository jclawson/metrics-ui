/**
 * @class Ext.app.Portlet
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class that is managed by {@link Ext.app.PortalPanel}.
 */

Ext.define('ui.JsonObjectPortlet', {
    extend: 'Ext.app.Portlet',
    alias: 'ui.portlet.jsonobject',
    
    
    constructor: function (config) {
    	var json = JSON.stringify(config.metricData, null, '   ');    	
    	
    	Ext.apply(config, {
    		//cls : 'portlet-content',
    		border : false,
    		items : {
    			html : '<pre class="portlet-content">'+json+"</pre>"
    		}
    	});
    	
    	this.callParent(arguments);
    },
    
    updateMetric : function(metric) {
    	var json = JSON.stringify(metric, null, '   ');    	
    	this.items.get(0).update('<pre class="portlet-content">'+json+"</pre>");
    }
    
});