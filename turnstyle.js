(function() {
	var loadedFiles = {};
	this.$css = function(filename) {
		if (loadedFiles[filename]) { 
			return;
		}
		loadedFiles[filename] = true;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",filename, true);
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
