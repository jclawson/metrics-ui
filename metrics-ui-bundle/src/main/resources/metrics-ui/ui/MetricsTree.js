 Ext.define('ui.MetricsTree', {
	 extend : 'Ext.tree.Panel',
	 constructor: function (config) {
		 
		 var store = Ext.create('Ext.data.TreeStore', {
			 fields : ['text','metricType', 'metric', 'fullPath'],
			 root: {
			        expanded: true
			 }
		  });
		 
		 config.store = store;
		 config.rootVisible = false;
		 
		 this.addEvents('openmetric');
		 
		 this.callParent(arguments);
         this.on('render', this.reloadMetrics, this, {single:true, delay:1});
         
         this.on('itemdblclick', this._onItemDoubleClick, this, {});
     },
     
     reloadMetrics : function() {
    	 var me = this;
    	 Ext.Ajax.request({
 		    url: '/api/metrics',
// 		    params: {
// 		        url : 'http://localhost:8081/metrics'
// 		    },
 		    success: function(response){
 		    	var metrics = Ext.decode(response.responseText);
 		    	me._renderTree(metrics);
 		    },
 		    failure: function(response, opts) {
 		        console.error('server-side failure with status code ' + response.status);
 		    },
 		    scope : this
 	 });
     },
     
     _renderTree : function(metrics) {
    	 
    	 Ext.Object.each(metrics.gauges, function(metricKey, metric){
    		 this._createMetricNode("gauge", "gauges."+metricKey, metric);
    	 }, this);
    	 
    	 Ext.Object.each(metrics.counters, function(metricKey, metric){
    		 this._createMetricNode("counter", "counters."+metricKey, metric);
    	 }, this);
    	 
    	 Ext.Object.each(metrics.histograms, function(metricKey, metric){
    		 this._createMetricNode("histogram","histograms."+metricKey, metric);
    	 }, this);
    	 
    	 Ext.Object.each(metrics.meters, function(metricKey, metric){
    		 this._createMetricNode("meter","meters."+metricKey, metric);
    	 }, this);
    	 
     },
     
     _createMetricNode : function(metricType, metricKey, metric) {
    	 var metricKeyArray = metricKey.split(".");
    	 //get or create folders
    	 var parent =  this.getRootNode();
    	 for(var i=0; i<metricKeyArray.length-1; i++) {
    		 var current = this._findNode(parent, metricKeyArray[i]);
    		 if(!current) {
    			 current = parent.appendChild({
    				 text : metricKeyArray[i]
    			 });
    		 }
    		 parent = current;
    	 }
    	 
    	 var metricNode = this._findNode(parent, metricKeyArray[metricKeyArray.length-1]);
    	 
    	 if(!metricNode) {    	 
	    	 //create the metric node
    		 metricNode = parent.appendChild({
	    		 text : metricKeyArray[metricKeyArray.length-1],
	    		 leaf: true,
	    		 metric : metric,
	    		 metricType : metricType,
	    		 fullPath : metricKey
	    	 });
    	 } else {
    		 //update the metric node
    		 metricNode.set("metric", metric);
    		 this.fireEvent('updatemetric', metricType, metricKey, metric)
    	 }
     },
     
     _findNode : function(parent, name) {
    	 var foundNode = parent.findChildBy(function(node){
    		 return node.data.text == name;
    	 });
    	 
    	 return foundNode;
     },
     
     _onItemDoubleClick : function(tree, node, item, index, e, eOpts) {
    	 console.log("NODE: ",node);
    	 if(node.isLeaf()) {
    		 this.fireEvent('openmetric', node.data.metricType, node.data.fullPath, node.data.metric)
    	 }
     }
     
 });