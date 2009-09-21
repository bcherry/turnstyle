$(function() {
	$("#demo1").click(function() {
		$(this).css("filename","test.css");
	});

	$("#demo2").click(function() {
		$(this).parents(".demo").css("rules",$(this).siblings(".style").val());
	});

	$("#header").click(function() {
		$.css("test.css");
	});
});
