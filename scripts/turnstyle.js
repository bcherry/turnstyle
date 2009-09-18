(function() {
	var dir = '';
	this.$cssDir = function(newDir) { dir = newDir; };
	this.$css = function(filename) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", dir + filename, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				var head = document.getElementsByTagName("head")[0];
				var styleTag = document.createElement("style");
				var style = document.createTextNode(xhr.responseText);
				styleTag.appendChild(style);
				head.appendChild(styleTag);
			}
		}
		xhr.send(null);
	};
})();
