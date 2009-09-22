$(function() {
	$("#filedemo .page").click(function(){
		$.css("test.css");
	});

	$("#filedemo .elem").click(function(){
		$("#filedemo").css("filename","test.css");
	});

	$("#textdemo .page").click(function(){
		$.css($("#csstext").val());
	});

	$("#textdemo .elem").click(function(){
		$("#textdemo").css("rules",$("#csstext").val());
	});

	$.get("test.css",function(data){
		$("#testcsstext").text(data);
	});
});
