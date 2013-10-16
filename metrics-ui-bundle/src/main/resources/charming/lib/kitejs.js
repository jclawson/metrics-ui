
window.kite = {

	/**
	 * 
	 * 
	 */
	apply : function(destination, source, defaults) {
		if (defaults) {
            kite.apply(destination, defaults);
        }

        if (destination && source && typeof source === 'object') {
            var key;
            for (key in source) {
                destination[key] = source[key];
            }
        }

        return destination;
	},

	list : function() {
	    if(arguments.length > 1) {
	        return Array.prototype.slice.call(arguments, 0);
	    } else if(!(arguments[0] instanceof Array)) {
	        return Array.prototype.slice.call(arguments[0], 0)
	    } else {
	        return arguments[0];
	    }
	},

	/**
	 * Extracts properties from source and returns 
	 * them as a new object. The properties are 
	 * removed from source
	 */
	extract : function(source, properties) {		
		var result = {};
		if(source) {
            if(!(properties instanceof Array))
               properties = this.list(arguments).slice(1);
			for(var i=0; i<properties.length; i++) {
				result[properties[i]] = source[properties[i]];
				delete source[properties[i]];
			}
		}
		return result;
},

	define: function (className, data, createdFn) {
        var namespacePath = className.split(".");
        var className = namespacePath[namespacePath.length-1];
        var package = window;
        for (var i = 0; i < namespacePath.length - 1; i++) {
            if (!package[namespacePath[i]]) {
                package = (package[namespacePath[i]] = {});
            } else {
                package = package[namespacePath[i]];
            }
        }

        var ref = {};
        var clazz = function(){
        	if(ref.constructor) {
        		ref.constructor.apply(this, arguments);
        		//if kite.Object's constructor was not called... then call it here
        		//todo: is this a bad idea calling the super constructor last???
        		if(!this.$__constructed) {
        			console.log(ref.constructor.$ownerName, " didn't call callParent so I will");
        			this.callParent(arguments);
        		}
        	}
        };
        package[className] = clazz; //assign the class to its package
        var clazzPrototype = clazz.prototype;
        clazzPrototype.$package = package;

        if (typeof data == "function") {
			data = data.call(window, clazz);			
        }

        ref.constructor = data.constructor;
        if(ref.constructor) {
        	ref.constructor.$name = "constructor";
        	ref.constructor.$owner = clazz;
        	ref.constructor.$ownerName = className;
        }

        clazz.$name = "constructor";
        clazz.$owner = clazz;
        clazz.$ownerName = className;

        var reserved = ['constructor', 'statics', 'extend'];

        if(data.extend !== false) {
	        //our definition of kite.Object sets extend to false... we can't extend ourself! :-P
	        //always extend kite.Object at least
	        data.extend = data.extend || kite.Object;

	        if(data.extend) {
	        	//TODO: we need to go traverse up the class hierarchy to see this
	        	//if(!(data.extend instanceof kite.Object)) {
	        	//	throw className+" must extend a kite.Object";
	        	//}

	        	for(var prop in data.extend.prototype) {
	        		clazzPrototype[prop] = data.extend.prototype[prop];
	    		}
	    		clazz.$superclass = data.extend;
	        }
    	}

        for(var prop in data) {
        	if(reserved.indexOf(prop) == -1) {
        		if(clazzPrototype[prop]) {
					//we are overriding... do we care?
        		}
        		clazzPrototype[prop] = data[prop];
        		if(typeof data[prop] == 'function') {
        			clazzPrototype[prop].$owner = package[className];
        			clazzPrototype[prop].$name = prop;
        		}
        	}
    	}

    	clazzPrototype.callParent = function(args) {
    		var caller = clazzPrototype.callParent.caller;
    		if(caller.$owner.$superclass) {
    			return caller.$owner.$superclass.prototype[caller.$name].apply(this, args);
    		} else {
    			console.log(caller.$ownerName, " has no parent class");
    		}
    	};

    	if(data.statics) {
    		for(var key in data.statics) {
    			clazz[key] = data.statics[key];
    		}
    	}
    } 
};

kite.define("kite.Object", {
	extend : false,
	constructor : function(configuration) {
		var listeners = kite.extract(configuration, 'listeners').listeners;
		kite.apply(this, configuration);		
		
		//todo: private method to apply listeners
		if(typeof this.$events === 'undefined')
			this.$events = {};

		if(listeners) {
			for(var key in listeners) {
				if(this.$events[key]) {
					this.$events[key] = this.$events[key].concat(listeners[key]);
				} else {
					throw "Unable to listen to undefined event: "+key;
				}
			}
		}

		this.$__constructed = true;
	},

	fireEvent : function(name) {
		var listeners = this.$events[name];
		if(typeof listeners === 'undefined') {
			throw "Unable to fire undefined event: "+name;
		}

		var args = kite.list(arguments).slice(1);
		for(var i=0; i<listeners.length; i++) {
			//todo: support "scope", "single", "delay"
			listeners[i].apply(this, args);
		}
	},

	declareEvents : function(events) {
		if(typeof this.$events === 'undefined')
			this.$events = {};
        events = [].concat(events);
		for(var i=0; i<events.length; i++) {
			this.$events[events[i]] = [];
		}
	}

});