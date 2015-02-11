"use strict"
var tagHandler = (function(Model, $) {

	return function() {
		//Edit Remark
		$(document).on("dblclick", ".tagPanel li", function(e) {
			$(".remarkPanel").show();
		});

		//Done Remark
		$(document).on("dblclick", ".remarkPanel input[type='submit']", function(e) {
			console.log(this);
			$(".remarkPanel").hide();
		});

		//Click on tag
		$(document).on('click', '.tagPanel h5', function() {
			$(this).siblings('article').animate({  height: "toggle" }, "normal" );
			Model.setDraggable();
		});

		//Add Tag
		$(document).on('click', '.addTag', function() {
			var content = '<li class="dragTag">'+ $(".tagPanel input").val() +'</li>';
			$('.tagPanel ul').append(content);
			$(".tagPanel input").val("");
			Model.setDraggable();
		});
	}

})( Model, jQuery );