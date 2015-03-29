"use strict";
var loadData = (function(Model, $) {

	function fetchColumn(columnArray) {
		for (var i = 0; i < columnArray.length; i++ ) {
			$("thead tr").append('<th><input type="text" value="'+columnArray[i]+'" placeholder="New Name" class="editableCol" /></th>');
		}
	}

	function fetchData(dataArray, tagSet) {
		$("tbody").html("");
		for (var i = 0; i < dataArray.length; i++ ) {
			$("tbody").append('<tr></tr>');
			for (var k = 0; k < dataArray[i].length; k++ ) {
				if (dataArray[i][k].slice(0, 4) === "tag_") {
					$("tbody tr").last().append('<td><input type="text" value="'+dataArray[i][k]+'" class="editableCol" /></td>');			
				} else {
					$("tbody tr").last().append('<td><input type="text" value="'+dataArray[i][k]+'" class="editableCol" /></td>');			
				}
			}
		}
	}

		return {
			loadTag : function() {
				var tag = JSON.parse(Model.getTag()),
					tagPlacement = $(".tagPanel ul"),
					content;
				for (var i in tag) {
					content = '<li class="dragTag" id="'+i+'" title="'+ tag[i].effect +'">'+ tag[i].name +'</li>';
					tagPlacement.append( content );
				}
			},
			//Load all tab table
			loadTable : function() {
				var table = JSON.parse(Model.getTable());
				for (var i = 0; i < table.length; i++) {
					if (i == 0) {
						$(".tabs").append('<li class="tab-title active"><a href="#panel'+i+'">'+table[i]+'</a></li>');
					} else {
						$(".tabs").append('<li class="tab-title"><a href="#panel'+i+'">'+table[i]+'</a></li>');
					}
				}
				refresh();
			},
			//Load column in current table
			loadColumn : function() {
				$("thead tr").html("");
				$("tbody").html("");
				var currentTable = $(".tab-title.active a").html(),
					columnName = JSON.parse(Model.getColumn(currentTable)),
					columnData = JSON.parse(Model.getData(currentTable)),
					tagSet = JSON.parse(Model.getTag());
					fetchColumn(columnName);
					fetchData(columnData, tagSet);
			}
		}
})(Model, jQuery);