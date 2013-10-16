kite.define("charming.charms.MeterCharm", function(Widget){
	return {
		extend : charming.core.MetricsCharm,
		
		constructor : function(configuration) {			
			this.callParent([kite.apply(configuration, {
				tpl : this.ondemandTemplate('charms/meter/meter.htm'), //TODO: make it so that it can just be meter.htm
				metrics : ['gauges.jvm.memory.heap.used', 'gauges.jvm.memory.heap.max']
			})]);
		},
		
		render : function(containerEl, index) {
			this.callParent(arguments);
			this.inputEl = this.el.find('.meter-knob');
			this.inputEl.knob({
                'change' : function (v) { console.log(v); }
            });
		},
		
		data : function(metrics) {
			var value = Math.round((metrics['jvm.memory.heap.used'].value / metrics['jvm.memory.heap.max'].value) * 100);
			this.inputEl.val(value).trigger('change');
		}
	}
});