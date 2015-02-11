"use strict"
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
			setDraggable : function() {
				$( ".tagPanel li" ).draggable({
			      appendTo: "body",
			      helper: "clone"
			    });

				$( ".columnRow td" ).droppable({
				      activeClass: "ui-state-default",
				      hoverClass: "ui-state-hover",
				      accept: ":not(.ui-sortable-helper)",
				      drop: function( event, ui ) {
				        $( this ).find( "input" ).remove();
				        console.log(ui.draggable);
				        $( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
			      }
			    });
			},

			getMain : function(callback) {
					$.get("views/main.html", function(data) {
						$("#inventoryEditor").html(data);
						callback();
					});
			},
			getPanel : function() {
				$.get("views/tagPanel.html", function(data) {
					$("body").append(data);
				});
			},
			//All data in one json string
			saveTable : function() {
				save($(".tabs li a"), "table");
			},
			saveColumn : function() {
				save($("#columnName th input"), currentTable+"_column");
			},
			saveData : function(name) {
				var trLength = $(".columnRow tr").length, rowSet = [];
				for (var i = 0; i < trLength; i++) {
						var tdSet = $($(".columnRow tr")[i]).find("input"),
							tempSet = [];
						for (var j = 0; j < tdSet.length; j++) {
							tempSet.push($(tdSet[j]).val());
						}
						rowSet.push(tempSet);
				}
				localStorage.setItem(currentTable+"_data", JSON.stringify(rowSet));
			},

			garbageCollect : function(table) {
				localStorage.removeItem(table+"_column");
				localStorage.removeItem(table+"_data");
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
			}
		}

})(jQuery);