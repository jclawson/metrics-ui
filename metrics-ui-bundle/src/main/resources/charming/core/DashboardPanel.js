kite.define("charming.core.DashboardPanel", function(Widget){
	return {
		layout : new charming.core.GridsterLayout(),
		items : [],

		constructor : function(configuration) {
			var items = kite.extract(configuration, 'items').items;
			this.callParent(arguments);
			this.layout.setOwner(this);
			for(var i=0; i<items.length; i++) {
				this.add(items[i]);
			}
		},

		render : function(containerEl) {
			if(!this.rendered) {
				this.el = $('<ul>').appendTo($('<div class="gridster">').appendTo(containerEl));
				this.layout.setRenderTarget(this.el);				
				this.layout.initLayout();
				this.rendered = true;
			}
		},

		add : function(item) {
			this.items.push(item);
			this.layout.add(item);
		}
	}
});