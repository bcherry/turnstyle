(function() {
	var loadedFiles = {};
	var seed = 0;
	var re = /\s*([a-z0-9\.# -_:@>]+\s*{)/gim;
	var loadStyle = function(text, obj) {
		var head = document.getElementsByTagName("head")[0];
		var styleTag = document.createElement("style");
		console.log(text);
		if (typeof obj != "undefined") {
			var namespace = "__css" + seed++;
			text = text.replace(re, '\n.' + namespace + ' $1');
			obj.addClass(namespace);
			console.log(text);
		}
		var style = document.createTextNode(text);
		styleTag.appendChild(style);
		head.appendChild(styleTag);
	}
	jQuery.css = function(filename, obj) {
		if (filename.match(re)) {
			loadStyle(filename, obj);
			return;
		}
		if (typeof obj == "undefined") {
			if (loadedFiles[filename]) { 
				return;
			}
			loadedFiles[filename] = true;
		}

		jQuery.get(filename, function(data) {
			loadStyle(data,obj);
		});
	};
	var _super_css = jQuery.fn.css;
	jQuery.fn.css = function(arg1, arg2) {
		if (typeof arg1 !== "undefined" && typeof arg1.filename == "string") {
			jQuery.css(arg1.filename, this);
		} else if (arg1 == "filename") {
			jQuery.css(arg2, this);
			return;
		} else if (arg1 == "rules") {
			jQuery.css(arg2, this);
		}
		return _super_css.apply(this, Array.prototype.slice.apply(arguments));
	};
})();
