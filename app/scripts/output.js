"use strict"
var output = (function(Model, $) {
	var tableObj;

	function prepare() {
		tableObj = JSON.parse(Model.getTable());
	}

	return {

		toJSON : function() {
			var result = {};
			prepare();

			for (var index in tableObj) {
				var columnJSON = JSON.parse(Model.getColumn(tableObj[index])),
				    dataJSON = JSON.parse(Model.getData(tableObj[index]));
					result[tableObj[index]]=[];
					//console.log(dataJSON.length);

				for (var i = 0; i < dataJSON.length; i++ ) {
					result[tableObj[index]].push({});
					for (var k = 0; k < dataJSON[i].length; k++ ) {
						result[tableObj[index]][i][columnJSON[k]] = dataJSON[i][k];
					}
				}
			}

			return JSON.stringify(result);
		},
		toXML : function() {
			var result = '<?xml version="1.0" encoding="UTF-8"?>';
			prepare();
			for (var index in tableObj) {
				var columnJSON = JSON.parse(Model.getColumn(tableObj[index])),
				    dataJSON = JSON.parse(Model.getData(tableObj[index]));
					result += '<table name="'+tableObj[index]+'">';

				for (var i = 0; i < dataJSON.length; i++ ) {
					result += "<row>";
					for (var k = 0; k < dataJSON[i].length; k++ ) {
						result += "<"+columnJSON[k]+">"+dataJSON[i][k]+"</"+columnJSON[k]+">";
					}
					result += "</row>";
				}
					result += "</table>";
			}
			return result;
		}
	}
})(Model, jQuery);