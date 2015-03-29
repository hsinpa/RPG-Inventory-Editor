"use strict";
var tagHandler = (function(Model, $) {
	var target;
	return function() {
		//Edit Remark
		$(document).on("dblclick", ".tagPanel li", function(e) {
			target = this;
			var tagJSON = JSON.parse(Model.getTag());
			$(".remarkPanel").show();
			$(".remarkPanel h4").html("Effect : "+ $(this).html());
			//tag may not save yet
			try {
				$('.remarkPanel textarea').val(tagJSON[$(this).attr("id")]['effect']);
			} catch(e) { console.log (e); }
		});

		$(document).on("mousedown", ".tagPanel li", function(e) {
			Model.setDraggable();
		});

		//Done Remark
		$(document).on("click", ".remarkPanel button", function(e) {
			e.preventDefault();
			$(target).attr("title", $('.remarkPanel textarea').val());
			$('.remarkPanel textarea').val("");
			$(".remarkPanel").hide();
			Model.saveTag();
		});


		//Click on tag
		$(document).on('click', '.tagPanel h5', function() {
			$(this).siblings('article').animate({  height: "toggle" }, "normal" );
			Model.setDraggable();
		});

		//Add Tag
		$(document).on('click', '.addTag', function() {
			var tagLength = parseInt($(".tagPanel li").length);
			if ($(".tagPanel input").val().length > 0) {
				var content = '<li class="dragTag" title="none" id="tag_'+tagLength+'">'+ $(".tagPanel input").val() +'</li>';
				$('.tagPanel ul').append(content);
				$(".tagPanel input").val("");
				Model.saveTag();
			}
		});
	}

})( Model, jQuery );