(function() {
	var loadedFiles = {};
	jQuery.css = function(filename) {
		if (loadedFiles[filename]) { 
			return;
		}
		loadedFiles[filename] = true;
		jQuery.get(filename, function(data) {
			var head = document.getElementsByTagName("head")[0];
			var styleTag = document.createElement("style");
			var style = document.createTextNode(data);
			styleTag.appendChild(style);
			head.appendChild(styleTag);
		});
	};
	var _super_css = jQuery.fn.css;
	jQuery.fn.css = function(arg1, arg2) {
		console.log(arg1 + " " + arg2);
		if (typeof arg1 !== "undefined" && typeof arg1.filename == "string") {
			jQuery.css(arg1.filename);
		} else if (arg1 == "filename") {
			jQuery.css(arg2);
			return;
		}
		return _super_css.apply(this, Array.prototype.slice.apply(arguments));
	};
})();
