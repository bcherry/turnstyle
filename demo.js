$(function() {
	$("#test1").click(function() {
		$(this).css("filename","test.css");
		console.log("clicked test1");
	});

	$("#header").click(function() {
		$.css("test.css");
		console.log("clicked h1");
	});
});
