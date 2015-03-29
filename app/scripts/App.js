"use strict"
var App = (function(EventHandler, tagHandler, Model, loadData, output, jQuery) {

	function Init() {
		//localStorage.clear();
		Model.getMain(function () {
			loadData.loadTable();
			loadData.loadColumn();
			
			Model.getPanel( function () {
				loadData.loadTag();
			});
		});

		EventHandler();
		tagHandler();
	}

	return function() {
		Init();
	}
	
})(EventHandler, tagHandler, Model, loadData, output, jQuery);