/**
 * TODO: it would be cool to have a method that optimized the 
 * layout for maximum compaction 
 * 
 */


kite.define("charming.core.GridsterLayout", function(Widget){
	return {
		items : [],
		itemMargins : [10,10],
		itemDimensions : [140,140],

		constructor : function(configuration) {
			this.callParent(arguments);
			this.layoutInitialized = false;

/*

var gridster = $(".gridster ul").gridster().data('gridster');
gridster.options.min_cols = 5; // Not necessarily required because of the following size changes, but I did it for clarity
gridster.options.widget_base_dimensions = [240, 400];
gridster.options.min_widget_width = 240;

// This section was for existing widgets. Apparently the code for drawing the droppable zones is based on the data stored in the widgets at creation time
for (var i = 0; i < gridster.$widgets.length; i++) {
    gridster.resize_widget($(gridster.$widgets[i]), 1, 1);
}

gridster.generate_grid_and_stylesheet();


^ change layout column count

*/

		},

		setRenderTarget : function(el) {
			this.renderTarget = el;
		},

		setOwner : function(container) {
			if(this.ownerCt) {
				throw "You cannot reuse the same layout instance";
			} else {
				this.ownerCt = container;
			}
		},

		configureItem : function(item) {
			item.ownerLayout = this;
		},

		initLayout : function() {
			if(!this.renderTarget) {
				throw "Unable to layout. Container is not rendered.";
			}

			if(!this.ownerCt.rendered) {
				//create gridster

				var target = $("ul").appendTo(this.renderTarget);

				this.gridster = $(target).gridster({
				    widget_margins: this.itemMargins,
				    widget_base_dimensions: this.itemDimensions
				}).data('gridster');

				this.renderChildren();
			}
		},

		add : function(childPanel) {
			this.items.push(childPanel);
			if(this.ownerCt.rendered) {
				if(childPanel.rendered) {
					//todo remove from current container, move el
					console.error("adding a rendered panel is not implemented yet");
				} else {
					this.renderItem(childPanel, this.renderTarget, this.items.length - 1);
				}
			}
		},

		renderChildren: function() {
	        var me = this,
	            items = me.items,
	            target = me.renderTarget;

	        for(var i=0;i<items.length;i++) {
	        	me.renderItem(items[i], target, i);
	        }

	        //all items rendered
	    },

		renderItem : function(item, target, position) {
	        var me = this;
	        if (!item.rendered) {
	            me.configureItem(item);
	            var itemTarget = $('<li class="new">').appendTo(target);
	            item.render(itemTarget, position);
	            this.gridster.add_widget(itemTarget, item.width || 1, item.height || 1);
	        }
	    },

	    afterRenderItem : function(item) {
	    	
	    },

	    updateLayout : function(item) {
			this.gridster.resize_widget($(item.el).parent(), item.width || 1, item.height || 1);
	    }
	}
});