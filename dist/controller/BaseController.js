sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/m/Label",
	"sap/m/TextArea",
	"sap/m/Button",
	"sap/m/Text"

], function(Controller, History, MessageToast, Dialog, Label, TextArea, Button, Text) {

	"use strict";

	return Controller.extend("com.murphy.ioprocapp.controller.BaseController", {

		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for accessing the owner component in every controller of the application.
		 * @public
		 * @returns the component
		 */
		getOwner: function() {
			return this.getOwnerComponent();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		/**
		 * Creates the fragment from the fragment name provided to the delegate and assigns a generated id.
		 * @param {String} sFragmentID The Fragment ID
		 * @param {String} sFragmentName The Fragment Name
		 * @returns {Object} Fragment Object.
		 * @private
		 */
		_createFragment: function(sFragmentID, sFragmentName) {

			jQuery.sap.assert(sFragmentName, "Trying to instantiate fragment but fragmentName is not provided.");
			var oFragment = sap.ui.xmlfragment(sFragmentID, sFragmentName, this);
			return oFragment;
		},

		/**
		 * Convenience method for showing a toast message.
		 * @public
		 * @params sMsg {string} message to be toasted
		 * @returns null
		 */
		_showToastMessage: function(sMsg) {
			MessageToast.show(sMsg, {
				duration: 5000
			});
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Convenience method for navigating across views.
		 * @public
		 * @returns null
		 */
		_doNavigate: function(sRouteName, oParams) {
			this.oRouter.navTo(sRouteName, oParams, false);
		},
		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("", {}, bReplace);
			}
		},
		/**
		 * Event handler  for doing an HTTP request (Non Odata).
		 * @public 
		 * @params 
		 * sUrl 	- api URL - {string}
		 * sMethod  - the method -GET or POST or PUT or DELETE (PUT,DELETE -be careful about browser compatibility) -{string}
		 * oData - null if method is GET or the Request Body -{object}
		 * rSuccess - Success callback {function}
		 * rErrror - Error callback {function}
		 * @returns {object} the response data receieved through callback
		 */
		doAjax: function(sUrl, sMethod, oData, rSuccess, rError) {
			if (oData) {
				oData = JSON.stringify(oData);
			}
			var tempJsonModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(tempJsonModel, "tempJsonModel");
			tempJsonModel.loadData(sUrl, oData, true, sMethod, false, false, {
				"Content-Type": "application/json;charset=utf-8"
			});
			tempJsonModel.attachRequestCompleted(function(oEvent) {
				rSuccess(oEvent.getSource().getData());
			}.bind(rSuccess));
			tempJsonModel.attachRequestFailed(function(oEvent) {
				rError(oEvent);
			}.bind(rError)); 
				/*	$.ajax({
						url: sUrl,
						data: oData,
						async: true,
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						error: function(err) {

							rError(err);
						},
						success: function(data) {

							rSuccess(data);
						},
						type: sMethod
					});*/
				
		},

		/**
		 * Method to create a dialog of different states.
		 * @public 
		 * @params 
		 * confirmTitle  {string}
		 * confirmMsg  -{string}
		 * sState -  state of the dialog --Error,Success..etc {string}
		 * confirmYesBtn -  {string}
		 * confirmNoBtn - {string}
		 * actionButtonVisible  decides whethr the begin button should be visible or not {boolian}
		 * closehandler - callback for begin button press -{function}
		 * @returns {object} the response data receieved through callback
		 */
		_createConfirmationMessage: function(confirmTitle, confirmMsg, sState, confirmYesBtn, confirmNoBtn, actionButtonVisible, closehandler) {
			this.closehandler = closehandler;
			this.oConfirmDialog = new Dialog({
				title: confirmTitle,
				type: 'Message',
				state: sState,
				content: new Text({
					text: confirmMsg
				}),
				beginButton: new Button({
					text: confirmYesBtn,
					visible: actionButtonVisible,
					press: function() {
						if (closehandler !== null) {
							this.closehandler();
						}

						this.oConfirmDialog.close();
					}.bind(this)
				}),
				endButton: new Button({
					text: confirmNoBtn,
					press: function() {
						this.oConfirmDialog.close();
					}.bind(this)
				}),
				afterClose: function() {
					this.oConfirmDialog.destroy();
					this.oConfirmDialog = undefined;
				}.bind(this)
			}).addStyleClass("sapUiSizeCompact");
			this.oConfirmDialog.open();
		}

	});

});