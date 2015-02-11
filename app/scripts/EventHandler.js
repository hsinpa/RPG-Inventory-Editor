"use strict"
var EventHandler = (function(Model, loadData, output, $) {
	var rowNum, columnNum, rows, column, previousName;

	function refresh() {
		$(document).foundation();
	}
	function updateTableInfo() {
		rowNum = $("tbody tr").length;
		columnNum = $("thead tr th").length;
		rows = $("tbody tr");
		column = $("thead tr");
	}

	function save() {
		updateTableInfo();
		currentTable = $(".tab-title.active a").html();
		Model.saveTable();
		Model.saveColumn();
		Model.saveData();
	}

	return function() {
		//Add new Table
		$(document).on("click", ".plusTable", function() {
			var num = $(".tab-title").length + 1;
			$(".tabs").append('<li class="tab-title active"><a href="#panel0">New Table '+num+'</a></li>');
		});

		//Change Table
		$(document).on("click", ".tab-title a", function() {
			 loadData.loadColumn();
			 console.log('da');
		});

		//Edit Table name
		$(document).on("dblclick", ".tab-title", function(e) {
			e.preventDefault();
			previousName = $(".tab-title.active a").html();
			$(this).html('<input type="text" value="'+previousName+'" class="editableCol" />');
			$( ".tab-title.active input"  ).focus();
			$(".tab-title.active input").select();
		});
		//Add Row
		$(document).on("click", ".plusRow", function() {
			columnNum = $("thead tr th").length;
			var newRow = '<tr>';
			for (var i = 0; i < columnNum; i++ ) {
				newRow +='<td><input type="text" class="editableCol" /></td>';
			}
			newRow += '</tr>';
			$("tbody").append(newRow);		
			save();
		});	

		//Add Column
		$(document).on("click", ".plusColumns", function() {
			rowNum = $("tbody tr").length;
			columnNum = $("thead tr th").length;
			rows = $("tbody tr");
			column = $("thead tr");
			for (var i = 0; i < rowNum; i++ ) {
					$(rows[i]).append('<td><input type="text" class="editableCol" /></td>');
				}
			$(column).append('<th><input type="text" placeholder="New Column" class="editableCol" /></th>');
			save();
		});

		//Edit Column
		$(document).on("click", ".editableCol", function() {
			$(this).css("color", " #3498db");
		});

		//Leave Column
		$(document).on( "focusout", ".editableCol", function() {
			$(this).css("color", "#2c3e50");
			if ($(this).parent().hasClass("tab-title") ) {
				$(this).parent().html('<a href="#panel0">'+$(this).val()+'</a>');
				Model.garbageCollect(previousName);
			}
			save();
		});
		// ================================ OUTPUT ===============================
		//JSON
		$('.output').on('click', function(e) {
			var data = ($(this).attr("format") === "json") ? output.toJSON() : output.toXML(),
				downloadResult = "text/"+$(this).attr("format")+";charset=utf-8," + encodeURIComponent(data);
				$(this).attr("href", "data:"+downloadResult);
		});

		//Clear All
		$('.clearAll').on('click', function() {
		    if (confirm("You sure to clear all data?") == true) {
		        localStorage.clear();
				location.reload();
		    }
		});
	}
})( Model,loadData, output, jQuery);