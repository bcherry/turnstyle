/*
 * The MIT License
 *
 * Copyright (c) 2009 Ben Cherry (bcherry@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function($) {
	// Local variables
	var loadedFiles = {};
	var seed = 0;
	var re = /\s*([a-z0-9\.# -_:@>]+\s*{)/gim;

	// Loads the specified CSS onto the page or optional object
	var loadStyle = function(text, obj, name) {
		var head = document.getElementsByTagName("head")[0];
		var styleTag = document.createElement("style");
		

		// Namespace our object and the CSS
		if (typeof obj != "undefined") {
			var namespace = "__css" + seed++;
			text = text.replace(re, '\n.' + namespace + ' $1');
			obj.addClass(namespace);
		}

		name = namespace || name || "__css" + seed++;
		styleTag.id = name;

		var style = document.createTextNode(text);
		styleTag.appendChild(style);
		head.appendChild(styleTag);
	}

	// Static function to load CSS
	$.css = function(filename, obj) {

		// Loading rules directly
		if (filename.match(re)) {
			loadStyle(filename, obj);
			return;
		}

		// Check the cache
		if (loadedFiles[filename]) { 
			// Static file, don't load again
			if (document.getElementById(filename) && typeof obj == "undefined") {
				return;
			// Namespaced, but we already have the stylesheet
			} else {
				loadStyle(loadedFiles[filename], obj, filename);
				return;
			}
		}

		// Request the file
		$.get(filename, function(data) {
			loadedFiles[filename] = data;
			loadStyle(data, obj, filename);
		});
	};

	// Static function to remove CSS
	$.uncss = function(arg) {
		// We use getElementById because these ids commonly have '.' in them (breaks jQuery)
		return !!($(document.getElementById(arg)).remove().length);	
	};

	// We override jQuery.fn.css, so keep the old one around
	var _super_css = $.fn.css;

	// Extended jQuery.fn.css
	$.fn.css = function(arg1, arg2) {
		// Load a file onto this object
		if (arg1 == "filename") {
			$.css(arg2, this);
		// Load rules onto this object
		} else if (arg1 == "rules") {
			$.css(arg2, this);
		// Passed a dict, multiple options
		} else if (typeof arg1 !== "undefined") {
			// Load a file onto this object
			if (typeof arg1.filename == "string") {
				$.css(arg1.filename, this);
			}
			// Load rules onto this object
			if (typeof arg1.rules == "string") {
				$.css(arg1.rules, this);
			}
		}

		// Apply the original CSS function, to preserve chaining and existing CSS extension plugins
		return _super_css.apply(this, Array.prototype.slice.apply(arguments));
	};
})(jQuery);
