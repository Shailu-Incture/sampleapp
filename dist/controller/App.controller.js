sap.ui.define([
		"com/murphy/ioprocapp/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History"
	], function (BaseController, JSONModel, History) {
		"use strict";

		return BaseController.extend("com.murphy.ioprocapp.controller.App", {

			onInit : function () {
			
				// apply content density mode to root view
				//this.getView().addStyleClass("sapUiSizeCompact");
			}
		});
	}
);