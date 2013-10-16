kite.define("charming.core.MetricsCharm", function(Widget){
	return {
			constructor : function(configuration) {
			this.callParent(arguments);
		},

		render : function(containerEl, index) {
			var tpl = this.tpl;
			
			if(typeof tpl == 'function') {
				tpl = tpl();
			} else if (tpl instanceof jQuery) {
				tpl = tpl.html();
			}			
			this.template = Handlebars.compile(tpl);
			
			this.el = $('<div>'+this.template()+'</div>').appendTo($(containerEl));
		},

		resize : function(w,h) {
			this.width = w;
			this.height = h;
			this.updateLayout();
		},

		updateLayout : function() {
			this.ownerLayout.updateLayout(this);
		},
		
		ondemandTemplate : function(path) {			
	        
			return function() {
				var source;
		        
				$.ajax({
		            url: path,
		            async : false,
		            cache: true,
		            success: function(data) {
		                source = data;
		            }               
		        });
				
				return source;
			};
		}
	}
});