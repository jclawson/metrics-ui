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
			console.log(this.el);
			this.inputEl = this.el.find('.meter-knob');
			this.inputEl.knob({
               // 'change' : function (v) { console.log(v); },
                cursor : false,
                //displayInput : false,
                displayPrevious : true
            });
		},
		
		data : function(metrics) {
			var value = Math.round((metrics['jvm.memory.heap.used'].value / metrics['jvm.memory.heap.max'].value) * 100);
			var prevVal = this.inputEl.val();
			var diff = value - prevVal;
			this.inputEl.val(value).trigger('change');
			this.inputEl.html(value);
			
			var color, strVal;
			
			if(diff > 0) {
				color = "green";
				strVal = '+ '+diff;
			} else if(diff < 0) {
				color = "red";
				strVal = '- '+(-1*diff);
			}
			
			if(strVal) {
				this.el.find('.ival')
					.html(strVal)
					
					.stop(true, true)
					.show()
					.fadeOut(1500)
					.css('color', color)
					;
			}
		}
	}
});