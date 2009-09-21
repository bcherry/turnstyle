$(function() {
	$("#demo1").click(function() {
		$(this).css("filename","test.css");
	});

	$("#demo2").click(function() {
		$(this).css("rules",$(this).find(".style").text());
	});

	$("#header").click(function() {
		$.css("test.css");
	});
});
