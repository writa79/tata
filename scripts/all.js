$(document).ready(function(){
    $("#shiftButton").click(function(){
        $(".shift").toggle();
    });    

    $(".goBack").click(function(){
    	window.history.back();
	});
});