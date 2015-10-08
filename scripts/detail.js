$(document).ready(function(){ 
	var hash = document.location.hash;
	var id = (hash.indexOf('#') === 0) ? hash.substring(1) : hash;
    var item_detail = localStorage.getItem(id);
    $("#show_detial").append(item_detail);
}); 
