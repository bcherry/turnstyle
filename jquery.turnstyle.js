(function() {
	var loadedFiles = {};
	var seed = 0;
	jQuery.css = function(filename, obj) {
		if (typeof obj == "undefined") {
			if (loadedFiles[filename]) { 
				return;
			}
			loadedFiles[filename] = true;
		}
		jQuery.get(filename, function(data) {
			var head = document.getElementsByTagName("head")[0];
			var styleTag = document.createElement("style");
			var text = data;
			console.log(text);
			if (typeof obj != "undefined") {
				var re = /\s*([a-z0-9\.# -_:@]+\s*{)/gim;
				var namespace = "__css" + seed++;
				text = text.replace(re, '\n.' + namespace + ' $1');
				obj.addClass(namespace);
				console.log(text);
			}
			var style = document.createTextNode(text);
			styleTag.appendChild(style);
			head.appendChild(styleTag);
		});
	};
	var _super_css = jQuery.fn.css;
	jQuery.fn.css = function(arg1, arg2) {
		if (typeof arg1 !== "undefined" && typeof arg1.filename == "string") {
			jQuery.css(arg1.filename, this);
		} else if (arg1 == "filename") {
			jQuery.css(arg2, this);
			return;
		}
		return _super_css.apply(this, Array.prototype.slice.apply(arguments));
	};
})();
