"use strict";
var Model = (function($) {
	function refresh() {
		$(document).foundation();

	}

	function save(element, storageName) {
		var array = element, json= [];
		if (storageName === 'table') {
			for (var i = 0; i < array.length; i++ ) {
				json.push($(array[i]).html());
			}
		} else {
		for (var i = 0; i < array.length; i++ ) {
				json.push($(array[i]).val());
			}
		}
		localStorage.setItem(storageName, JSON.stringify(json));
	}

		return {
			//Remove useless storage
			garbageCollect : function(table) {
				localStorage.removeItem(table+"_column");
				localStorage.removeItem(table+"_data");
			},
			setDraggable : function() {
				var self = this;
				$( ".tagPanel li" ).draggable({
			      appendTo: "body",
			      helper: "clone",
			      stop: function() {
					self.saveData();
			      }
			    });

				$( ".columnRow tr" ).droppable({
				      activeClass: "ui-state-default",
				      hoverClass: "ui-state-hover",
				      accept: ":not(.ui-sortable-helper)",
				      drop: function( event, ui ) {
				        //$( this ).find( "input" ).remove();
				        var tag = ui.draggable;
				        $(this).css("background", "#f1c40f");
			      }
			    });
			},

			getMain : function(callback) {
					$.get("views/main.html", function(data) {
						$("#inventoryEditor").html(data);
						callback();
					});
			},
			getPanel : function(callback) {
				$.get("views/tagPanel.html", function(data) {
					$("body").append(data);
					callback();
				});
			},
			//All data in one json string
			saveTable : function() {
				save($(".tabs li a"), "table");
			},
			saveColumn : function() {
				var currentTable = $(".tab-title.active a").html();
				save($("#columnName th input"), currentTable+"_column");
			},
			saveData : function() {
				var trLength = $(".columnRow tr").length,
					rowSet = [],
					currentTable = $(".tab-title.active a").html();
				for (var i = 0; i < trLength; i++) {
						var tdSet = $($(".columnRow tr")[i]).find("input"),
							tagSet = $($(".columnRow tr")[i]).find("li"),
							tempSet = [], tempTags = [];
						for (var j = 0; j < tdSet.length; j++) {
							tempSet.push($(tdSet[j]).val());
						}
						for (var j = 0; j < tagSet.length; j++) {
							tempTags.push( $(tagSet[j]).attr("id"));
							tempSet.push($(tagSet[j]).attr("id"));
						}
						rowSet.push(tempSet);
				}
				localStorage.setItem(currentTable+"_data", JSON.stringify(rowSet));
			},
			saveTag : function() {
				var tagList = $(".tagPanel li"), json = {};
					for (var i = 0; i < tagList.length; i++) {
						var singleObj = {};
						singleObj.name = $(tagList[i]).html();
						singleObj.effect = $(tagList[i]).attr("title");
						//tag id for inventory usage
						json['tag_'+i] = singleObj;
					}
				localStorage.setItem("tag", JSON.stringify(json));
			},
			//Function
			//Loop inventoryData, get all key
			getTable : function() {
				return localStorage.getItem("table") || '["Empty Table"]';
			},
			getColumn : function(table) {
				return localStorage.getItem(table+"_column") || '[""]';
			},
			getData : function(table) {
				return localStorage.getItem(table+"_data") || "[]";
			},
			getTag : function() {
				return localStorage.getItem("tag") || "{}";
			}
		}

})(jQuery);