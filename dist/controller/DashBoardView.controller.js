sap.ui.define([
	"com/murphy/ioprocapp/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"com/murphy/ioprocapp/util/formatter",
	"sap/m/MessageBox",
	"sap/m/MessageStrip",
	"com/murphy/ioprocapp/util/powerBiControls"
], function(BaseController, JsonModel, Formatter, MessageBox, MessageStrip, PowerBiControls) {
	"use strict";

	return BaseController.extend("com.murphy.ioprocapp.controller.DashBoardView", {
		formatter: Formatter,
		powerBiControls: PowerBiControls,
		onInit: function() {
			//Controller Json Model ,All local JSON to be created can be stored as properties inside this single model modelName : dashBoardModel
			this.setModel(new JsonModel(), "dashBoardModel");
			this.getModel("dashBoardModel").setSizeLimit(2000);
			this._setInitialDataForModel(this.getModel("dashBoardModel"));
			this._initilizeLocalModelForSuggestions(this.getModel("dashBoardModel"));
			this._initilizeLocalModelForHirarchy(this.getModel("dashBoardModel"));
			this._initilizeLocalModelForDownTime(this.getModel("dashBoardModel"));
			///Local Mock Json Models ,will be replaced with Odata Models and all Json models can be set inside the dashBoardModel as properties
			/*this.setModel(new JsonModel(jQuery.sap.getModulePath("com.murphy.ioprocapp.model", "/dynamicControls.json")),
				"oDynamicControlModel");*/
			/*this.setModel(new JsonModel(jQuery.sap.getModulePath("com.murphy.ioprocapp.model", "/taskPanelDetail.json")),
				"oTaskPanelDetailModel");*/
			this.setModel(new JsonModel(jQuery.sap.getModulePath("com.murphy.ioprocapp.model", "/reportDetails.json")),
				"oReportDetailModel");
			this.getModel("oReportDetailModel").setSizeLimit(2000);
			this.setModel(new JsonModel(), "oTaskPanelDetailModel");
			this.setModel(new JsonModel(), "oAdditionalTaskModel");
			/*	this.setModel(new JsonModel(jQuery.sap.getModulePath("com.murphy.ioprocapp.model", "/fieldList.json")), "oFieldDetailModel");
				this.setModel(new JsonModel(jQuery.sap.getModulePath("com.murphy.ioprocapp.model", "/wellList.json")), "oWellDetailModel");*/
			//End of Mock Data Models
			this.getUserDetails();
			this._inilizeBusyIndicators();
			//this._bindRightTaskPanelModel("All"); this gets called after user gets set
			this.getModel("dashBoardModel").setProperty("/alarmRefresh", true);
			this.oTimerRefresh = setInterval(function() {
				this.onTaskRefreshPress();
			}.bind(this), 15000);
			this.oAlarmRefresh = setInterval(function() {
				if (this.getModel("dashBoardModel").getProperty("/alarmRefresh") && this.getModel("dashBoardModel").getProperty("/appsTab/currentSelectKey") === "alarms") {
					this.getAlarmData();
					//this.onAlarmSelectionClear();
				}
			}.bind(this), 120000);

			this._bindLocationSuggestionforNonDispatch("FIELD");
			//this._getCurrentNearByUser();
			this._getParentCodesforDownTime();
			sap.ui.Device.resize.attachHandler(function() {
				this._setScreenHeights();
			}.bind(this));
			this._fileReaderFn();
			/*	jQuery(document).ajaxComplete(function(e, jqXHR){
                if(jqXHR.getResponseHeader("com.sap.cloud.security.login")){
                                                alert("Session is expired, page shall be reloaded.");
                                                window.location.reload();
                }
});*/

		},
		onAppsTabSelect: function() {
			var selectedKey = this.getModel("dashBoardModel").getProperty("/appsTab/currentSelectKey");
			this.getModel("dashBoardModel").setProperty("/selectedPage", "1");
			switch (selectedKey) {
				case 'permitToWork':
					var currentSelectedTab = this.getModel("dashBoardModel").getProperty("/ptwSelectedKey");
					this.getPermittoWorkList(currentSelectedTab);
					break;
				case 'downTimeCapture':
					var currentTab = this.getModel("dashBoardModel").getProperty("/downtimeSubTabKey");
					this.onDowntimeTableIconTabbarSelect(currentTab);
					break;
				case 'alarms':
					this.getAlarmData();
					this.onAlarmSelectionClear();
					break;
				case 'reports':
					this.onReportLoad();
					break;
			}
		},
		onPTWIconTabChange: function() {
			var currentSelectedTab = this.getModel("dashBoardModel").getProperty("/ptwSelectedKey");
			this.getPermittoWorkList(currentSelectedTab);
		},
		getPermittoWorkList: function(currentTab) {
			var sLocationType = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentLocationType");
			var oSelectedDtos = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentSelectedObject");

			if (oSelectedDtos.length > 0) {
				this.getModel("dashBoardModel").setProperty("/busyIndicators/ptwTableBusy", true);
				this.getModel("dashBoardModel").setProperty("/ptwJsaTable", []);
				this.getModel("dashBoardModel").setProperty("/ptwPermitTable", []);
				var loc = "",
					len = oSelectedDtos.length;
				if (sLocationType === "WELL" || sLocationType === "SEARCH") {

					$.each(oSelectedDtos, function(indx, val) {
						if (indx !== len - 1) {
							loc = loc + "'" + val.muwi + "',";
						} else {
							loc = loc + "'" + val.muwi + "'";
						}
					});
				} else {

					$.each(oSelectedDtos, function(indx, val) {
						if (indx !== len - 1) {
							loc = loc + "'" + val.location + "',";
						} else {
							loc = loc + "'" + val.location + "'";
						}
					});

				}
				switch (currentTab) {
					case "Active JSA":
						var sUrl = "/ptwRest/GetJSAForROC.xsjs?Location=" + loc + "&LocationType=" + sLocationType;
						this.doAjax(sUrl, "GET", null, function(oData) {
							this.getModel("dashBoardModel").setProperty("/ptwJsaTable", oData);
							this.getModel("dashBoardModel").setProperty("/busyIndicators/ptwTableBusy", false);
						}.bind(this), function(oError) {
							this.getModel("dashBoardModel").setProperty("/busyIndicators/ptwTableBusy", false);
							var sErrorMessage;
							sErrorMessage = oError.getParameter("statusText");
							this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
						}.bind(this));
						break;
					default:
						var sUrl = "/ptwRest/GetPermitsForROC.xsjs?Location=" + loc + "&LocationType=" + sLocationType;
						this.doAjax(sUrl, "GET", null, function(oData) {
							this.getModel("dashBoardModel").setProperty("/busyIndicators/ptwTableBusy", false);
							if (currentTab === 'Active CW') {
								this.getModel("dashBoardModel").setProperty("/ptwPermitTable", oData.CWP);
							}
							if (currentTab === 'Active HW') {
								this.getModel("dashBoardModel").setProperty("/ptwPermitTable", oData.HWP);
							}
							if (currentTab === 'Active CSP') {
								this.getModel("dashBoardModel").setProperty("/ptwPermitTable", oData.CSE);
							}

						}.bind(this), function(oError) {
							this.getModel("dashBoardModel").setProperty("/busyIndicators/ptwTableBusy", false);
							var sErrorMessage;
							sErrorMessage = oError.getParameter("statusText");
							this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
						}.bind(this));
				}

			} else {
				this.getModel("dashBoardModel").setProperty("/ptwJsaTable", []);
				this.getModel("dashBoardModel").setProperty("/ptwPermitTable", []);
			}
		},
		getCommaSeperatedLocFromDto: function(oDto, oType) {
			var loc = "",
				length = oDto.length;
			$.each(oDto, function(indx, val) {
				if (indx !== length - 1) {
					loc = loc + "'" + val[oType] + "',";
				} else {
					loc = loc + "'" + val[oType] + "'";
				}
			});
			return loc;
		},
		onPtwTableSerach: function(oEvent) {
			var oAppContId = this.getView().createId("appscollectioncontainer");
			var sQuery = oEvent.getSource().getValue();
			var currentSelectedTab = this.getModel("dashBoardModel").getProperty("/ptwSelectedKey");
			var oTable, filterParams;
			if (currentSelectedTab === "Active JSA") {
				oTable = sap.ui.getCore().byId(oAppContId + "--permittoworkapp--permitToworkJsaTable");
				filterParams = ["createdBy", "taskDescription", "facilityorsite", "createdDate", "jsaPermitNumber"];
			} else {
				oTable = sap.ui.getCore().byId(oAppContId + "--permittoworkapp--permitToWorkPermitTable");
				filterParams = ["createdBy", "taskDescription", "facilityorsite", "createdDate", "jsaPermitNumber", "ptwPermitNumber"];
			}

			var aFilters;

			var filterArray = [];
			if (sQuery) {
				for (var i = 0; i < filterParams.length; i++) {
					filterArray.push(new sap.ui.model.Filter(filterParams[i], sap.ui.model.FilterOperator.Contains, sQuery));
				}
				aFilters = new sap.ui.model.Filter({
					filters: filterArray,
					and: false
				});
			}
			oTable.getBinding("items").filter(aFilters);

		},
		getUserDetails: function() {
			var sUrl = "/services/userapi/attributes";
			var oModel = new sap.ui.model.json.JSONModel();
			var that = this;
			oModel.loadData(sUrl, true, "GET", false, false);
			oModel.attachRequestCompleted(function(oEvent) {
				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						that.getLoggedUserDetails(resultData.userId);
					}
				} else {
					sap.m.MessageToast.show("Error in Retrieving User Details");
				}
			});
			oModel.attachRequestFailed(function(oEvent) {
				sap.m.MessageToast.show("Error in Retrieving User Details");
			});
		},

		getLoggedUserDetails: function(oUserId) {
			var dashBoardModel = this.getModel("dashBoardModel");
			var sUrl = "/destination/MurphyCloudIdPDest/service/scim/Users/" + oUserId;
			var oModel = new sap.ui.model.json.JSONModel();
			var that = this;
			oModel.loadData(sUrl, true, "GET", false, false);
			oModel.attachRequestCompleted(function(oEvent) {

				if (oEvent.getParameter("success")) {
					var resultData = oEvent.getSource().getData();
					if (resultData) {
						//dashBoardModel
						var groups = resultData.groups;
						var resGroup;
						var resGroupRead = "";
						for (var i = 0; i < groups.length; i++) {
							if (groups[i].value === "IOP_TM_ROC_Catarina" || groups[i].value === "IOP_TM_ROC_WestTilden" || groups[i].value ===
								"IOP_TM_ROC_CentralTilden" || groups[i].value === "IOP_TM_ROC_Karnes") {
								resGroup = groups[i].value;
							}
							if (groups[i].value.search("IOP_TM_ROC") >= 0) {
								if (resGroupRead) {
									resGroupRead = resGroupRead + ",";
								}
								resGroupRead += groups[i].value;
							}
						}

						var oIOPRoles = "";
						for (var j = 0; j < groups.length; j++) {

							if (groups[j].value === "IOP_DC_ROC_Catarina") {
								oIOPRoles = oIOPRoles + "ROC_Catarina" + ",";
							}
							if (groups[j].value === "IOP_DC_ROC_WestTilden") {
								oIOPRoles = oIOPRoles + "ROC_WestTilden" + ",";
							}
							if (groups[j].value === "IOP_DC_ROC_CentralTilden") {
								oIOPRoles = oIOPRoles + "ROC_CentralTilden" + ",";
							}
							if (groups[j].value === "IOP_DC_ROC_Karnes") {
								oIOPRoles = oIOPRoles + "ROC_Karnes" + ",";
							}
							var oMultipleRoles = false;
							var oRolesStr = "";
							if (oIOPRoles === undefined) {
								oRolesStr = "";
								oMultipleRoles = true;
							} else {
								var oRolesLen = oIOPRoles.length;
								oRolesStr = oIOPRoles.slice(0, oRolesLen - 1);
								if (oRolesStr.indexOf(",") !== -1) {
									oMultipleRoles = true;
								}
							}

						}
						var oData;
						if (!oMultipleRoles) {
							oData = {
								"userId": resultData.emails["0"].value,
								"displayName": resultData.name.givenName + " " + resultData.name.familyName,
								"group": resGroup,
								"resGroupRead": resGroupRead,
								"businessRole": oRolesStr,
								"singleRole": true
							};
							if (oRolesStr === "") {
								oData.singleRole = false;
							}
						} else {
							oData = {
								"userId": resultData.emails["0"].value,
								"displayName": resultData.name.givenName + " " + resultData.name.familyName,
								"group": resGroup,
								"resGroupRead": resGroupRead,
								"businessRole": oRolesStr,
								"singleRole": false
							};
						}

						dashBoardModel.setProperty("/userData", oData);

						that._bindRightTaskPanelModel("All");
						that._bindInitialLeftPanel();
						/*String ROLE_CATARINA ="IOP_TM_ROC_Catarina";
						String ROLE_WTILDEN = "IOP_TM_ROC_WestTilden";
						String ROLE_CTILDEN =  "IOP_TM_ROC_CentralTilden";
						String ROLE_KARNES = "IOP_TM_ROC_Karnes"; */
					}
				} else {
					sap.m.MessageToast.show("Error in Retrieving User Details");
				}
			});
			oModel.attachRequestFailed(function(oEvent) {
				sap.m.MessageToast.show("Error in Retrieving User Details");
			});
		},

		_fileReaderFn: function() {
			if (FileReader.prototype.readAsBinaryString === undefined) {
				FileReader.prototype.readAsBinaryString = function(fileData) {
					var binary = "";
					var pt = this;
					var reader = new FileReader();
					reader.onload = function(e) {
						var bytes = new Uint8Array(reader.result);
						var length = bytes.byteLength;
						for (var i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						//pt.result  - readonly so assign content to another property
						pt.content = binary;
						pt.onload();
					};
					reader.readAsArrayBuffer(fileData);
				};
			}
		},

		_setScreenHeights: function() {
			var oSize = {
				width: sap.ui.Device.resize.width,
				height: (sap.ui.Device.resize.height - 120) + "px",
				taskPanelHeight: (sap.ui.Device.resize.height - 145) + "px",
				taskCommentHeight: (sap.ui.Device.resize.height - 365) + "px",
				taskAttachmentHeight: (sap.ui.Device.resize.height - 280) + "px",
				taskDetailPanelHeight: (sap.ui.Device.resize.height - 92) + "px",
				detailReportHeight: (sap.ui.Device.resize.height - 350) + "px",
				taskReportHeight: (sap.ui.Device.resize.height - 470) + "px",
				alarmListHeight: (sap.ui.Device.resize.height - 160) + "px",
				downtimeTableHeight: (sap.ui.Device.resize.height - 190) + "px",
				ptwTableHeight: (sap.ui.Device.resize.height - 240) + "px"
			};

			///for index.html full screen support

			/*	var oSize = {
					width: sap.ui.Device.resize.width,
					height: (sap.ui.Device.resize.height - 120) + "px",
					taskPanelHeight: (sap.ui.Device.resize.height - 150) + "px",
					taskCommentHeight: (sap.ui.Device.resize.height - 370) + "px",
					taskAttachmentHeight: (sap.ui.Device.resize.height - 285) + "px",
					taskDetailPanelHeight: (sap.ui.Device.resize.height - 95) + "px",
					detailReportHeight: (sap.ui.Device.resize.height - 410) + "px",
					taskReportHeight: (sap.ui.Device.resize.height - 470) + "px",
					alarmListHeight:  (sap.ui.Device.resize.height - 470) + "px"
				};*/
			this.getModel("dashBoardModel").setProperty("/screenSize", oSize);
		},
		onTaskRefreshPress: function() {
			this._bindRightTaskPanelModel(this.getModel("dashBoardModel").getProperty("/selectedTaskTab"));
		},
		_initilizeLocalModelForDownTime: function(oModel) {
			oModel.setProperty("/downTimeTable", {});
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "YYYY-MM-dd"
			});
			var hirarchyContext = this.getModel("dashBoardModel").getProperty("/hierarchyDetails");
			var dateFormatted = dateFormat.format(new Date());
			oModel.setProperty("/downTime", {
				date: dateFormatted,
				downtimeCodeVisible: false,
				isDateValid: true,
				wellName: "",
				isReview: false,
				muwi: null
			});
			oModel.setProperty("/downtimeSubTabKey", "Designated");
			var sMuid;
			if (hirarchyContext.currentSelectedObject.length === 1) {
				sMuid = hirarchyContext.currentSelectedObject[0].muwi;
			} else {
				sMuid = undefined;
			}

			/*	var oDownTimeData = this.getModel("dashBoardModel").getProperty("/downTime"),
					sDate = oDownTimeData.date + "T00:00:00";
				sDate = oDownTimeData.date !== undefined ? oDownTimeData.date + "T00:00:00" : null;
				this.getModel("dashBoardModel").setProperty("/downTime/downtimeCodeVisible", false);
				if (sMuid && sDate && sDate !== null) {
					this._callforDownTimeCheck(sDate, sMuid);
				}*/

		},
		onReviewFwdPress: function(oEvent) {
			var expanded = this.getModel("dashBoardModel").getProperty("/downtimePanelExpanded");
			var currentObj = oEvent.getSource().getBindingContext("dashBoardModel").getObject();
			var oGenModel = this.getModel("dashBoardModel");
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "YYYY-MM-dd"
			});
			var dateFormatted;
			var systemTime = new Date();
			if (systemTime.getHours() < 7) {

				//	var dateIhave = new Date(currentObj.createdAt);

				systemTime.setDate(new Date().getDate() - 1);
				dateFormatted = dateFormat.format(systemTime);
			} else {
				dateFormatted = dateFormat.format(systemTime);
			}

			oGenModel.setProperty("/downTime/hourkey", "24");
			oGenModel.setProperty("/downTime/minuteKey", "0");
			oGenModel.setProperty("/downTime/wellName", currentObj.well);
			oGenModel.setProperty("/downTime/downtimeParentKey", currentObj.downtimeCode);
			oGenModel.setProperty("/downTime/date", dateFormatted);
			oGenModel.setProperty("/downTime/isReview", true);
			oGenModel.setProperty("/downTime/muwi", currentObj.muwi);
			oGenModel.setProperty("/downTime/downtimeParentText", currentObj.downtimeText);
			oGenModel.setProperty("/downTime/downtimeChildText", currentObj.childText);

			this.onDownTimeParentSelect(currentObj.downtimeCode + "_" + currentObj.childCode);
			if (!expanded) {
				this.getModel("dashBoardModel").setProperty("/downtimePanelExpanded", true);
			}

		},
		onDTDesHourKeySelect: function(oEvent) {
			var key = oEvent.getSource().getSelectedKey();
			if (key === "24" || key === 24) {
				this.getModel("dashBoardModel").setProperty("/downTime/minuteKey", "0");
			}
		},
		onDowntimeTableIconTabbarSelect: function(oEvent) {
			var currentSelection;
			if (typeof(oEvent) === "string") {
				currentSelection = oEvent;
			} else {
				currentSelection = oEvent.getParameter("key");

			}
			var sLocationType = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentLocationType");
			var oSelectedDtos = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentSelectedObject");
			if (oSelectedDtos.length > 0) {
				switch (currentSelection) {

					case "Designated":
						this.setDataForDownTimeTable("/taskmanagementRest/downtimeCapture/getDowntime", "DESIGNATED", oSelectedDtos, sLocationType);
						break;
					case "Submitted":
						this.setDataForDownTimeTable("/taskmanagementRest/downtimeCapture/getDowntime", "SUBMITTED", oSelectedDtos, sLocationType);
						break;
					case "Review":
						this.setDataForDownTimeTable("/taskmanagementRest/downtimeCapture/getDowntime", "REVIEW", oSelectedDtos, sLocationType);
						break;
				}
			} else {
				this.getModel("dashBoardModel").setProperty("/downTimeTable/tableData", []);
			}
		},
		setDataForDownTimeTable: function(url, sType, dto, sLocType) {
			if (sLocType === "SEARCH") {
				sLocType = "WELL";
			}
			var oPayload = {
				"statusType": sType,
				"locationType": sLocType,
				"locationHierarchy": dto
			};
			this.getModel("dashBoardModel").setProperty("/busyIndicators/downtimeTable", true);
			this.doAjax(url, "POST", oPayload, function(oData) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/downtimeTable", false);
					this.getModel("dashBoardModel").setProperty("/downTimeTable/tableData", []);
					if (oData.message.statusCode === "0") {
						var tData = oData.dtoList;
						for (var i = 0; i < tData.length; i++) {
							tData[i].duration = "";
							tData[i].rcTime = "";
							if (tData[i].durationByRocHour) {
								tData[i].duration = tData[i].durationByRocHour + " hr ";
							}
							if (tData[i].durationByRocMinute) {
								tData[i].duration += tData[i].durationByRocMinute + " min";
							}
							if (tData[i].durationByCygnateHours) {
								tData[i].rcTime = tData[i].durationByCygnateHours + " hr ";
							}
							if (tData[i].durationByCygnateMinute) {
								tData[i].rcTime += tData[i].durationByCygnateMinute + " min";
							}
							tData[i].downtimeCode = tData[i].downtimeCode.toString();
							tData[i].childCode = tData[i].childCode.toString();
						}
						this.getModel("dashBoardModel").setProperty("/downTimeTable/tableData", tData);
					} else {
						//	this._createConfirmationMessage("Error", oData.message.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/downtimeTable", false);
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},
		_getParentCodesforDownTime: function() {
			var sToken = this._fetchToken("/bpmrulesRest/rules-service/v1/rules/xsrf-token");

			var sUrl = "/bpmrulesRest/rules-service/rest/v1/rule-services/java/Integrated_Operations_Platform_Rules/getParentCodeAndName";
			var oPayload = {
				"__type__": "DTC_ParentCodeRule_InputDto",
				"input": "All"
			};
			$.ajax({
				url: sUrl,
				method: "POST",
				contentType: "application/json;charset=utf-8",
				async: true,
				data: JSON.stringify(oPayload),
				headers: {
					"X-CSRF-Token": sToken
				},
				success: function(result, xhr, data) {

					this.getModel("dashBoardModel").setProperty("/downtimeParentCodes", result);
				}.bind(this),
				error: function(error) {

				}
			});
		},
		onDowntimeChildSelect: function(oEvent) {
			this.getModel("dashBoardModel").setProperty("/downTime/downTimeChildValue", oEvent.getSource().getSelectedItem().getText());
		},

		onDownTimeParentSelect: function(oEvent) {
			var sToken = this._fetchToken("/bpmrulesRest/rules-service/v1/rules/xsrf-token");

			var sUrl = "/bpmrulesRest/rules-service/rest/v1/rule-services/java/Integrated_Operations_Platform_Rules/getChildCodeAndName";
			var oPayload;
			if (typeof(oEvent) === "string") {
				var parentCode = oEvent.split("_")[0];
				var childCodeForReview = oEvent.split("_")[1];
				oPayload = {
					"__type__": "DTC_ChildCodeRule_InputDto",
					"parentCode": parentCode
				};
			} else {
				this.getModel("dashBoardModel").setProperty("/downTime/downTimeParentValue", oEvent.getSource().getSelectedItem().getText());
				oPayload = {
					"__type__": "DTC_ChildCodeRule_InputDto",
					"parentCode": oEvent.getSource().getSelectedKey().replace(/\s/g, '')
				};
			}
			this.getModel("dashBoardModel").setProperty("/busyIndicators/downTimeChild", true);
			$.ajax({
				url: sUrl,
				method: "POST",
				contentType: "application/json;charset=utf-8",
				async: true,
				data: JSON.stringify(oPayload),
				headers: {
					"X-CSRF-Token": sToken
				},
				success: function(result, xhr, data) {

					if (!result.length) {
						result = [result];
					}
					this.getModel("dashBoardModel").setProperty("/busyIndicators/downTimeChild", false);
					this.getModel("dashBoardModel").setProperty("/downtimeChildCodes", result);
					this.getModel("dashBoardModel").setProperty("/downTime/downtimeChildKey", childCodeForReview);
				}.bind(this),
				error: function(error) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/downTimeChild", true);
				}.bind(this)
			});
		},
		_fetchToken: function(oUrl) {
			var token;
			$.ajax({
				url: oUrl,
				method: "GET",
				async: false,
				headers: {
					"X-CSRF-Token": "Fetch"
				},
				success: function(result, xhr, data) {

					token = data.getResponseHeader("X-CSRF-Token");
				},
				error: function(result, xhr, data) {
					this._createConfirmationMessage("Error", data, "Error", "", "Close", false, null);

				}.bind(this)
			});
			return token;
		},

		clearDownTime: function() {
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "YYYY-MM-dd"
			});
			var dateFormatted = dateFormat.format(new Date());
			this.getModel("dashBoardModel").setProperty("/downTime", {
				dateUnFormatted: "",
				date: dateFormatted,
				downtimeCodeVisible: false,
				isDateValid: true,
				muwi: null,
				wellName: this.getModel("dashBoardModel").getProperty(
					"/hierarchyDetails/currentSelectedObject/0/location"),
				isReview: false
			});
			/*	if (this.oMsgStrip) {
					this.oMsgStrip.destroy();
					this.oMsgStrip = undefined;
				}*/
		},
		onDowntimeUpdate: function() {
			this.onDownTimeSavePress("", false, true);
		},
		onDownTimeSavePress: function(oEvent, isDesignateCreate, isUpdate) {
			var isProcountUpdate = true;
			var oDownTimeData = this.getModel("dashBoardModel").getProperty("/downTime"),
				sUrl = "/taskmanagementRest/downtimeCapture/create",
				hirarchyContext = this.getModel("dashBoardModel").getProperty("/hierarchyDetails"),
				locationTest, mandatoryCheck, bdateValid, bnonZeroHrs;
			locationTest = true;
			mandatoryCheck = true;
			bdateValid = true;
			bnonZeroHrs = true;
			if (isUpdate) {
				sUrl = "/taskmanagementRest/downtimeCapture/update";
			}
			/*	if (hirarchyContext.currentLocationType !== "WELL" && hirarchyContext.currentSelectedObject.location !== undefined) {
					locationTest = false;
					this._createConfirmationMessage("Error", "You have selected a " + hirarchyContext.currentLocationType + " insted of a WELL",
						"Error", "", "Close", false, null);
				} else {

					locationTest = true;
				}
				if (hirarchyContext.currentSelectedObject.location === undefined || hirarchyContext.currentSelectedObject.location === null) {
					locationTest = false;
					this._showToastMessage("Please Select a Well from Hierarchy Panel");
				} else {
					locationTest = true;
				}*/
			if (!this.getModel("dashBoardModel").getProperty("/downTime/isDateValid")) {
				bdateValid = false;
				this._showToastMessage("Please Enter Correct Date");
			}
			if (!isDesignateCreate && !isUpdate) {
				if (hirarchyContext.currentSelectedObject.length <= 1) {
					locationTest = true;
					if (!hirarchyContext.currentSelectedObject[0] || hirarchyContext.currentSelectedObject[0].location === undefined ||
						hirarchyContext.currentSelectedObject[0].location === null ||
						(hirarchyContext.currentLocationType !== "WELL" && hirarchyContext.currentLocationType !== "SEARCH")) {

						if (this.getModel("dashBoardModel").getProperty("/downTime/wellName") !== "" || this.getModel("dashBoardModel").getProperty(
								"/downTime/wellName") !== null || this.getModel("dashBoardModel").getProperty("/downTime/wellName") !== undefined) {
							locationTest = true;
						} else {
							locationTest = false;
							this._showToastMessage("Please Select a Well from Hierarchy Panel");
						}

					} else {
						locationTest = true;
					}

				} else {
					if (oDownTimeData.isReview) {
						locationTest = true;
					} else {
						locationTest = false;
						this._showToastMessage("Downtime Creation Possible on a Single Item");
					}

				}

				if (oDownTimeData.date === "" || oDownTimeData.date === undefined || oDownTimeData.hourkey === undefined || oDownTimeData.hourkey ===
					"" || oDownTimeData.hourkey === null || oDownTimeData.downtimeChildKey === undefined || oDownTimeData.downtimeParentKey ===
					undefined) {
					mandatoryCheck = false;
					if (oDownTimeData.minuteKey === undefined || oDownTimeData.minuteKey === "" || oDownTimeData.minuteKey === null) {
						oDownTimeData.minuteKey = 0;
					}
					this._showToastMessage("Please fill all the required fields");
				} else {
					mandatoryCheck = true;
				}
				/*	if (parseInt(oDownTimeData.hourkey, 10) === 0 && parseInt(oDownTimeData.minuteKey, 10) === 0) {
						bnonZeroHrs = false;
						this._showToastMessage("Not possible to create downtime for 0 hours 0 minutes");
					} else {
						bnonZeroHrs = true;
					}*/
			} else {
				if (oDownTimeData.date === "" || oDownTimeData.date === undefined || oDownTimeData.downtimeChildKey === undefined || oDownTimeData
					.downtimeParentKey ===
					undefined) {
					mandatoryCheck = false;
					this._showToastMessage("Please fill all the required fields");
				} else {
					mandatoryCheck = true;
				}
			}

			var sChildValue = this.getModel("dashBoardModel").getProperty("/downTime/downTimeChildValue");
			var sParentValue = this.getModel("dashBoardModel").getProperty("/downTime/downTimeParentValue");

			if (sChildValue === undefined) {
				sChildValue =
					this.getModel("dashBoardModel").getProperty("/downTime/downtimeChildText");
			}
			if (sParentValue === undefined) {
				sParentValue =
					this.getModel("dashBoardModel").getProperty("/downTime/downtimeParentText");
			}
			/*var sComment = sParentValue + " > " + sChildValue;*/
			if (mandatoryCheck && locationTest && bdateValid && bnonZeroHrs) {

				/*		var oPayload = {
							"uwiId": hirarchyContext.currentSelectedObject[0].muwi,
							"durationInHours": parseInt(oDownTimeData.hourkey, 10),
							"originalDateEntered": oDownTimeData.date + "T00:00:00",
							"durationInMinutes": parseInt(oDownTimeData.minuteKey, 10),
							"parentCode": parseInt(oDownTimeData.downtimeParentKey, 10),
							"childCode": parseInt(oDownTimeData.downtimeChildKey, 10),
							"startDate": oDownTimeData.date + "T00:00:00",
							"comments": sComment
						};*/
				///getting the systemDate for time		
				var oDate = new Date();
				var time = oDate.getHours() + ":" + oDate.getMinutes() + ":" + oDate.getSeconds();
				var oPayload = {};
				if (isDesignateCreate) {
					isProcountUpdate = false;

				}
				oPayload = {
					"isProCountUpdate": isProcountUpdate,
					"dto": {
						"muwi": oDownTimeData.muwi !== null ? oDownTimeData.muwi : hirarchyContext.currentSelectedObject[0].muwi,
						"durationByRocHour": parseInt(oDownTimeData.hourkey, 10),
						"durationByRocMinute": parseInt(oDownTimeData.minuteKey, 10),
						"downtimeCode": parseInt(oDownTimeData.downtimeParentKey, 10),
						"childCode": parseInt(oDownTimeData.downtimeChildKey, 10),
						"createdAt": oDownTimeData.date + " " + time,
						"childText": sChildValue,
						"downtimeText": sParentValue

					}

				};
				if (isDesignateCreate) {
					oPayload.dto.muwi = this.getModel("dashBoardModel").getProperty("/currAlarmObject/muwi");
					oPayload.dto.pointId = this.getModel("dashBoardModel").getProperty("/currAlarmObject/pointId");
					oPayload.dto.startTime = this.getModel("dashBoardModel").getProperty("/currAlarmObject/timeStamp");
				}
				if (isUpdate) {
					oPayload = {
						"isProCountUpdate": isProcountUpdate,
						"dto": {
							"id": oDownTimeData.id,
							"durationByRocHour": parseInt(oDownTimeData.hourkey, 10),
							"durationByRocMinute": parseInt(oDownTimeData.minuteKey, 10),
							"downtimeCode": parseInt(oDownTimeData.downtimeParentKey, 10),
							"childCode": parseInt(oDownTimeData.downtimeChildKey, 10),
							"muwi": oDownTimeData.muwi,
							"createdAt": oDownTimeData.dateUnFormatted,
							"childText": sChildValue,
							"downtimeText": sParentValue
						}

					};

				}
				/*	{
						"type": "WELL23",
						"createdBy": "testerCreate",
						"muwi": "287yik",
						"downtimeCode": 678,
						"childCode": 876,
						"well": "WELLCREATE",
						"durationByCygnateMinute": 20,
						"durationByCygnateHours": 5,
						"durationByRocMinute": 30,
						"durationByRocHour": 6,
						"createdAt": "Thu May 10 2018 11:20:01"
					}*/
				this.getModel("dashBoardModel").setProperty("/busyIndicators/downTime", true);
				this.doAjax(sUrl, "POST", oPayload, function(oData) {

						this.getModel("dashBoardModel").setProperty("/busyIndicators/downTime", false);
						this.clearDownTime();
						this.onAppsTabSelect();
						if (oDownTimeData.isReview)
							this.getModel("dashBoardModel").setProperty("/downtimePanelExpanded", false);
						if (isDesignateCreate || isUpdate) {
							this.onDesignateClose();
						}
						if (oData.status === "SUCCESS") {
							/*if (isUpdate) {
								this._showToastMessage("Downtime Updated");
							} else {
								this._showToastMessage("Downtime Created");
							}*/
							this._showToastMessage(oData.message);
						} else {

							this.clearDownTime();
							this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
						}
					}.bind(this),
					function(oError) {
						this.clearDownTime();
						this.getModel("dashBoardModel").setProperty("/busyIndicators/downTime", false);

						//	this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
					}.bind(this));
			}

		},
		_bindLocationSuggestionforNonDispatch: function(sLocType) {
			var sUrl = "/taskmanagementRest/location/getLocation";
			var oInitialDataPayload = {
				"locationType": sLocType,
				"navigate": "",
				"location": ""
			};
			this.doAjax(sUrl, "POST", oInitialDataPayload, function(oData) {

					if (oData.message.statusCode === "0") {

						this.getModel("dashBoardModel").setProperty("/locationSuggestions", oData.dto.locationHierarchy);
					} else {

						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},
		onLocationSelectionChange: function(oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			this._bindLocationSuggestionforNonDispatch(sKey);
		},
		_getCurrentLoggedInUser: function() {
			var userId = this.getModel("dashBoardModel").getProperty("/userData").userId;
			this.getModel("dashBoardModel").setProperty("/loggedInUser", userId);
			this.getModel("dashBoardModel").setProperty("/loggedInUserDisplay", userId);
			return userId;
		},
		_setInitialDataForModel: function(oModel) {
			oModel.setProperty("/selectedTaskTab", "All");
			oModel.setProperty("/ptwSelectedKey", "Active JSA");

			oModel.setProperty("/appsTab", {
				currentSelectKey: "alarms"
			});
			///Temporary model to hold the conext data for nonDispatch Edit/Create operation
			oModel.setProperty("/nonDispatchItem", {
				downtimePanelExpanded: false,
				nonDispatchItemDesc: "",
				nonDispatchItemLoc: "",
				nonDispatchItemDecValueState: "None",
				nonDispatchItemLocValueState: "None",
				nonDispatchItemDecValueStateText: "Description is Mandatroy",
				nonDispatchItemLocValueStateText: "Location is Invalid",
				isEdit: false,
				taskId: "",
				objectContext: {},
				locTypeKey: "WELL",
				descTypeKey: "Pressure optimization (ex. tubing and sep)",
				locationTypes: [{
					key: "FIELD",
					value: "Field"
				}, {
					key: "FACILITY",
					value: "Central Facility"
				}, {
					key: "WELLPAD",
					value: "Well Pad"
				}, {
					key: "WELL",
					value: "Well"
				}]
			});
			var sUrl = "/taskmanagementRest/nonDispatch/getTaskTypes";
			this.doAjax(sUrl, "GET", null, function(oData) {
				if (oData.responseMessage.statusCode === "0") {
					oModel.setProperty("/nonDispatchItem/descTypes", oData.valueDtos);
				}
			}.bind(this), function(oError) {
				var sErrorMessage;
				sErrorMessage = oError.getParameter("statusText");
				this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
			}.bind(this));
			var oAppContId = this.getView().createId("appscollectioncontainer");
			sap.ui.getCore().byId(oAppContId + "--alarmList--idPageNumberDiv").setVisible(false);
		},
		/**
		 * Method triggers when task tab changes and on I. 
		 * @public
		 * Method changes the data inside tabs.
		 */
		_bindRightTaskPanelModel: function(sTaskType) {
			//this.getModel("dashBoardModel").setProperty("/taskList", []);
			var sUserId = this.getModel("dashBoardModel").getProperty("/userData/userId"),
				sUserName = this.getModel("dashBoardModel").getProperty("/userData/displayName"),
				sGroup = this.getModel("dashBoardModel").getProperty("/userData/resGroupRead"),
				sUrl;
			if (sTaskType === "Non-Dispatch") {
				sUrl = "/taskmanagementRest/nonDispatch/readByLocation?group=" + sGroup + "&userType=ROC";
			} else {
				sUrl = "/taskmanagementRest/tasks/getTasksByUser?group=" + sGroup + "&userType=ROC";
				//sUrl = "/taskmanagementRest/tasks/getTasksByUser?userId=" + sUserId + "&userType=ROC";
			}
			//this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", true);
			this.doAjax(sUrl, "GET", null, function(oData) {
				var aNewTaskList = [];
				if (sTaskType === "All") {
					$.each(oData.taskList, function(index, value) {
						if ((value.commentedByDisplay && value.commentedByDisplay !== sUserName) || value.status === "RESOLVED" || value.status ===
							"RETURNED") {
							aNewTaskList.push(value);
						}
					});
					this.getModel("dashBoardModel").setProperty("/taskList", aNewTaskList);
				} else {
					this.getModel("dashBoardModel").setProperty("/taskList", oData.taskList);
				}
				this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
			}.bind(this), function(oError) {
				var sErrorMessage;
				this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
				sErrorMessage = oError.getParameter("statusText");
				if (this.oConfirmDialog === undefined || !this.oConfirmDialog.isOpen()) {
					if (oError.getId() === "requestFailed" && oError.getParameter("message") === "error" && oError.getParameter("statusText") ===
						"error" && oError.getParameter("statusCode") === 0) {
						//do Nothing Handle net::ERR_NETWORK_IO_SUSPENDED
					} else if (oError.getId() === "requestFailed" && oError.getParameter("message") === "parsererror" && oError.getParameter(
							"statusText") ===
						"OK" && oError.getParameter("statusCode") === 200) {
						//do nothing Unauthorized session
					} else {
						this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
					}

				}

			}.bind(this));
		},
		_inilizeBusyIndicators: function() {
			this.getModel("dashBoardModel").setProperty("/busyIndicators", {
				rightPanelBusy: false,
				leftPanelBusy: true,
				downTimeChild: false,
				downTime: false,
				ptwTableBusy: false,
				downtimeTable: false
			});
		},
		_setFloatingButton: function() {
			var domFloatButton = document.createElement("a");
			var domColloborationIconContainer = document.createElement("div");
			var domStatusContainer = document.createElement("div");

			domFloatButton.setAttribute("class", "float");
			domColloborationIconContainer.setAttribute("class", "colobImage");
			domStatusContainer.setAttribute("class", "statusConatiner");
			domStatusContainer.innerText = "Open MS-Teams";
			domFloatButton.appendChild(domColloborationIconContainer);
			domFloatButton.appendChild(domStatusContainer);
			this.byId("mainROCSplitContainer").getDomRef().appendChild(domFloatButton);
			$(".float").click(function() {
				this._openMsTeams();
			}.bind(this));

		},
		_openMsTeams: function() {
			var prox = "https:",
				domain = "//teams.microsoft.com/l/team/";
			var sUrl = prox + domain;

			sap.m.URLHelper.redirect(sUrl, true);
		},

		onAfterRendering: function() {
			this._setScreenHeights();
			this._setFloatingButton();
			var downtimeCaptureTable = sap.ui.core.Fragment.byId(this.createId("appscollectioncontainer--downtimecptureapp"),
				"downTimeCaptureTable");
			downtimeCaptureTable.onAfterRendering = function(evt) {
				var childclass = $(".childcodenoborder");
				$(childclass.parent())[0].setAttribute("class", "noborder");

			};
			window.oncontextmenu = function() {
				return false; // cancel default menu
			};
		},

		hirarchyFactory: function(sId, oContext) {

			var oUIControl = new sap.m.StandardListItem(sId, {
				title: {
					path: "dashBoardModel>location"
				}
			}).addStyleClass("iopFontClass iopListItemClass");
			if (oContext.getProperty("childExist") === "TRUE") {
				oUIControl.setType(sap.m.ListType.Navigation);
				oUIControl.attachPress(this.onHrNavigate, this);
			}

			return oUIControl;

		},
		_initilizeLocalModelForHirarchy: function(oModel) {
			oModel.setProperty("/hierarchyDetails", {
				currentPageId: "hirPage1",
				page1Data: [],
				page2Data: [],
				page3Data: [],
				currentNavContext: {},
				currentSelectedObject: [],
				currentLocationType: "FIELD",
				navLocations: [],
				routing: {
					page1ID: "hirPage1",
					page1ListId: "hrList1",
					page2ID: "hirPage2",
					page2ListId: "hrList2",
					page3ID: "hirPage3",
					page3ListId: "hrList3",
					fragmentId: "hierarchyPanel"
				}
			});
		},
		_bindInitialLeftPanel: function() {
			var sUrl = "/taskmanagementRest/location/getLocation";
			var oInitialDataPayload;
			var oHirarchyModel = this.getModel("dashBoardModel").getProperty("/hierarchyDetails");
			if (this.getModel("dashBoardModel").getProperty("/userData/singleRole")) {
				oInitialDataPayload = {
					"locationType": "FIELD",
					"navigate": "CHILD",
					"location": "",
					"role": this.getModel("dashBoardModel").getProperty("/userData/businessRole")
				};
			} else {
				oInitialDataPayload = {
					"locationType": "FIELD",
					"navigate": "",
					"location": ""
				};
			}

			this.getModel("dashBoardModel").setProperty("/busyIndicators/leftPanelBusy", true);
			//this.getModel("dashBoardModel").setProperty("/busyIndicators/leftPanelBusy", true);
			oHirarchyModel.page1Data = [];
			oHirarchyModel.page2Data = [];
			oHirarchyModel.currentClickContext = {};
			this.doAjax(sUrl, "POST", oInitialDataPayload, function(oData) {
					jQuery.sap.delayedCall(1000, this, function() {
						this.getModel("dashBoardModel").setProperty("/busyIndicators/leftPanelBusy", false);
					}.bind(this));

					if (oData.message.statusCode === "0") {

						oHirarchyModel.page1Data = oData.dto.locationHierarchy;
						oHirarchyModel.currentLocationType = oData.dto.locationType;

					} else {

						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/leftPanelBusy", false);
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},
		_clearhirSelectedItem: function() {
			var oHirModel = this.getModel("dashBoardModel").getProperty("/hierarchyDetails");
			var oLeftFieldPanelId = this.getView().createId("hierarchyPanel");
			var list;
			this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentSelectedObject", []);

			if (oHirModel.currentPageId === oHirModel.routing.page1ID) {
				list = sap.ui.core.Fragment.byId(oLeftFieldPanelId, oHirModel.routing.page1ListId);
				list.removeSelections();

			} else if (oHirModel.currentPageId === oHirModel.routing.page2ID) {
				list = sap.ui.core.Fragment.byId(oLeftFieldPanelId, oHirModel.routing.page2ListId);
				list.removeSelections();
			} else {
				list = sap.ui.core.Fragment.byId(oLeftFieldPanelId, oHirModel.routing.page3ListId);
				list.removeSelections();
			}
		},
		onHrItemSelectionChange: function(oEvent) {
			var currentObjectContext = oEvent.getParameter("listItem").getBindingContext("dashBoardModel").getObject();
			var aHirSelectedArry = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentSelectedObject");
			if (oEvent.getParameter("selected")) {

				aHirSelectedArry.push(currentObjectContext);
				this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentSelectedObject", aHirSelectedArry);

				/*	aHirSelectedArry = this.removeDuplicates(aHirSelectedArry, prop);*/
			} else {
				var aNewArry = [];
				for (var i = 0; i < aHirSelectedArry.length; i++) {
					if (aHirSelectedArry[i].location !== currentObjectContext.location) {
						aNewArry.push(aHirSelectedArry[i]);
					}
				}
				this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentSelectedObject", aNewArry);

			}
			if (this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentLocationType") === "WELL" || this.getModel(
					"dashBoardModel").getProperty("/hierarchyDetails/currentLocationType") === "SEARCH") {
				this.getModel("dashBoardModel").setProperty("/downTime/wellName", this.getModel("dashBoardModel").getProperty(
					"/hierarchyDetails/currentSelectedObject/0/location"));
			}

			/*	this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentSelectedObject", oEvent.getParameter("listItem").getBindingContext(
					"dashBoardModel").getObject());*/

			/*
						var hirarchyContext = this.getModel("dashBoardModel").getProperty("/hierarchyDetails");
						if (hirarchyContext.currentSelectedObject.length === 1) {

							var sMuid = hirarchyContext.currentSelectedObject[0].muwi,
								oDownTimeData = this.getModel("dashBoardModel").getProperty("/downTime"),
								sDate = oDownTimeData.date !== undefined ? oDownTimeData.date + "T00:00:00" : null;
							this.getModel("dashBoardModel").setProperty("/downTime/downtimeCodeVisible", false);
							if (sMuid && sDate && sDate !== null) {
								this._callforDownTimeCheck(sDate, sMuid);
							}
						}*/

			this.onAppsTabSelect();
		},
		onHrNavigate: function(oEvent) {

			var oHirarchyModel = this.getModel("dashBoardModel").getProperty("/hierarchyDetails");
			oHirarchyModel.currentNavContext = oEvent.getSource().getBindingContext("dashBoardModel").getObject();
			var navLocationArr = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/navLocations");
			navLocationArr.push({
				"loc": oHirarchyModel.currentNavContext.location
			});
			this.getModel("dashBoardModel").setProperty("/hierarchyDetails/navLocations", navLocationArr);
			this._setHirarchyData("CHILD");

		},
		_setHirarchyData: function(navType) {

			var oHirarchyModel = this.getModel("dashBoardModel").getProperty("/hierarchyDetails"),
				sCurrentDataLocation = "",
				sPageId = "",
				currentNavContext = oHirarchyModel.currentNavContext;
			var sUrl = "/taskmanagementRest/location/getLocation";
			var oInitialDataPayload = {
				"locationType": oHirarchyModel.currentLocationType,
				"navigate": navType,
				"location": currentNavContext.location
			};
			if (navType === "SEARCH") {
				this.getModel("dashBoardModel").setProperty(
					"/hierarchyDetails/currentLocationType", "SEARCH");
				oInitialDataPayload = this.getModel("dashBoardModel").getProperty("/searchData");
				this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentPageId", oHirarchyModel.routing.page3ID);
				sCurrentDataLocation = "/page3Data";

			} else {
				if (oHirarchyModel.currentPageId === oHirarchyModel.routing.page1ID) {
					this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentPageId", oHirarchyModel.routing.page2ID);
					sCurrentDataLocation = "/page2Data";

				} else {
					this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentPageId", oHirarchyModel.routing.page1ID);
					sCurrentDataLocation = "/page1Data";

				}
			}

			this._onHirarchyNavTo(oHirarchyModel.currentPageId);
			this.getModel("dashBoardModel").setProperty("/busyIndicators/leftPanelBusy", true);
			this.doAjax(sUrl, "POST", oInitialDataPayload, function(oData) {

					this.getModel("dashBoardModel").setProperty("/busyIndicators/leftPanelBusy", false);
					if (oData.message.statusCode === "0") {
						if (navType === "SEARCH" && oData.dto === null) {
							this.getModel("dashBoardModel").setProperty(
								"/hierarchyDetails" + sCurrentDataLocation, {});

							this.getModel("dashBoardModel").refresh();
						} else {
							this.getModel("dashBoardModel").setProperty(
								"/hierarchyDetails" + sCurrentDataLocation, oData.dto.locationHierarchy);
							this.getModel("dashBoardModel").setProperty(
								"/hierarchyDetails/currentLocationType", oData.dto.locationType);
							this.getModel("dashBoardModel").refresh();

						}

					} else {

						this.getModel("dashBoardModel").setProperty("/busyIndicators/leftPanelBusy", false);
						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {

					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
			return sPageId;

		},
		_onHirarchyNavTo: function(sPageId) {

			var oLeftFieldPanelId = this.getView().createId("hierarchyPanel");
			var oNavContainer = sap.ui.core.Fragment.byId(oLeftFieldPanelId, "fieldListNavCon");
			var sPage = sap.ui.core.Fragment.byId(oLeftFieldPanelId, sPageId);
			this._clearhirSelectedItem();
			oNavContainer.to(sPage, "slide");
		},
		onFieldListNavBack: function() {
			this.getModel("dashBoardModel").setProperty("/downTime/downtimeCodeVisible", false);
			if (this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentLocationType") === "SEARCH") {
				this._clearhirSelectedItem();
				this._initilizeLocalModelForHirarchy(this.getModel("dashBoardModel"));
				this._onHirarchyNavTo(this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentPageId"));

				this._bindInitialLeftPanel();

				this.getModel("dashBoardModel").setProperty("/search", "");
			} else {
				var sCurrentPageId = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentPageId"),
					sListId;
				if (sCurrentPageId === "hirPage2") {
					sListId = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/routing/page2ListId");
				} else {
					sListId = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/routing/page1ListId");
				}
				var oTaskMgtPanelId = this.getView().createId("hierarchyPanel");
				var oTaskList = sap.ui.core.Fragment.byId(oTaskMgtPanelId, sListId);
				this.getModel("dashBoardModel").setProperty("/hierarchyDetails/currentNavContext", oTaskList.getItems()[0].getBindingContext(
					"dashBoardModel").getObject());

				var navLocationArr = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/navLocations");
				navLocationArr.pop();
				this.getModel("dashBoardModel").setProperty("/hierarchyDetails/navLocations", navLocationArr);
				this._setHirarchyData("PARENT");
			}
			/*	var oNavContainer = sap.ui.core.Fragment.byId(oTaskMgtPanelId, "fieldListNavCon");
				oNavContainer.back(sap.ui.core.Fragment.byId(oLeftFieldPanelId, "page1"), "slide");*/
		},
		onfiledWellSearch: function(oEvent) {
			this._clearhirSelectedItem();
			var oInitialDataPayload = {
				"locationType": "SEARCH",
				"navigate": "",
				"location": ""
			};
			var value = oEvent.getSource().getValue();
			oInitialDataPayload.location = value;
			this.getModel("dashBoardModel").setProperty("/searchData", oInitialDataPayload);
			this._setHirarchyData("SEARCH");
			/*var sCurrentPageId = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentPageId"),
					 	sListId;
				if (sCurrentPageId === "hirPage2") {
					sListId = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/routing/page2ListId");
				} else {
					sListId = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/routing/page1ListId");
				}
				var value = oEvent.getSource().getValue();
				var oTaskMgtPanelId = this.getView().createId("hierarchyPanel");
				var oTaskList = sap.ui.core.Fragment.byId(oTaskMgtPanelId, sListId);
				var aFilters;
				var filterParams = ["location"];
				var filterArray = [];
				if (value) {
					for (var i = 0; i < filterParams.length; i++) {
						filterArray.push(new sap.ui.model.Filter(filterParams[i], sap.ui.model.FilterOperator.Contains, value));
					}
					aFilters = new sap.ui.model.Filter({
						filters: filterArray,
						and: false
					});
				}
				oTaskList.getBinding("items").filter(aFilters);*/
		},
		onJsaValueHelp: function() {
			var oFragmentId = "jsaValueHelp",
				oFragmentName = "com.murphy.ioprocapp.fragment.JsaSelectPopup";
			if (!this.oJsaFragment) {
				this.oJsaFragment = this._createFragment(oFragmentId, oFragmentName);
				this.getView().addDependent(this.oJsaFragment);
			}
			this.oJsaFragment.open();
		},
		onJsaPopupCancel: function() {
			this.oJsaFragment.close();
		},
		onLocationValueHelp: function() {
			var oFragmentId = "locationValueHelp",
				oFragmentName = "com.murphy.ioprocapp.fragment.LocationSelectPopup";
			if (!this.oLocationFragment) {
				this.oLocationFragment = this._createFragment(oFragmentId, oFragmentName);
				this.getView().addDependent(this.oLocationFragment);
			}
			this.oLocationFragment.open();
		},
		onLocationPopupCancel: function() {
			this.oLocationFragment.close();
		},
		onTaskListPress: function() {
			jQuery.sap.log.error("FYI: Task List Press");
		},
		onPwtSearchPress: function() {
			/*	var uri =
					"https://teams.microsoft.com/l/team/19%3a61979ba3a58d4675aa2df7245afbfd37%40thread.skype/conversations?groupId=b7576719-3b27-4671-90e4-6016da743d94&tenantId=78d7cfc1-dedd-4464-b309-74a59265897e";
				sap.m.URLHelper.redirect(uri, true);*/
		},

		/*	Methods by Kiruthika*/

		/**
		 * Method triggers when task tab changes. 
		 * @public
		 * Method changes the data inside tabs.
		 */
		onTaskTabSelection: function(oEvent) {
			this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", true);
			this.getModel("dashBoardModel").setProperty("/taskList", []);
			var query = oEvent.getSource().getSelectedKey();
			switch (query) {
				case "All":
					this._bindRightTaskPanelModel("All");
					break;
				case "Non-Dispatch":
					this._bindRightTaskPanelModel("Non-Dispatch");
					break;
				case "Sent Items":
					this._bindRightTaskPanelModel("Sent Items");
					break;
			}
		},

		addAdditionalTasks: function(location) {
			var currentUser = this._getCurrentLoggedInUser();
			var sGroup = this.getModel("dashBoardModel").getProperty("/userData/resGroupRead");
			var loc = location;
			if (!loc) {
				loc = this.getModel("dashBoardModel").getProperty("/selectedLocation");
			}
			var url = "/taskmanagementRest/nonDispatch/readByLocation?group=" + sGroup + "&userType=ROC&location=" + encodeURIComponent(loc);
			this.doAjax(url, "GET", null, function(oData) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					if (oData.responseMessage.statusCode === "0") {
						this.getModel("oAdditionalTaskModel").setData(oData);
						this.getModel("oAdditionalTaskModel").refresh();
					} else {
						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},

		/**
		 * Method triggers on Create task/Add item btn press. 
		 * @public
		 * @param Text of the button
		 * Method opens corresponding fragments to create items.
		 */
		onCreateTaskPress: function(oEvent, btnText, alarmCreate) {
			this.getModel("dashBoardModel").setProperty("/busyIndicators/taskPanelBusy", true);
			var taskId = this.getModel("dashBoardModel").getProperty("/taskId");
			var dashBoardModel = this.getModel("dashBoardModel");
			var oTaskPanelDetailModel = this.getModel("oTaskPanelDetailModel");
			var currentUser = this._getCurrentLoggedInUser();
			var currSelectedLocation = dashBoardModel.getProperty("/hierarchyDetails/currentSelectedObject");
			var currLocType = dashBoardModel.getProperty("/hierarchyDetails/currentLocationType");
			dashBoardModel.setProperty("/isCreateTask", false);
			dashBoardModel.setProperty("/isReturnedTask", false);
			if (!btnText) {
				if (oEvent) {
					btnText = oEvent.getSource().getText();
				} else {
					btnText = "Create Task";
				}
				dashBoardModel.setProperty("/isCreateTask", true);
				dashBoardModel.setProperty("/taskId", "");
				dashBoardModel.setProperty("/processId", "");
				if (btnText === "Create Task") {
					/*if (!currSelectedLocation.location) {
						this._showToastMessage("Please select a location to create task");
						return;
					}*/
					if (currSelectedLocation.length === 1 && !alarmCreate) {
						currSelectedLocation = currSelectedLocation[0];
					} else if (!alarmCreate) {
						currSelectedLocation = {};
						this._showToastMessage("Please select a single location to create task");
						return;
					} else {
						currSelectedLocation = {};
					}
					/*if (!this.getLocGroup(currSelectedLocation.location, currLocType)) {
						this._showToastMessage("You are not allowed to create task for this location");
						return;
					}*/
					if (alarmCreate) {
						var currObj = this.getModel("dashBoardModel").getProperty("/currAlarmObject");
						this.getModel("dashBoardModel").setProperty("/isDispatch", true);
						this._getCurrentNearByUser("", "", currObj.muwi);
					} else {
						this.getModel("dashBoardModel").setProperty("/isDispatch", false);
						var lat = dashBoardModel.getProperty("/hierarchyDetails/currentSelectedObject/0/latValue");
						var long = dashBoardModel.getProperty("/hierarchyDetails/currentSelectedObject/0/longValue");
						this._getCurrentNearByUser(lat, long);
					}
				}
			}
			dashBoardModel.setProperty("/selectedLocation", currSelectedLocation.location);
			if (btnText === "Create Task") {
				var oFragmentId1 = "idCreateTaskPanel",
					oFragmentName1 = "com.murphy.ioprocapp.fragment.createTaskPanel";
				var sUrl;
				if (dashBoardModel.getProperty("/isCreateTask")) {
					if (currLocType === "SEARCH") {
						currLocType = "WELL";
					}
					sUrl = "/taskmanagementRest/tasks/getHeader?taskTempId=123&type=Create";
					if (!alarmCreate) {
						sUrl = sUrl + "&location=" + encodeURIComponent(currSelectedLocation.location) + "&locType=" + currLocType;
						this.addAdditionalTasks();
					} else {
						var currAlarmObj = this.getModel("dashBoardModel").getProperty("/currAlarmObject");
						sUrl = sUrl + "&muwi=" + currAlarmObj.muwi + "&classification=" + currAlarmObj.downTimeClassifier;
					}
				} else {
					sUrl = "/taskmanagementRest/tasks/read?taskId=" + taskId;
				}
				this.doAjax(sUrl, "GET", null, function(oData) {
						this.getModel("dashBoardModel").setProperty("/busyIndicators/taskPanelBusy", false);
						if (oData.responseMessage.statusCode === "0") {
							if (dashBoardModel.getProperty("/isCreateTask")) {
								var currLoc = oData.locHierarchy.pop();
								if (alarmCreate) {
									this.addAdditionalTasks(currLoc.loc);
									dashBoardModel.setProperty("/selectedAlarmLocation", currLoc.loc);
									dashBoardModel.setProperty("/selectedLocation", currLoc.loc);
								}
								var tempData = oData;
								tempData.taskEventDto = {
									createdBy: currentUser,
									createdByDisplay: dashBoardModel.getProperty("/userData/displayName"),
									description: "",
									subject: "",
									status: "ASSIGNED",
									owners: [],
									ownersName: null
								};
								tempData.collabrationDtos = [];
								tempData.nonDispatchTasks = null;
								tempData.ndTaskList = [];
								oTaskPanelDetailModel.setData(tempData);
							} else {
								if (oData.taskEventDto.status === "RETURNED") {
									//dashBoardModel.setProperty("/isCreateTask", true);
									dashBoardModel.setProperty("/isReturnedTask", true);
									var locationFetched = oData.customAttr["0"].labelValue;
									dashBoardModel.setProperty("/selectedLocation", locationFetched);
									this.addAdditionalTasks(locationFetched);
									this._getCurrentNearByUser();
								}
								oTaskPanelDetailModel.setData(oData);
							}
							this.createDynamicCont();
							this.onTaskClassificationChange();
						} else {
							this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
						}
					}.bind(this),
					function(oError) {
						this.getModel("dashBoardModel").setProperty("/busyIndicators/taskPanelBusy", false);
						this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
					}.bind(this));
				if (!this.createTaskPanel) {
					this.createTaskPanel = this._createFragment(oFragmentId1, oFragmentName1);
					this.getView().addDependent(this.createTaskPanel);
				}
				this.createTaskPanel.open();
				if (window.navigator.msSaveOrOpenBlob) {
					this.createTaskPanel.$().find(".iopwbCloseBtnClass").addClass("iopwbCloseBtnIEClass");
				}
				dashBoardModel.setProperty("/addItemsTabKey", "All");
				sap.ui.core.Fragment.byId("idCreateTaskPanel", "idTaskDetailPanel--idAdditionalItemsTab").setSelectedKey("All");
				// Comments
				sap.ui.core.Fragment.byId("idCreateTaskPanel", "idTaskDetailRightPanel--idCollaborationTab").setSelectedKey("Comments");
				sap.ui.core.Fragment.byId("idCreateTaskPanel", "idTaskDetailPanel--idCreateDetailLeftPanel").$().find(".iopwbFlexBoxClass").parent()
					.addClass("iopwbFlexBoxClass");

			} else {
				var locType = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentLocationType");
				var currLoc = "";
				if (this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentSelectedObject").length === 1) {
					currLoc = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentSelectedObject/0/location");
				}

				if (dashBoardModel.getProperty("/isCreateTask")) {
					this.getModel("dashBoardModel").setProperty("/nonDispatchItem/descTypeKey", "Pressure optimization (ex. tubing and sep)");
					this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemLoc", currLoc);
					if (locType === "SEARCH") {
						this.getModel("dashBoardModel").setProperty("/nonDispatchItem/locTypeKey", "WELL");
					} else {
						this.getModel("dashBoardModel").setProperty("/nonDispatchItem/locTypeKey", locType);
					}
				}
				var sLoc = this.getModel("dashBoardModel").getProperty("/nonDispatchItem/locTypeKey");
				this._bindLocationSuggestionforNonDispatch(sLoc);
				var oFragmentId2 = "idAddItemPanel",
					oFragmentName2 = "com.murphy.ioprocapp.fragment.addItemPanel";
				if (!this.addItemPanel) {
					this.addItemPanel = this._createFragment(oFragmentId2, oFragmentName2);
					this.getView().addDependent(this.addItemPanel);
				}
				this.addItemPanel.open();
			}
		},

		/**
		 * Methods trigger when close btn is pressed. 
		 * @public
		 * Closes the fragment.
		 */
		onCreateTaskPanelClose: function(oEvent) {
			/*if (oEvent && (this.getModel("dashBoardModel").getProperty("/isCreateTask") || this.getModel("dashBoardModel").getProperty(
					"/isReturnedTask"))) {
				var sMsg = "The data will be lost. Do you want to continue?",
					sTitle = "Confirm",
					sState = "None",
					confirmYesBtn = "Yes",
					confirmNoBtn = "No";
				this._createConfirmationMessage(sTitle, sMsg, sState, confirmYesBtn, confirmNoBtn, true, function() {
					this.onClosingDetailTask();
				}.bind(this));
			} else {
				this.onClosingDetailTask();
			}*/
			this.onClosingDetailTask();
		},

		onClosingDetailTask: function() {
			this.getModel("oTaskPanelDetailModel").setData({});
			if (this.createTaskPanel) {
				this.createTaskPanel.close();
			}
			this.getModel("dashBoardModel").setProperty("/currentSelectedObjects", {});
			var oList = sap.ui.core.Fragment.byId("oSuggestionPopover", "suggestionlist");
			if (oList) {
				oList.removeSelections();
			}
			var oTable = sap.ui.core.Fragment.byId("idCreateTaskPanel", "idTaskDetailPanel--idNDTaskTbl");
			if (oTable) {
				oTable.removeSelections();
			}
			var query = this.getModel("dashBoardModel").getProperty("/selectedTaskTab");
			this._bindRightTaskPanelModel(query);
			this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
			this.getModel("dashBoardModel").setProperty("/busyIndicators/taskPanelBusy", false);
		},

		onAddItemPanelClose: function() {
			var oDashBoardModel = this.getModel("dashBoardModel");
			oDashBoardModel.setProperty("/nonDispatchItem/nonDispatchItemDesc", "");
			oDashBoardModel.setProperty("/nonDispatchItem/nonDispatchItemLoc", "");
			oDashBoardModel.setProperty("/nonDispatchItem/taskId", "");
			oDashBoardModel.setProperty("/nonDispatchItem/nonDispatchItemDecValueState", "None");
			oDashBoardModel.setProperty("/nonDispatchItem/nonDispatchItemLocValueState", "None");
			oDashBoardModel.setProperty("/nonDispatchItem/objectContext", {});
			oDashBoardModel.setProperty("/nonDispatchItem/locTypeKey", "WELL");
			oDashBoardModel.setProperty("/nonDispatchItem/isEdit", false);
			oDashBoardModel.refresh();
			this.addItemPanel.close();
		},

		_validateNonDispatch: function(oObj) {
			var _isvalid = true;
			this.getModel("dashBoardModel").setProperty("/nonDispatchItem/isLocSelected", true);
			if (this.getModel("dashBoardModel").getProperty("/nonDispatchItem/descTypeKey") === "Other" && (oObj.nonDispatchItemDesc === null ||
					oObj.nonDispatchItemDesc === "" || oObj.nonDispatchItemDesc === undefined)) {
				this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemDecValueState", "Error");
				_isvalid = false;
			} else {
				this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemDecValueState", "None");
			}
			if (oObj.nonDispatchItemLoc === null || oObj.nonDispatchItemLoc === "" || oObj.nonDispatchItemLoc === undefined) {
				this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemLocValueState", "Error");
				this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemLocValueStateText", "Location is Invalid");
				_isvalid = false;
			} else if (this.getModel("dashBoardModel").getProperty("/nonDispatchItem/isLocSelected") === false) {
				this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemLocValueState", "Error");
				this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemLocValueStateText",
					"Select Location from suggestions");
				_isvalid = false;
			} else {
				this.getModel("dashBoardModel").setProperty("/nonDispatchItem/nonDispatchItemLocValueState", "None");
			}
			return _isvalid;
		},

		/**
		 * Method triggers when creating additional non-dispatch item. 
		 * @public
		 */
		onAddingAdditionalItem: function(oEvent) {
			var oDashBoardModel = this.getModel("dashBoardModel"),
				sDescription = oDashBoardModel.getProperty("/nonDispatchItem/nonDispatchItemDesc"),
				sLocation = oDashBoardModel.getProperty("/nonDispatchItem/nonDispatchItemLoc"),
				bOperation = oDashBoardModel.getProperty("/nonDispatchItem/isEdit"),
				sLoctype = oDashBoardModel.getProperty("/nonDispatchItem/locTypeKey"),
				oObjectContext = oDashBoardModel.getProperty("/nonDispatchItem/objectContext"),

				sUrl = "",
				oPayloadData = {};
			if (oDashBoardModel.getProperty("/nonDispatchItem/descTypeKey") !== "Other") {
				sDescription = oDashBoardModel.getProperty("/nonDispatchItem/descTypeKey");
			} else {
				sDescription = "Other - " + sDescription;
			}
			var currSelectedLocation = oDashBoardModel.getProperty("/nonDispatchItem/nonDispatchItemLoc");
			var currLocType = oDashBoardModel.getProperty("/nonDispatchItem/locTypeKey");
			/*if (!this.getLocGroup(currSelectedLocation, currLocType)) {
				this._showToastMessage("You are not allowed to access this location");
				return;
			}*/
			var _isValid = this._validateNonDispatch(oDashBoardModel.getProperty("/nonDispatchItem"));
			if (_isValid) {
				if (bOperation) {
					sUrl = "/taskmanagementRest/nonDispatch/update";
					oObjectContext.description = sDescription;
					oObjectContext.location = sLocation;
					oObjectContext.locType = sLoctype;
					oPayloadData = oObjectContext;

				} else {
					sUrl = "/taskmanagementRest/nonDispatch/create";
					oPayloadData = {
						"description": sDescription,
						"location": sLocation,
						"createdBy": this._getCurrentLoggedInUser(),
						"locType": sLoctype,
						"group": this.getModel("dashBoardModel").getProperty("/userData/group")
					};
				}

				//this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", true);
				this.doAjax(sUrl, "POST", oPayloadData, function(oData) {
						this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);

						if (oData.statusCode === "0") {
							this.onAddItemPanelClose();
							this._showToastMessage(oData.message);
							this._bindRightTaskPanelModel("Non-Dispatch");
						} else {
							this.onAddItemPanelClose();
							this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
						}
					}.bind(this),
					function(oError) {
						this.onAddItemPanelClose();
						this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
						this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
					}.bind(this));
			}
		},

		/**
		 * Method triggers when close/delete icon is pressed. 
		 * @public
		 */
		onCloseItem: function(oEvent) {

			var oCurrentContext = oEvent.getSource().getBindingContext("dashBoardModel").getObject(),
				sMsg = "",
				sTitle = "Confirm",
				sState = "None",
				confirmYesBtn = "Yes",
				confirmNoBtn = "No";
			if (this.getModel("dashBoardModel").getData().selectedTaskTab === "Non-Dispatch") {
				sMsg = "Are you sure you want to delete this item?";
				this._createConfirmationMessage(sTitle, sMsg, sState, confirmYesBtn, confirmNoBtn, true, function() {
					this._removeNonDispatchTask(oCurrentContext.taskId);
				});
			} else {
				sMsg = "Are you sure you want to close this task?";
				this._createConfirmationMessage(sTitle, sMsg, sState, confirmYesBtn, confirmNoBtn, true, function() {
					this.onRemoveTask(oCurrentContext.taskId);
				});
			}

		},
		/**
		 * Method to delete a non-dispatch task 
		 * @private
		 */
		_removeNonDispatchTask: function(sTaskId) {
			//this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", true);
			var sUrl = "/taskmanagementRest/nonDispatch/delete";
			var odata = {
				"taskId": sTaskId
			};

			this.doAjax(sUrl, "POST", odata, function(oData) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					if (oData.statusCode === "0") {
						this._showToastMessage(oData.message);
						this._bindRightTaskPanelModel("Non-Dispatch");
					} else {
						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},

		onRemoveTask: function(sTaskId) {
			//this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", true);
			var sUrl = "/taskmanagementRest/tasks/updateStatus";
			var user = this._getCurrentLoggedInUser();
			var odata = {
				"taskId": sTaskId,
				"status": "COMPLETED",
				"userId": user,
				"userDisplay": user
			};
			this.doAjax(sUrl, "POST", odata, function(oData) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					var selectedTab = this.getModel("dashBoardModel").getProperty("/selectedTaskTab");
					if (oData.statusCode === "0") {
						this._showToastMessage(oData.message);
						this._bindRightTaskPanelModel(selectedTab);
						this.onCreateTaskPanelClose();
					} else {
						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},

		onPressCloseTask: function() {
			var sMsg = "Are you sure you want to close this task?",
				sTitle = "Confirm",
				sState = "None",
				confirmYesBtn = "Yes",
				confirmNoBtn = "No";
			this._createConfirmationMessage(sTitle, sMsg, sState, confirmYesBtn, confirmNoBtn, true, function() {
				this.onRemoveTask(this.getModel("dashBoardModel").getProperty("/taskId"));
			});
		},

		/**
		 * Method triggers on click of any task item. 
		 * @public
		 * Method Opens the corresponding Detail fragment
		 */
		onPressTaskItem: function(oEvent) {
			this.getModel("dashBoardModel").setProperty("/busyIndicators/taskPanelBusy", true);
			var oDashBoardModel = this.getModel("dashBoardModel");
			var sBtnText = oDashBoardModel.getProperty("/selectedTaskTab");
			if (sBtnText === "Non-Dispatch") {
				sBtnText = "Add Item";
				var oContext = oEvent.getSource().getBindingContext("dashBoardModel").getObject();
				if (oContext.description.split("-")[0] === "Other ") {
					var descArray = oContext.description.split(" - ");
					descArray.shift();
					oDashBoardModel.setProperty("/nonDispatchItem/nonDispatchItemDesc", descArray.join(" - "));
					oDashBoardModel.setProperty("/nonDispatchItem/descTypeKey", "Other");
				} else {
					oDashBoardModel.setProperty("/nonDispatchItem/descTypeKey", oContext.description);
				}
				oDashBoardModel.setProperty("/nonDispatchItem/nonDispatchItemLoc", oContext.location);
				oDashBoardModel.setProperty("/nonDispatchItem/taskId", oContext.taskId);
				oDashBoardModel.setProperty("/nonDispatchItem/isEdit", true);
				oDashBoardModel.setProperty("/nonDispatchItem/objectContext", oContext);
				oDashBoardModel.setProperty("/nonDispatchItem/locTypeKey", oContext.locType);
				oDashBoardModel.refresh();
				this._bindLocationSuggestionforNonDispatch(oContext.locType);
			} else {
				sBtnText = "Create Task";
				var taskId = oEvent.getSource().getBindingContext("dashBoardModel").getObject().taskId;
				var processId = oEvent.getSource().getBindingContext("dashBoardModel").getObject().processId;
				this.getModel("dashBoardModel").setProperty("/taskId", taskId);
				this.getModel("dashBoardModel").setProperty("/processId", processId);
			}
			this.onCreateTaskPress("", sBtnText);
		},

		/**
		 * Method triggers when task level search happens
		 * @public
		 */
		onSearchTask: function(oEvent) {
			var value = oEvent.getSource().getValue();
			var oTaskMgtPanelId = this.getView().createId("taskmanagementpane");
			var oTaskList = sap.ui.core.Fragment.byId(oTaskMgtPanelId, "idTaskList");
			var aFilters;
			var filterParams = ["description", "location", "commentedAt", "createdAtDisplay", "taskOwner", "latestComment", "status"];
			var filterArray = [];
			if (value) {
				for (var i = 0; i < filterParams.length; i++) {
					filterArray.push(new sap.ui.model.Filter(filterParams[i], sap.ui.model.FilterOperator.Contains, value));
				}
				aFilters = new sap.ui.model.Filter({
					filters: filterArray,
					and: false
				});
			}
			oTaskList.getBinding("items").filter(aFilters);
		},

		createDynamicCont: function() {
			var dashBoardModel = this.getModel("dashBoardModel").getData();
			this.getModel("dashBoardModel").setProperty("/assignedToIndex", null);
			this.getModel("dashBoardModel").setProperty("/classification1Index", null);
			this.getModel("dashBoardModel").setProperty("/classification2Index", null);
			var oTaskList = sap.ui.core.Fragment.byId("idCreateTaskPanel", "idTaskDetailPanel--idDynGrid");
			oTaskList.removeAllContent();
			var dynamicControlData = this.getModel("oTaskPanelDetailModel").getData().customAttr;
			for (var i = 0; i < dynamicControlData.length; i++) {
				try {
					var newControl = new sap.m.VBox({
						height: "3.5rem",
						justifyContent: "SpaceBetween"
					}).addStyleClass("sapUiTinyMarginBottom");
					newControl.addItem(new sap.m.Label({
						text: dynamicControlData[i].label,
						required: dynamicControlData[i].isMandatory
					}).addStyleClass("iopFontClass iopwbTaskLabelClass iopwbLabelRequiredClass"));
					if (dynamicControlData[i].dataType === "Select") {
						//id: dynamicControlData[i].clItemId,
						var selectControl;
						if (dynamicControlData[i].label === "Task Classification") { // && dynamicControlData[i].isEditable
							if (dynamicControlData[i].labelValue) {
								this.getModel("dashBoardModel").setProperty("/taskSubject1", dynamicControlData[i].labelValue);
							} else {
								this.getModel("dashBoardModel").setProperty("/taskSubject1", "Downtime");
							}
							selectControl = new sap.m.Select({
								width: "100%",
								selectedKey: "{dashBoardModel>/taskSubject1}",
								enabled: dynamicControlData[i].isEditable,
								tooltip: "{dashBoardModel>/taskSubject1}",
								change: function(oEvent) {
									this.onTaskClassificationChange(oEvent);
								}.bind(this)
							}).addStyleClass("sapUiSizeCompact iopSelectClass iopwbTaskBoderLightClass");
							this.getModel("dashBoardModel").setProperty("/classification1Index", i);
							selectControl.bindItems("oTaskPanelDetailModel>/customAttr/" + i + "/valueDtos", function(index, context) {
								var obj = context.getObject();
								return new sap.ui.core.Item({
									text: obj.value,
									key: obj.value
								});
							});
							selectControl.setSelectedKey("Downtime");
						} else if (dynamicControlData[i].label === "Sub Classification") { // && dynamicControlData[i].isEditable
							if (dynamicControlData[i].labelValue && this.getModel("dashBoardModel").getProperty("/taskSubject1") === "Downtime") {
								this.getModel("dashBoardModel").setProperty("/taskSubject2", dynamicControlData[i].labelValue);
								dynamicControlData[i].valueDtos[0].dependentValue = "Downtime";
							} else if (dynamicControlData[i].labelValue && this.getModel("dashBoardModel").getProperty("/taskSubject1") !== "Downtime") {
								this.getModel("dashBoardModel").setProperty("/taskSubject3Array", dynamicControlData[i].labelValue.split(","));
								this.getModel("dashBoardModel").setProperty("/taskSubject3", dynamicControlData[i].labelValue);
								var array = dynamicControlData[i].labelValue.split(",");
								var data = [];
								for (var j = 0; j < array.length; j++) {
									data.push({
										"dependentValue": "Non Downtime",
										"value": array[j]
									});
								}
								dynamicControlData[i].valueDtos = data;
							} else {
								this.getModel("dashBoardModel").setProperty("/taskSubject2", "Compressor");
								this.getModel("dashBoardModel").setProperty("/taskSubject3", "");
								this.getModel("dashBoardModel").setProperty("/taskSubject3Array", []);
							}
							selectControl = new sap.m.Select({
								width: "100%",
								selectedKey: "{dashBoardModel>/taskSubject2}",
								enabled: dynamicControlData[i].isEditable,
								tooltip: "{dashBoardModel>/taskSubject2}",
								visible: "{= ${dashBoardModel>/taskSubject1} === 'Downtime'}"
							}).addStyleClass("sapUiSizeCompact iopSelectClass iopwbTaskBoderLightClass");
							this.getModel("dashBoardModel").setProperty("/classification2Index", i);
							selectControl.bindItems("oTaskPanelDetailModel>/customAttr/" + i + "/valueDtos", function(index, context) {
								var obj = context.getObject();
								return new sap.ui.core.Item({
									text: obj.value,
									key: obj.value
								});
							});
							this.getModel("dashBoardModel").setProperty("/subClassId", selectControl.getId());
							var multiComboBox = new sap.m.MultiComboBox({
								enabled: dynamicControlData[i].isEditable,
								width: "12.25rem",
								visible: "{= ${dashBoardModel>/taskSubject1} !== 'Downtime'}",
								selectedKeys: "{dashBoardModel>/taskSubject3Array}",
								tooltip: "{dashBoardModel>/taskSubject3}",
								selectionChange: function(oEvent) {
									this.onSubClassificationChange(oEvent);
								}.bind(this)
							}).addStyleClass("sapUiSizeCompact iopSelectClass iopwbMultiComboBoxClass");
							multiComboBox.bindItems("oTaskPanelDetailModel>/customAttr/" + i + "/valueDtos", function(index, context) {
								var obj = context.getObject();
								return new sap.ui.core.Item({
									text: obj.value,
									key: obj.value
								});
							});
							newControl.addItem(multiComboBox);
							this.getModel("dashBoardModel").setProperty("/multiSubClassId", multiComboBox.getId());
							//this.onTaskClassificationChange();
							//	visible: "{parts:[{path:'oTaskPanelDetailModel>dependentValue'}, {path:'dashBoardModel>/taskSubject1'}], formatter:'com.murphy.ioprocapp.util.formatter.showSubClassItems'}"
						} else {
							selectControl = new sap.m.Select({
								width: "100%",
								selectedKey: dynamicControlData[i].labelValue,
								enabled: dynamicControlData[i].isEditable
							}).addStyleClass("sapUiSizeCompact iopSelectClass iopwbTaskBoderLightClass");
							selectControl.bindItems("oTaskPanelDetailModel>/customAttr/" + i + "/valueDtos", function(index, context) {
								var obj = context.getObject();
								return new sap.ui.core.Item({
									text: obj.value,
									key: obj.value
								});
							});
						}
						newControl.addItem(selectControl);
					} else if (dynamicControlData[i].dataType === "Input") {
						var inputControl = new sap.m.Input({
							width: "100%",
							value: dynamicControlData[i].labelValue,
							editable: dynamicControlData[i].isEditable
						}).addStyleClass("sapUiSizeCompact iopInputClass iopwbTaskBoderLightClass");
						newControl.addItem(inputControl);
					} else if (dynamicControlData[i].dataType === "MultiSelect") {
						if (dynamicControlData[i].isEditable) {
							var oFragmentName = "com.murphy.ioprocapp.fragment.SuggestionInputCustom";
							var multiSelectControl = this._createFragment("", oFragmentName);
							newControl.addItem(multiSelectControl);
							multiSelectControl.onAfterRendering = function(evt) {
								if (this.getModel("dashBoardModel").getProperty("/assignedToEditable")) {
									this._focusSuggestionList(evt);
								}
							}.bind(this);
							this.getModel("dashBoardModel").setProperty("/assignedToEditable", dynamicControlData[i].isEditable);
							//this.getModel("dashBoardModel").setProperty("/suggestionItems", dynamicControlData[i].valueDtos);
							this.getModel("dashBoardModel").setProperty("/assignedToIndex", i);
							var array = [];
							var owners = this.getModel("oTaskPanelDetailModel").getData().taskEventDto.owners;
							for (var j = 0; j < owners.length; j++) {
								var nameArray = owners[j].taskOwnerDisplayName.split(" ");
								var fName = nameArray.shift();
								var lName = nameArray.join(" ");
								array.push({
									"firstName": fName,
									"lastName": lName,
									"emailId": owners[j].taskOwner,
									"userId": owners[j].taskOwner
								});
							}
							this.getModel("dashBoardModel").setProperty("/currentSelectedObjects", array);
						} else {
							var assignedToTextControl = new sap.m.Text({
								width: "100%",
								text: dynamicControlData[i].labelValue,
								tooltip: dynamicControlData[i].labelValue
							}).addStyleClass("iopFontClass sapUiTinyMarginBottom sapUiTinyMarginBegin iopwbAssignedTextClass");
							newControl.addItem(assignedToTextControl);
						}
					} else if (dynamicControlData[i].dataType === "ComboBox") {
						var comboControl = new sap.m.ComboBox({
							width: "100%",
							selectedKey: dynamicControlData[i].labelValue,
							editable: dynamicControlData[i].isEditable
						}).addStyleClass("sapUiSizeCompact iopSelectClass iopwbTaskBoderLightClass iopwbComboBoxClass");
						comboControl.bindItems("oTaskPanelDetailModel>/customAttr/" + i + "/valueDtos", function(index, context) {
							var obj = context.getObject();
							return new sap.ui.core.Item({
								text: obj.value,
								key: obj.value
							});
						});
						newControl.addItem(comboControl);
					} else if (dynamicControlData[i].dataType === "") {
						newControl.addItem(new sap.m.HBox());
					} else if (dynamicControlData[i].dataType === "Text") {
						if (dynamicControlData[i].label === "Status" && (dynamicControlData[i].labelValue === null || dynamicControlData[i].labelValue ===
								"" || dynamicControlData[i].labelValue === undefined)) {
							dynamicControlData[i].labelValue = "NEW";
						}
						var sCSSStyle;
						if (dynamicControlData[i].label === "Status") {
							var statusVal = dynamicControlData[i].labelValue;
							if (statusVal === "NEW") {
								sCSSStyle = "iopwbNewStatusColor";
							} else if (statusVal === "ASSIGNED") {
								sCSSStyle = "iopwbDispatchedStatusColor";
							} else if (statusVal === "IN PROGRESS") {
								sCSSStyle = "iopwbInProgressStatusColor";
							} else if (statusVal === "RESOLVED") {
								sCSSStyle = "iopwbResolvedStatusColor";
							} else if (statusVal === "RETURNED") {
								sCSSStyle = "iopwbReturnedStatusColor";
							} else {
								sCSSStyle = "iopwbDispatchedStatusColor";
							}
						}
						var textControl = new sap.m.Text({
							width: "100%",
							text: dynamicControlData[i].labelValue
						}).addStyleClass("sapUiSizeCompact iopFontClass sapUiTinyMarginBottom " + sCSSStyle);
						newControl.addItem(textControl);
					}
					oTaskList.addContent(newControl);
				} catch (e) {

				}
			}
			this.onTaskClassificationChange();
			this.getModel("dashBoardModel").setProperty("/busyIndicators/taskPanelBusy", false);
		},
		_focusSuggestionList: function(evt) {

			this.oSuggestionParentInput = evt.srcControl;
			var tInput = $(evt.srcControl.getDomRef()).find("input")[0];
			$(tInput).on("focus", function(oTag) {
				var oFragmentId = "oSuggestionPopover",
					oFragmentName = "com.murphy.ioprocapp.fragment.SuggestionListPopover";
				if (!this.oSuggestionList) {
					this.oSuggestionList = this._createFragment(oFragmentId, oFragmentName);
					this.getView().addDependent(this.oSuggestionList);
				}
				if (!this.oSuggestionList.isOpen()) {
					this.oSuggestionList.openBy(this.oSuggestionParentInput);
					this.oSuggestionParentInput.focus();
					this.oSuggestionParentInput.fireLiveChange();
				}
			}.bind(this));

		},
		onTaskClassificationChange: function(oEvent) {
			var dashBoardModel = this.getModel("dashBoardModel");
			var id, oTaskList;
			var value = dashBoardModel.getProperty("/taskSubject1");
			if (value === "Downtime") {
				dashBoardModel.setProperty("/taskSubject2", "Well");
				dashBoardModel.setProperty("/taskSubject3", "");
				id = dashBoardModel.getProperty("/subClassId");
				oTaskList = sap.ui.getCore().byId(id);
			} else {
				dashBoardModel.setProperty("/taskSubject3", "");
				dashBoardModel.setProperty("/taskSubject2", "");
				id = dashBoardModel.getProperty("/multiSubClassId");
				oTaskList = sap.ui.getCore().byId(id);
				if (oEvent) {
					oTaskList.removeSelectedKeys();
					oTaskList.removeAllSelectedItems();
				}
			}
			var aFilters;
			var filterArray = [];
			if (value) {
				filterArray.push(new sap.ui.model.Filter("dependentValue", sap.ui.model.FilterOperator.EQ, value));
				aFilters = new sap.ui.model.Filter({
					filters: filterArray,
					and: false
				});
			}
			oTaskList.getBinding("items").filter(aFilters);
		},

		attachmentListFactory: function(sId, oContext) {
			var oUIControl = null,
				oFragmentName;
			if (oContext.getProperty("message") !== "" && oContext.getProperty("message") !== null && oContext.getProperty("message") !==
				undefined) {
				return new sap.m.StandardListItem({
					visible: false
				});
			}
			if (oContext.getProperty("attachmentDetails")[0].fileType.split("/")[0] === "image") {
				oFragmentName = "com.murphy.ioprocapp.fragment.attachmentImageItem";
				oUIControl = this._createFragment("", oFragmentName);
			} else {
				oFragmentName = "com.murphy.ioprocapp.fragment.attachmentGeneralItem";
				oUIControl = this._createFragment("", oFragmentName);
			}
			/*oUIControl.setType(sap.m.ListType.Active);
			oUIControl.attachPress(this.onItemSelected, this);*/
			return oUIControl;
		},

		commentListFactory: function(sId, oContext) {
			var oUIControl = null,
				oFragmentName;
			if (oContext.getProperty("message") === "" || oContext.getProperty("message") === null || oContext.getProperty("message") ===
				undefined) {
				return new sap.m.VBox({
					visible: false
				});
			} else {
				oFragmentName = "com.murphy.ioprocapp.fragment.taskCommentItem";
				oUIControl = this._createFragment("", oFragmentName);
			}
			return oUIControl;
		},

		onFileUploadChange: function(oEvent) {
			this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", true);
			var dashBoardModel = this.getModel("dashBoardModel");
			var files = oEvent.getParameter("files");
			var cUserId = this._getCurrentLoggedInUser();
			var cUserDisplay = dashBoardModel.getProperty("/userData/displayName");
			var taskId = dashBoardModel.getProperty("/taskId");
			var objArray = [];
			var oSource = oEvent.getSource();
			var collabDtos = this.getModel("oTaskPanelDetailModel").getData().collabrationDtos;
			var noOfAttachments = 0;
			if (!collabDtos) {
				collabDtos = [];
			}
			for (var k = 0; k < collabDtos.length; k++) {
				if (collabDtos[k].message === "" || collabDtos[k].message === undefined || collabDtos[k].message === null) {
					noOfAttachments++;
				}
			}
			if (noOfAttachments >= 3) {
				this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
				this._showToastMessage("Only 3 attachments can be uploaded");
				oSource.clear();
				return;
			}
			for (var i = 0; i < files.length; i++) {
				var file = oEvent.getParameter("files")[i];
				if (file) {
					var fileSize = file.size;
					var ext = file.name.split(".").pop().toLowerCase();
					//fileSize = fileSize / 1024;
					/*if (fileSize > 10000) {
						MessageBox.show("File size exceeds 10 MB",
							MessageBox.Icon.WARNING, "Warning", [MessageBox.Action.OK],
							function() {},
							MessageBox.Action.YES);
						return;
					}*/
					if (fileSize >= "2097152") {
						this._showToastMessage("File size exceeded. Maximum file size accepted 2MB.");
						this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
						oSource.clear();
						return;
					} else {
						if (ext === "txt" || ext === "doc" || ext === "docx" || ext === "xls" || ext === "xlsx" || ext === "jpg" ||
							ext === "bmp" || ext === "png" || ext === "jpeg" || ext === "pdf") {
							var reader = new FileReader();
							reader.onload = function(readerEvt) {
								var binaryString;
								if (!readerEvt) {
									binaryString = reader.content;
								} else {
									binaryString = readerEvt.target.result;
								}
								var attachmentObject = {};
								attachmentObject["fileName"] = file.name;
								attachmentObject["fileSize"] = file.size;
								attachmentObject["fileType"] = file.type;
								attachmentObject["fileDoc"] = btoa(binaryString);
								if ((!dashBoardModel.getProperty("/isCreateTask")) && taskId && (taskId !== "")) {
									var sUrl = "/taskmanagementRest/collaboration/create";
									var oData = {
										"processId": dashBoardModel.getProperty("/processId"),
										"taskId": dashBoardModel.getProperty("/taskId"),
										"userDisplayName": cUserDisplay,
										"userId": cUserId,
										"attachmentDetails": [attachmentObject]
									};
									this.doAjax(sUrl, "POST", oData, function(oData) {
											this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
											if (oData.statusCode === "0") {
												//this._showToastMessage(oData.message);
												/*var url = "/taskmanagementRest/collaboration/readByTaskId?taskId=" + dashBoardModel.getProperty("/taskId");
												this.doAjax(url, "GET", null, function(oData) {
													if (oData.responseMessage.statusCode === "0") {
														this.getModel("oTaskPanelDetailModel").getData().collabrationDtos = oData.collaborationDtos;
														this.getModel("oTaskPanelDetailModel").refresh();
														this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
													}
												}.bind(this), function(oError) {});*/
												this.onTaskCollabTabSelect();
												oSource.clear();
												//this._showToastMessage(oData.message);
											} else {
												this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
												this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
											}
										}.bind(this),
										function(oError) {
											this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
											this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
										}.bind(this));
								} else {
									objArray.push(attachmentObject);
									var oTaskPanelDetailModel = this.getModel("oTaskPanelDetailModel");
									if (oTaskPanelDetailModel.getData().collabrationDtos && oTaskPanelDetailModel.getData().collabrationDtos.length > 0) {
										if (!(oTaskPanelDetailModel.getData().collabrationDtos instanceof Array)) {
											oTaskPanelDetailModel.getData().collabrationDtos = [oTaskPanelDetailModel.getData().collabrationDtos];
										}
									} else {
										oTaskPanelDetailModel.getData().collabrationDtos = [];
									}
									oTaskPanelDetailModel.getData().collabrationDtos.push({
										"attachmentDetails": objArray,
										"userDisplayName": cUserDisplay,
										"userId": cUserId,
										"createdAtDisplay": this.getCurrDate(),
										"status": "NEW"
									});
									oTaskPanelDetailModel.refresh();
									this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
									oSource.clear();
								}
							}.bind(this);
						} else {
							this._showToastMessage("Cannot upload this type of file");
							this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
							oSource.clear();
							return;
						}
					}
				}
				reader.readAsBinaryString(file);
			}
		},

		onPostComment: function() {
			this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", true);
			var dashBoardModel = this.getModel("dashBoardModel");
			var oTaskPanelDetailModel = this.getModel("oTaskPanelDetailModel");
			var taskId = dashBoardModel.getProperty("/taskId");
			var cUser = this._getCurrentLoggedInUser();
			var cUserDisplay = dashBoardModel.getProperty("/userData/displayName");
			var msg = dashBoardModel.getProperty("/newComment");
			if (msg === undefined || msg === "" || msg === null) {
				this._showToastMessage("Enter a comment to post");
				this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
				return;
			}
			var objArray = {};
			if ((!dashBoardModel.getProperty("/isCreateTask")) && taskId && (taskId !== "")) {
				var sUrl = "/taskmanagementRest/collaboration/create";
				var oData = {
					"processId": dashBoardModel.getProperty("/processId"),
					"taskId": dashBoardModel.getProperty("/taskId"),
					"message": msg,
					"userDisplayName": cUserDisplay,
					"userId": cUser
				};
				this.doAjax(sUrl, "POST", oData, function(oData) {
						this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
						if (oData.statusCode === "0") {
							//this._showToastMessage(oData.message);
							/*var url = "/taskmanagementRest/collaboration/readByTaskId?taskId=" + dashBoardModel.getProperty("/taskId");
							this.doAjax(url, "GET", null, function(oData) {
								if (oData.responseMessage.statusCode === "0") {
									this.getModel("oTaskPanelDetailModel").getData().collabrationDtos = oData.collaborationDtos;
									this.getModel("oTaskPanelDetailModel").refresh();
									this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
								}
							}.bind(this), function(oError) {});*/
							this.onTaskCollabTabSelect();
						} else {
							this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
							this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
						}
					}.bind(this),
					function(oError) {
						this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
						this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
					}.bind(this));

			} else {
				objArray.message = msg;
				objArray.userDisplayName = cUserDisplay;
				objArray.userId = cUser;
				objArray.createdAtDisplay = this.getCurrDate();
				if (oTaskPanelDetailModel.getData().collabrationDtos && oTaskPanelDetailModel.getData().collabrationDtos.length > 0) {
					if (!(oTaskPanelDetailModel.getData().collabrationDtos instanceof Array)) {
						oTaskPanelDetailModel.getData().collabrationDtos = [oTaskPanelDetailModel.getData().collabrationDtos];
					}
				} else {
					oTaskPanelDetailModel.getData().collabrationDtos = [];
				}
				oTaskPanelDetailModel.getData().collabrationDtos.push(objArray);
				oTaskPanelDetailModel.refresh();
				this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
			}
			dashBoardModel.setProperty("/newComment", "");
		},

		onTaskCollabTabSelect: function() {
			this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", true);
			var url = "/taskmanagementRest/collaboration/readByTaskId?taskId=" + this.getModel("dashBoardModel").getProperty("/taskId");
			this.doAjax(url, "GET", null, function(oData) {
				if (oData.responseMessage.statusCode === "0") {
					this.getModel("oTaskPanelDetailModel").getData().collabrationDtos = oData.collaborationDtos;
					this.getModel("oTaskPanelDetailModel").refresh();
					this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
				} else {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
				}
			}.bind(this), function(oError) {
				this.getModel("dashBoardModel").setProperty("/busyIndicators/collabPanelBusy", false);
			});
		},

		onCreatingTask: function() {
			var oData = this.getModel("oTaskPanelDetailModel").getData();
			if (this.onCheckOptionalTasksSelected() === false) {
				return;
			}
			var dashBoardModel = this.getModel("dashBoardModel");
			if (dashBoardModel.getProperty("/assignedToIndex") !== null) {
				//oData.customAttr[dashBoardModel.getProperty("/assignedToIndex")].labelValue = "";
				var currObj = this.getModel("dashBoardModel").getProperty("/currentSelectedObjects");
				oData.taskEventDto.owners = [];
				for (var i = 0; i < currObj.length; i++) {
					var lastName = currObj[i].lastName;
					var firstName = currObj[i].firstName;
					if (lastName) {
						firstName = firstName + " " + lastName;
					}
					oData.taskEventDto.owners.push({
						"taskOwner": currObj[i].emailId,
						"taskOwnerDisplayName": firstName,
						"ownerEmail": currObj[i].emailId
					});
				}
			}
			//validation + conversion
			oData.taskEventDto.subject = "";
			if (dashBoardModel.getProperty("/classification1Index") !== null) {
				oData.customAttr[dashBoardModel.getProperty("/classification1Index")].labelValue = dashBoardModel.getProperty("/taskSubject1");
				oData.taskEventDto.subject = oData.taskEventDto.subject + dashBoardModel.getProperty("/taskSubject1") + " / ";
			}
			if (dashBoardModel.getProperty("/classification2Index") !== null) {
				if (dashBoardModel.getProperty("/taskSubject1") === "Downtime") {
					if (dashBoardModel.getProperty("/taskSubject2")) {
						oData.customAttr[dashBoardModel.getProperty("/classification2Index")].labelValue = dashBoardModel.getProperty("/taskSubject2");
						oData.taskEventDto.subject = oData.taskEventDto.subject + dashBoardModel.getProperty("/taskSubject2");
					} else {
						this._showToastMessage("Select the sub classification to create the task");
						return;
					}
				} else {
					if (dashBoardModel.getProperty("/taskSubject3")) {
						oData.customAttr[dashBoardModel.getProperty("/classification2Index")].labelValue = dashBoardModel.getProperty("/taskSubject3");
						oData.taskEventDto.subject = oData.taskEventDto.subject + dashBoardModel.getProperty("/taskSubject3");
					} else {
						this._showToastMessage("Select the sub classification to create the task");
						return;
					}
				}
			}
			var custAtt = oData.customAttr;
			/*for (var i = 0; i < custAtt.length; i++) {
				if (custAtt[i].isMandatory && (custAtt[i].labelValue === "" || custAtt[i].labelValue === null || custAtt[i].labelValue ===
						undefined)) {
					this._showToastMessage("Select the Assignee to the task");
					return;
				}
			}*/
			if (oData.taskEventDto.owners.length == 0 || (!oData.taskEventDto.owners)) {
				this._showToastMessage("Select the Assignee to the task");
				return;
			}
			/*if (oData.taskEventDto.description === null || oData.taskEventDto.description === "" || oData.taskEventDto.description ===
				undefined) {
				this._showToastMessage("Fill the description");
				return;
			}*/
			//end of validation
			var sUrl = "/taskmanagementRest/tasks/createTask";
			var selectedTab = this.getModel("dashBoardModel").getProperty("/selectedTaskTab");
			var userData = dashBoardModel.getProperty("/userData");
			oData.taskEventDto.createdBy = userData.userId;
			oData.taskEventDto.createdByDisplay = userData.displayName;
			oData.taskEventDto.group = userData.group;
			var arrOwners = [];
			var tOwners = oData.taskEventDto.owners;
			for (var j = 0; j < tOwners.length; j++) {
				arrOwners.push(tOwners[j].taskOwnerDisplayName.split(" ").join(""));
			}
			if (this.getModel("dashBoardModel").getProperty("/isDispatch")) {
				oData.pointId = this.getModel("dashBoardModel").getProperty("/currAlarmObject/pointId");
			}
			this.doAjax(sUrl, "POST", oData, function(oData) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					if (oData.statusCode === "0") {
						/*var payload = {
							"notification": {
								"alert": "You have a new task assigned",
								"badge": 1,
								"data": {
									"abcd": "efdg"
								},
								"sound": "soundval"
							},
							"users": ["soumyaSingh"]
						};*/
						var payload = {
							"notification": {
								"alert": "You have a new task assigned",
								"sound": "default"
							},
							"users": arrOwners
						};
						var aUrl = "/destination/PushNotification_Dest/mobileservices/restnotification/application/com.incture.taskmanagement/user";
						this.doAjax(aUrl, "POST", payload, function(oData) {
							if (oData.statusCode === "0") {
								//success
							}
						});
						this._showToastMessage(oData.message);
						this._bindRightTaskPanelModel(selectedTab);
						this.onCreateTaskPanelClose();
						if (this.getModel("dashBoardModel").getProperty("/isDispatch")) {
							this.onAppsTabSelect();
						}
						this.getModel("dashBoardModel").setProperty("/classification1Index", null);
						this.getModel("dashBoardModel").setProperty("/classification2Index", null);
					} else {
						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},

		onAddingItem: function() {
			var oTable = sap.ui.core.Fragment.byId("idCreateTaskPanel", "idTaskDetailPanel--idNDTaskTbl");
			//var oNonDispatchData = [];
			var selectedItems = oTable.getSelectedItems();
			if (selectedItems.length > 0) {
				var temp;
				if (this.getModel("oTaskPanelDetailModel").getData().ndTaskList === null) {
					this.getModel("oTaskPanelDetailModel").getData().ndTaskList = [];
				}
				for (var i = 0; i < selectedItems.length; i++) {
					temp = selectedItems[i].getBindingContext("oAdditionalTaskModel").getObject();
					this.getModel("oTaskPanelDetailModel").getData().ndTaskList.push(temp);
				}
				this.getModel("oTaskPanelDetailModel").getData().ndTaskList = this.removeDuplicates(this.getModel("oTaskPanelDetailModel").getData()
					.ndTaskList, "taskId");
				//this.getModel("oTaskPanelDetailModel").getData().ndTaskList = oNonDispatchData;
				this.getModel("oTaskPanelDetailModel").refresh();
				this._showToastMessage("Selected Item(s) has been added");
				this.getModel("dashBoardModel").setProperty("/isOpTasksAdded", true);
			} else {
				this._showToastMessage("Select Item(s) to add");
			}
		},

		onDeletingItem: function(oEvent) {
			var sMsg = "Are you sure you want to delete this item?",
				sTitle = "Confirm",
				sState = "None",
				confirmYesBtn = "Yes",
				confirmNoBtn = "No",
				oContext = oEvent.getSource().getBindingContext("oTaskPanelDetailModel");
			this._createConfirmationMessage(sTitle, sMsg, sState, confirmYesBtn, confirmNoBtn, true, function() {
				var index = oContext.sPath.split("/").pop();
				this.getModel("oTaskPanelDetailModel").getData().ndTaskList.splice(index, 1);
				this.getModel("oTaskPanelDetailModel").refresh();
			}.bind(this));
		},

		onHierarchyLinkPress: function(oEvent) {
			var selectedLoc = oEvent.getSource().getText();
			if (this.onCheckOptionalTasksSelected()) {
				this.getModel("dashBoardModel").setProperty("/selectedLocation", selectedLoc);
				this.addAdditionalTasks();
				this.getModel("dashBoardModel").setProperty("/isOpTasksAdded", true);
			}
		},

		onCheckOptionalTasksSelected: function() {
			var oTable = sap.ui.core.Fragment.byId("idCreateTaskPanel", "idTaskDetailPanel--idNDTaskTbl");
			if (this.getModel("dashBoardModel").getProperty("/isOpTasksAdded") === false && oTable.getSelectedItems().length > 0) {
				this._showToastMessage("You have some tasks selected but not added");
				return false;
			} else {
				oTable.removeSelections();
				return true;
			}
		},

		onOptionalTaskSelectionChange: function(oEvent) {
			this.getModel("dashBoardModel").setProperty("/isOpTasksAdded", false);
		},

		getCurrDate: function() {
			var currDate = new Date();
			var dArray = currDate.toDateString().split(" ");
			var date = dArray[2] + "-" + dArray[1] + "-" + (currDate.getYear() - 100) + " ";
			var timeArray = currDate.toLocaleString().split(" ");
			if (timeArray[2] === undefined) {
				if (parseInt(timeArray[1].split(":")[0]) > 12) {
					timeArray[2] = "PM";
					if (parseInt(timeArray[1].split(":")[0]) > 13) {
						var hmsArray = timeArray[1].split(":");
						hmsArray[0] = parseInt(hmsArray[0]) - 12;
						timeArray[1] = hmsArray.join(":");
					}
				} else {
					timeArray[2] = "AM";
				}
			}
			date += timeArray[1] + " " + timeArray[2];
			return date;
		},

		onPressUpdateTask: function() {
			if (this.onCheckOptionalTasksSelected() === false) {
				return;
			}
			var sUrl = "/taskmanagementRest/tasks/updateTask";
			var oData = this.getModel("oTaskPanelDetailModel").getData();
			var dashBoardModel = this.getModel("dashBoardModel");
			if (dashBoardModel.getProperty("/assignedToIndex") !== null) {
				//oData.customAttr[dashBoardModel.getProperty("/assignedToIndex")].labelValue = "";
				var currObj = this.getModel("dashBoardModel").getProperty("/currentSelectedObjects");
				oData.taskEventDto.owners = [];
				for (var i = 0; i < currObj.length; i++) {
					var lastName = currObj[i].lastName;
					var firstName = currObj[i].firstName;
					if (lastName) {
						firstName = firstName + " " + lastName;
					}
					oData.taskEventDto.owners.push({
						"taskOwner": currObj[i].emailId,
						"taskOwnerDisplayName": firstName,
						"ownerEmail": currObj[i].emailId
					});
				}
			}
			if (oData.taskEventDto.owners.length == 0 || (!oData.taskEventDto.owners)) {
				this._showToastMessage("Select the Assignee to the task");
				return;
			}
			oData.taskEventDto.createdBy = this._getCurrentLoggedInUser();
			oData.taskEventDto.createdByDisplay = dashBoardModel.getProperty("/userData/displayName");
			this.doAjax(sUrl, "POST", oData, function(oData) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					if (oData.statusCode === "0") {
						this._showToastMessage(oData.message);
						/*this._bindRightTaskPanelModel(selectedTab);
						this.onCreateTaskPanelClose();
						this.getModel("dashBoardModel").setProperty("/classification1Index", null);
						this.getModel("dashBoardModel").setProperty("/classification2Index", null);*/
						this.onCreateTaskPanelClose();
					} else {
						this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
					}
				}.bind(this),
				function(oError) {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/rightPanelBusy", false);
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},

		onClickDownloadLink: function(oEvent, downloadObj) {
			var oContext, Base64, filename, fileType;
			if (oEvent) {
				oContext = oEvent.getSource().getBindingContext("oTaskPanelDetailModel").getObject();
				Base64 = oContext.attachmentDetails["0"].fileDoc;
				filename = oContext.attachmentDetails["0"].fileName;
				fileType = oContext.attachmentDetails["0"].fileType;
			} else {
				Base64 = downloadObj.base64;
				filename = downloadObj.filename;
				fileType = downloadObj.fileType;
			}

			var u8_2 = new Uint8Array(atob(Base64).split("").map(function(c) {
				return c.charCodeAt(0);
			}));
			var blob = new Blob([u8_2], {
				type: fileType
			});
			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveOrOpenBlob(blob, filename);
			} else {
				var a = document.createElement("a");
				a.setAttribute("style", "display: none");
				setTimeout(function() {
					document.body.appendChild(a);
					try {
						var url = window.URL.createObjectURL(blob);
						a.href = url;
						a.download = filename;
						a.click();
						window.URL.revokeObjectURL(url);
					} catch (e) {
						//console.log(e);
					}
				}, 100);
			}
		},

		onLocSuggestionSelected: function(oEvent) {
			this.getModel("dashBoardModel").setProperty("/nonDispatchItem/isLocSelected", true);
		},

		onLocLiveChange: function(oEvent) {
			this.getModel("dashBoardModel").setProperty("/nonDispatchItem/isLocSelected", false);
		},

		onSubClassificationChange: function(oEvent) {
			var aSelectedKeys = oEvent.getSource().getSelectedKeys();
			var sKeys = aSelectedKeys.join(", ");
			this.getModel("dashBoardModel").setProperty("/taskSubject2", "");
			this.getModel("dashBoardModel").setProperty("/taskSubject3", sKeys);
			this.getModel("dashBoardModel").setProperty("/taskSubject3Array", aSelectedKeys);
		},

		handleLocationSuggest: function(oEvent) {
			var sTerm = oEvent.getParameter("suggestValue");
			var aFilters = [];
			if (sTerm) {
				aFilters.push(new sap.ui.model.Filter("location", sap.ui.model.FilterOperator.Contains, sTerm));
			}
			oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
		},

		onDeletingAttachment: function(oEvent) {
			var isCreateTask = this.getModel("dashBoardModel").getProperty("/isCreateTask");
			var oContext = oEvent.getSource().getBindingContext("oTaskPanelDetailModel");
			var taskPanelDetailModel = this.getModel("oTaskPanelDetailModel").getData();
			if (isCreateTask) {
				var index = oContext.getPath().split("/").pop();
				var oData = taskPanelDetailModel.collabrationDtos;
				oData.splice(index, 1);
				this.getModel("oTaskPanelDetailModel").refresh();
			} else {
				var currStatus = taskPanelDetailModel.taskEventDto.status;
				var attStatus = oContext.getObject().status;
				if (currStatus === attStatus) {
					//service call
					/*var sUrl = "/taskmanagementRest/audit/getReport";
					this.doAjax(sUrl, "GET", null, function(oData) {
						if (oData) {
							this.onClickDownloadLink("", oData);
						} else {
							this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
						}
					}.bind(this), function(oError) {
						var sErrorMessage;
						sErrorMessage = oError.getParameter("statusText");
						this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
					}.bind(this));*/
				} else {
					this._showToastMessage("You cannot delete this attachment");
				}
			}
		},

		getLocGroup: function(currLoc, locType) {
			var sUrl = "/taskmanagementRest/location/getField?location=" + currLoc + "&locType=" + locType;
			var oGroup = this.getModel("dashBoardModel").getProperty("/userData/resGroupRead").split(",");
			var res = "";
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel, "oModel");
			oModel.loadData(sUrl, false, "GET", false, false);
			oModel.attachRequestCompleted(function(oEvent) {
				var oData = oEvent.getSource().getData();
				if (oData && oData.field) {
					var sLoc = oData.field;
					if (sLoc === "TILDEN WEST" || sLoc === "TILDEN NORTH") {
						sLoc = "WestTilden";
					} else if (sLoc === "TILDEN CENTRAL" || sLoc === "TILDEN EAST") {
						sLoc = "CentralTilden";
					} else if (sLoc === "CATARINA") {
						sLoc = "Catarina";
					} else if (sLoc === "KARNES") {
						sLoc = "Karnes";
					}
					for (var i = 0; i < oGroup.length; i++) {
						if (oGroup[i].search(sLoc) >= 0) {
							res = oGroup[i];
						}
					}
					this.getModel("dashBoardModel").setProperty("/userData/group", res);
				}
			}.bind(this));
			if (res !== "") {
				return res;
			} else {
				return false;
			}
		},

		onSearchAlarmData: function(oEvent) {
			var value = oEvent.getSource().getValue();
			var oAppContId = this.getView().createId("appscollectioncontainer");
			var oTaskList = sap.ui.getCore().byId(oAppContId + "--alarmList--idAlarmList");
			var aFilters;
			var filterParams = ["time", "description", "classification", "tierLevel", "route", "alarmCondition", "value"];
			var filterArray = [];
			if (value) {
				for (var i = 0; i < filterParams.length; i++) {
					filterArray.push(new sap.ui.model.Filter(filterParams[i], sap.ui.model.FilterOperator.Contains, value));
				}
				aFilters = new sap.ui.model.Filter({
					filters: filterArray,
					and: false
				});
			}
			oTaskList.getBinding("items").filter(aFilters);
		},

		onAlarmSelectionChange: function(oEvent) {
			var oAppContId = this.getView().createId("appscollectioncontainer");
			var selectedItems = sap.ui.getCore().byId(oAppContId + "--alarmList--idAlarmList").getSelectedItems();
			var length = selectedItems.length;
			var bDispatch = sap.ui.getCore().byId("idAlarmActionList--idDispatchBtn");
			var bDesignate = sap.ui.getCore().byId("idAlarmActionList--idDesignateBtn");
			var bTrends = sap.ui.getCore().byId("idAlarmActionList--idTrendBtn");
			var bAcknowledge = sap.ui.getCore().byId("idAlarmActionList--idAcknowledgeBtn");
			if (length === 0 || length === 1) {
				var currObj;
				if (length === 0) {
					currObj = oEvent.getBindingContext("oReportDetailModel").getObject();
				} else {
					currObj = selectedItems[0].getBindingContext("oReportDetailModel").getObject();
				}
				this.getModel("dashBoardModel").setProperty("/currAlarmObject", currObj);
				if (!currObj.muwi) {
					bDispatch.setVisible(false);
					bDesignate.setVisible(false);
				} else {
					bDispatch.setVisible(true);
					bDesignate.setVisible(true);
				}
				bTrends.setVisible(false);
				bAcknowledge.setVisible(true);
			} else {
				bAcknowledge.setVisible(true);
				bDispatch.setVisible(false);
				bDesignate.setVisible(false);
				bTrends.setVisible(false);
			}
		},

		onAlarmSelectionClear: function() {
			var oAppContId = this.getView().createId("appscollectioncontainer");
			var oAlarmList = sap.ui.getCore().byId(oAppContId + "--alarmList--idAlarmList");
			oAlarmList.removeSelections();
		},

		onPressAlarmAction: function(oEvent) {
			var action = oEvent.getSource().getText();
			var oAppContId = this.getView().createId("appscollectioncontainer");
			var oTaskList = sap.ui.getCore().byId(oAppContId + "--alarmList--idAlarmList");
			var selectedItems = oTaskList.getSelectedItems();
			var selectedAlarms = [];
			if (selectedItems.length === 1 || selectedItems.length === 0) {
				var currObj;
				if (selectedItems.length === 1) {
					currObj = selectedItems[0].getBindingContext("oReportDetailModel").getObject();
					this.getModel("dashBoardModel").setProperty("/currAlarmObject", currObj);
				} else {
					currObj = this.getModel("dashBoardModel").getProperty("/currAlarmObject", currObj);
					selectedAlarms.push(currObj);
				}
				if (currObj.downTimeClassifier !== "Downtime" && currObj.downTimeClassifier !== "Non Downtime" && action !== "Trends" && action !==
					"Acknowledge") {
					this._showToastMessage("Select the classification");
					return;
				}
			} else {
				if (action === "Acknowledge") {
					for (var i = 0; i < selectedItems.length; i++) {
						var Obj = selectedItems[i].getBindingContext("oReportDetailModel").getObject();
						if (Obj.downTimeClassifier !== "Downtime" && Obj.downTimeClassifier !== "Non Downtime") {
							this._showToastMessage("Select classifications for the selected alarms");
							return;
						}
					}
				}
			}
			if (action === "Designate") {
				this.onDesignatePress();
				//this.getModel("dashBoardModel").setProperty("/testDesignate", true);
			} else if (action === "Dispatch") {
				this.onDispatchPress();
				//this.getModel("dashBoardModel").setProperty("/testDispatch", true);
			} else if (action === "Trends") {
				this.onTrendsPress();
			} else if (action === "Acknowledge") {
				if (selectedItems.length !== 0) {
					for (var i = 0; i < selectedItems.length; i++) {
						currObj = selectedItems[i].getBindingContext("oReportDetailModel").getObject();
						selectedAlarms.push(currObj);
					}
				}
				this.onAcknowledgePress(selectedAlarms);
			}
			this.getModel("dashBoardModel").setProperty("/alarmRefresh", true);
		},

		onDispatchPress: function() {
			var alarmCreate = true;
			//this.getModel("dashBoardModel").setproperty("/isDispatch", true);
			this.onCreateTaskPress("", "", alarmCreate);
		},

		onAcknowledgePress: function(selectedAlarms) {
			var pointIds = this.getCommaSeperatedLocFromDto(selectedAlarms, "pointId");
			var oPayload = {
				"pointIds": pointIds,
				"key": "ACKNOWLEDGE",
				"value": "Y"
			};
			var sUrl = "/taskmanagementRest/alarmFeed/updateAcknowledge";
			this.doAjax(sUrl, "POST", oPayload, function(oData) {
				if (oData.statusCode === "0") {
					this._showToastMessage(oData.message);
					this.getAlarmData();
				} else {
					this._showToastMessage(oData.message);
				}
			}.bind(this), function(oError) {
				var sErrorMessage;
				sErrorMessage = oError.getParameter("statusText");
				this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
			}.bind(this));
		},

		onTrendsPress: function() {
			var oFragmentId = "powerBiPop",
				oFragmentName = "com.murphy.ioprocapp.fragment.PowerBiPopup";
			if (!this.oPowerBiFragment) {
				this.oPowerBiFragment = this._createFragment(oFragmentId, oFragmentName);
				this.getView().addDependent(this.oPowerBiFragment);
			}
			this.oPowerBiFragment.open();
		},

		afterPoweBiPopupOpen: function(oEvnt) {
			var embedToken =
				"H4sIAAAAAAAEACWWtQ70CBKE3-VPfZJhjCdtYGZmZ2YaM3t1736j3byCrlJ3ff33Hyt9vlNa_Pnvn4jXyttH76bB0IampTOo1MbxwvwNinypLcgnDxrFrmM1XLjBys48pGCTTch3lVvJaaDakAw-G1hJnMEAbiho4d4NxAYhR_k2TkCCRrm0kxDL4mmhBCcccygsvqK_D2Pqzw0S17q7FDotsjhjRwGy7EWH9PObAxXR5oRFVKFxZSYDSuB7xbaiaICWA8csBynH-q36U0Nvn3EPKOMoYFcN0UaNRijoJ-uoosFulj-cc4UDPKu0pgIcOSLQslNmrl37O0_BYXsQSQic0bJ2DBQdIBS53YM13YYpI4WWV-Ccmrpu6J3r7UPDVwhSbx04hkEbFOnYVI0eGtpobRm9fT2khEXyCmsBU6kg5SfsUYY9LIwtHxD-VsC1OJe-xEpHRIkj-gXlyGF4UOCWCz9_1t0T2F3rs0I3DDgkdyHt9IqU3ptWd4gb1rUDNru1mu8UA7u936i-rnvynVKG-YvWLnGc3j6h-loE2cxXuMUAFKWcpdrre_ucEc7zMkUBbxHeXk0y2IvoJNUgeDU9AjSBXJOedby9GXFJvLj_UF-WFz6l-AZev_GVaTUGVHyLHgwyzD4X2l9KDMALo5X3OOPTrUFWWJPiLk8ftNXFClqGnE9VCIfNMiX5ITEt4TBCsA0NNRdH8ZyAQBLrFTgphl_fedeIQaugqlmGuCuWSrBGh3CtM6XCQl6rLt-xrTjh3L1ZnBqeRca1_eDUTfTc0ZH1MvSyMOifTnft26FNS7fTopVOXdTcJst1wxt0fOA8cBIZEvGWT0jTZoqjFgo8uFwM4mB0agBMB0au11yfOYzfV0p_0Q5Iqoy4u2W4KncAs_60blIewA2Ci3vy8kI0xFliS0hCW6UISyUXMYwm0aNg6TWII03L9bovaz2VP9Bnb7WK1bWlM-q69iI_rhM2FQJOUgof_hBTDxwgTex2b8GwCCX3xUrxiGs0HZZccUmhfzoZwUr0GKcCb2wh2HAjCSb9p3w1IEA81a0u884lTp805zNq-eRHJdXMmYwpQm8kZNlXsxutHy13U1Havfp3z_ZnVFX8Z7PVtJHXjtKTOPITtRXiUwL5lWvFmxMQqyoD-XKK3gJ1mIIvOdVZekg3BL1oVho3zSQ5Su_45PYVgzC1GeAh0ldE1jSG4FAj15Pq2az2ZFI--bbpbDmIBmcvpGoylaDcEUVGOMNfC7slwOL6bRv7pPBxyoKSg3igPByDyLqQlu2FpWYBny-EDBhX4jVRJunQ6vArEN8F14UXFakfwopKvy1PDnzPQ9J3n-diWX-yUS9M1yZ41gyLSY322uA8AvMErVAaeY5V2i1kiOWs2Q2hYQJcvFJw9JSrpLoNuYOKUJu4cbJbB5mXnMn1T6vgFrC8CApFXcOlxuTFW9kb6BD5XlqBJWbgnyuyRR7HQTkeH77GMrCQq56cS40Yg5VV16Om-FEth9B7bMyndlgAMMbtcczkq8kHZ4P0gLri0ugaTnheCHh5sQQU-LKs0NG6K95K65qx5w8NsFqHSnEafDbeMX6T2yNy0r27-YoWosuX4BFCDf2Xuh5pk8gvs7jz0ekSQ8LzUyzPoeoCp3rnBAnpzHOfOHlYB_laT3oo6LGBBt45X_57fB4w2BxpEyXX16K25AQL7mu-hp7jc95P48C2AkzESiCvcpSaS0lzch_f1tIxDeak5FcMXM0YI6uxiqdb0VSqs6KxnkDU4YRBssSDWyBFZ8EPZ7jFdpwq1rJQIVjHhYjdVWnMQsmU06TK8M5P02swo7ISp2B2tKuVV0erJ8U76sKjn-bAln3MRL6c0NJZbgqVffW4ALyiCWTdUxM_g29kzXg88UEO0KXqAA6LqUTjazb8WNYDPEU3zdb9GpJ1y9RrY-7GtVxb9fLCVx5J6xK3bQuGIpwa2pRVUbFmG3UcBcFMBAY02c37Md1doxvtbZ6wWN1GoAa2snCZcR0z15hvbyVngpMsxVpJFIC0H_JNPkCWxKv8kzCSaOu5Ng6AGbJrcws6wHpEN6fQi73OqifPlJJDfVDRDiv1q9RwAfCf3-577bB7ZcfCF4J_v0Mesu4hYfDiSct2AcS361VvJjqf1WwXPxzr4rioBCMT8q6Il_stWPy__vznD7s-8z6p5fN7HYT2XBKjILJZ0Yt1EAVr4zb6FDYoZzUZ5bKMJ-1V9ZtwkmJgr4gf51yRxiLszCzPmWxxX-qRZAIABj2cwmmF7M-Ml5HgtYv4eUywEjrrSjS4-TU8aWEGuhFJRNs3B-boQ6-w4sonclsm48VZI5HGB3jkbMDuOcpkrX_fPlennql59ZTN7rrTH8cyCzWPka1jJF123Nn3UENaCAvaucVuCxD1Xe-zO-l_bB0zfZIrt3SDeh6gwECL1t7D2u0ofIr4kwS4ruwCG0Br3so8dXYJu_RfXW-DS96sCuFnYyqW7bSiyDfFino-tvacvMrhZA0db-MSbv_pnqA9nIlazoP03WS2__on5mduylUOfinzpb5DEBdqUdiiX8gLiLKp_1W5bT2m-7GWP9mjxqLVubeBz_V34RNA-LHJiepMCcvY4dVCPlfZuaWuaZ8batnJaaA3lT02B5x7bxg4vhRjZWRm2W8mULc0vo4jM4UbWjpMQRAthL_ldJZn25FZB8Ci-H4XJGxTbSEp6xF6_gUGhCSJyW1kIjlekgcdObfVIlaJUyk4vC9VKDrCGNI3mKnZ_Yd5Hv7wyUakPxKYVP_rnwdEf0p0pVF0vmkRuSAxh4qt9nNwPxGQFy0BhhFwyKSnXL3gdNcAmX8YyXP7QK2ld3b0jKOoVa4iQc-OQnBgoRbyXp3WhOday9U81bQpaV-SwpyxHQTGRadL8WRZ8TymBUC2yiY-JOEvyHUp_Yv5f_8HKG4QqS4LAAA=";
			this.powerBiControls.embedReport("b4cac543-65c3-4a1a-b0dd-dc47f8acefd9", "be8908da-da25-452e-b220-163f52476cdd", embedToken);
			/*	powerBiControls*/
		},

		onPowerBiCancel: function() {
			this.oPowerBiFragment.close();
			this.oPowerBiFragment.destroy();
			this.oPowerBiFragment = undefined;
		},

		onPowerBiFullscreen: function() {
			this.powerBiControls.fullscreen();
		},

		/*	onPowerBiSnapShot:function(){
					this.powerBiControls.takeScreenShot();
			},*/

		onDesignatePress: function(oEvent) {
			if (this.getModel("dashBoardModel").getProperty("/appsTab/currentSelectKey") === "downTimeCapture") {
				var currentObj = oEvent.getSource().getBindingContext("dashBoardModel").getObject();
				var oGenModel = this.getModel("dashBoardModel");
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "YYYY-MM-dd"
				});
				var dateFormatted = dateFormat.format(new Date(currentObj.createdAt.split(" ")[0]));

				oGenModel.setProperty("/downTime/hourkey", currentObj.durationByRocHour);
				oGenModel.setProperty("/downTime/minuteKey", currentObj.durationByRocMinute);
				oGenModel.setProperty("/downTime/wellName", currentObj.well);
				oGenModel.setProperty("/downTime/downtimeParentKey", currentObj.downtimeCode);
				oGenModel.setProperty("/downTime/date", dateFormatted);
				oGenModel.setProperty("/downTime/dateUnFormatted", currentObj.createdAt);
				oGenModel.setProperty("/downTime/isReview", true);
				oGenModel.setProperty("/downTime/muwi", currentObj.muwi);
				oGenModel.setProperty("/downTime/id", currentObj.id);
				this.onDownTimeParentSelect(currentObj.downtimeCode + "_" + currentObj.childCode);
			}
			var oFragmentId = "idDesignateFrag",
				oFragmentName = "com.murphy.ioprocapp.fragment.designateView";
			if (!this.oDesignateFragment) {
				this.oDesignateFragment = this._createFragment(oFragmentId, oFragmentName);
				this.getView().addDependent(this.oDesignateFragment);
			}
			this.oDesignateFragment.open();
		},

		onDesignateClose: function() {
			this.oDesignateFragment.close();
			this.clearDownTime();
		},

		onDesignateSave: function() {
			var isDesignateCreate = true;
			this.onDownTimeSavePress("", isDesignateCreate);
		},

		onAlarmSearchPress: function() {
			var searchParams = this.getModel("dashBoardModel").getProperty("/alarmSearchParams");
			this.onAlarmSearchClear();
		},

		onAlarmSearchClear: function() {
			this.getModel("dashBoardModel").setProperty("/alarmSearchParams", {});
		},

		onReportLoad: function() {
			var sUrl = "/taskmanagementRest/audit/getAudit";
			this.getModel("dashBoardModel").setProperty("/busyIndicators/detailReport", true);
			this.doAjax(sUrl, "GET", null, function(oData) {
				if (oData.responseMessage.statusCode === "0") {
					this.getModel("dashBoardModel").setProperty("/reportList", oData.tasks);
					this.getModel("dashBoardModel").setProperty("/busyIndicators/detailReport", false);
				} else {
					this._showToastMessage(oData.responseMessage.message);
					this.getModel("dashBoardModel").setProperty("/busyIndicators/detailReport", true);
				}
			}.bind(this), function(oError) {
				var sErrorMessage;
				sErrorMessage = oError.getParameter("statusText");
				this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
				this.getModel("dashBoardModel").setProperty("/busyIndicators/detailReport", true);
			}.bind(this));
		},

		onRightPress: function(oEvent) {
			var oContext = oEvent.getParameters();
			if (oContext.src.getBindingContext("oReportDetailModel") && this.getModel("dashBoardModel").getProperty("/alarmDetailKey") !==
				"Acknowledged") {
				this.getModel("dashBoardModel").setProperty("/alarmRefresh", false);
				this.onOpenAlarmAction(oContext.src, oContext.target);
			}
		},

		onOpenAlarmAction: function(oContext, sTarget) {
			var oFragmentId = "idAlarmActionList",
				oFragmentName = "com.murphy.ioprocapp.fragment.alarmActionList";
			if (!this.alarmActionList) {
				this.alarmActionList = this._createFragment(oFragmentId, oFragmentName);
				this.getView().addDependent(this.alarmActionList);
			}
			this.onAlarmSelectionChange(oContext);
			this.alarmActionList.setOffsetX(-30);
			this.alarmActionList.openBy(sTarget);
		},

		onSelectAlarmClassification: function(oEvent) {
			var oContext = oEvent.getSource().getBindingContext("oReportDetailModel").getObject();
			var sBtnText = oEvent.getSource().getSelectedButton().getText();
			if (sBtnText === "DT") {
				sBtnText = "Downtime";
			} else {
				sBtnText = "Non Downtime";
			}
			oContext.downTimeClassifier = sBtnText;
			var sUrl = "/taskmanagementRest/alarmFeed/updateClassifier";
			this.doAjax(sUrl, "POST", oContext, function(oData) {
				if (oData.statusCode === "0") {
					this.getAlarmData();
				} else {
					this._showToastMessage(oData.responseMessage.message);
				}
			}.bind(this), function(oError) {
				var sErrorMessage;
				sErrorMessage = oError.getParameter("statusText");
				this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
			}.bind(this));
		},

		getAlarmData: function() {
			this.getModel("dashBoardModel").setProperty("/busyIndicators/alarmListBusy", true);
			this.getModel("oReportDetailModel").setProperty("/alarmList", []);
			var oAppContId = this.getView().createId("appscollectioncontainer");
			var oAlarmList = sap.ui.getCore().byId(oAppContId + "--alarmList--idAlarmList");
			oAlarmList.setMode("MultiSelect");
			var sUrl = "/taskmanagementRest/alarmFeed/getAlarm";
			var selHier = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentLocationType");
			if (selHier === "SEARCH") {
				selHier = "WELL";
			}
			var selectedLoc = this.getModel("dashBoardModel").getProperty("/hierarchyDetails/currentSelectedObject");
			if (selectedLoc.length === 0) {
				this.getModel("dashBoardModel").setProperty("/busyIndicators/alarmListBusy", false);
				sap.ui.getCore().byId(oAppContId + "--alarmList--idPageNumberDiv").setVisible(false);
				this.getModel("dashBoardModel").setProperty("/screenSize/alarmListHeight", (sap.ui.Device.resize.height - 110) + "px");
				return;
			}
			var locations = this.getCommaSeperatedLocFromDto(selectedLoc, "location");
			var oPayload = {
				"locationType": selHier,
				"locations": locations,
				"acknowledged": false,
				"page": this.getModel("dashBoardModel").getProperty("/selectedPage")
			};
			if (this.getModel("dashBoardModel").getProperty("/alarmDetailKey") === "Acknowledged") {
				oAlarmList.setMode("None");
				oPayload.acknowledged = true;
			}
			this.doAjax(sUrl, "POST", oPayload, function(oData) {
				if (oData.responseMessage && oData.responseMessage.statusCode === "0") {
					if (this.alarmActionList && this.alarmActionList.isOpen()) {
						this.alarmActionList.close();
					}
				/*	if (this.getModel("dashBoardModel").getProperty("/testDesignate")) {
						oData.alarmsList[1].isDesignate = "TRUE";
					}
					if (this.getModel("dashBoardModel").getProperty("/testDispatch")) {
						oData.alarmsList[1].isDispatch = "TRUE";
					}*/
					this.getModel("oReportDetailModel").setProperty("/alarmList", oData.alarmsList);
					this.getModel("dashBoardModel").setProperty("/alarmCount", oData.totalCount);
					this.getModel("dashBoardModel").setProperty("/alarmPageCount", oData.pageCount);
					if (parseInt(this.getModel("dashBoardModel").getProperty("/selectedPage")) === 1) {
						this.generatePagination();
					}
					sap.ui.getCore().byId(oAppContId + "--alarmList--idCurrentPage").setText("Page : " + this.getModel("dashBoardModel").getProperty(
						"/selectedPage"));
					this.onAlarmSelectionClear();
					this.getModel("dashBoardModel").setProperty("/busyIndicators/alarmListBusy", false);
				} else {
					this.getModel("dashBoardModel").setProperty("/busyIndicators/alarmListBusy", false);
					if (oData.responseMessage) {
						this._showToastMessage(oData.responseMessage.message);
					}
				}
			}.bind(this), function(oError) {
				this.getModel("dashBoardModel").setProperty("/busyIndicators/alarmListBusy", false);
				var sErrorMessage;
				sErrorMessage = oError.getParameter("statusText");
				this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
			}.bind(this));
		},

		/**
		 * Method is called initially to create the pagination.
		 *
		 */
		generatePagination: function() {
			var oDefaultDataModel = this.getModel("dashBoardModel");
			var totalTasks = parseInt(oDefaultDataModel.getProperty("/alarmCount"));
			var tasksPerPage = parseInt(oDefaultDataModel.getProperty("/alarmPageCount"));
			//__xmlview1--appscollectioncontainer--alarmList--idPrevButton
			var oAppContId = this.getView().createId("appscollectioncontainer");
			sap.ui.getCore().byId(oAppContId + "--alarmList--idPrevButton").setEnabled(false);
			sap.ui.getCore().byId(oAppContId + "--alarmList--idNextButton").setEnabled(true);
			var pageCount = parseInt(totalTasks / tasksPerPage); //tasksPerPage
			if (totalTasks % tasksPerPage !== 0) {
				pageCount = pageCount + 1;
			}
			oDefaultDataModel.setProperty("/numberOfPages", pageCount);
			var array = [];
			if (pageCount > 5) {
				pageCount = 5;
			} else {
				sap.ui.getCore().byId(oAppContId + "--alarmList--idNextButton").setEnabled(false);
			}
			for (var i = 1; i <= pageCount; i++) {
				var object = {
					"text": i
				};
				array.push(object);
			}
			this.getModel("dashBoardModel").setProperty('/pageArray', array);
			sap.ui.getCore().byId(oAppContId + "--alarmList--idCurrentPage").setText("Page : " + oDefaultDataModel.getProperty("/selectedPage"));
			if (oDefaultDataModel.getProperty("/numberOfPages") && parseInt(oDefaultDataModel.getProperty("/numberOfPages")) > 1) {
				sap.ui.getCore().byId(oAppContId + "--alarmList--idPageNumberDiv").setVisible(true);
				this.getModel("dashBoardModel").setProperty("/screenSize/alarmListHeight", (sap.ui.Device.resize.height - 160) + "px");
			} else {
				sap.ui.getCore().byId(oAppContId + "--alarmList--idPageNumberDiv").setVisible(false);
				this.getModel("dashBoardModel").setProperty("/screenSize/alarmListHeight", (sap.ui.Device.resize.height - 110) + "px");
			}
		},

		/**
		 * Method is called when user clicks on the previous button in the pagination.
		 * @param: event - search event.
		 * 
		 */
		onScrollLeft: function() {
			var oDefaultDataModel = this.getModel("dashBoardModel");
			var oAppContId = this.getView().createId("appscollectioncontainer");
			sap.ui.getCore().byId(oAppContId + "--alarmList--idPrevButton").setEnabled(true);
			sap.ui.getCore().byId(oAppContId + "--alarmList--idNextButton").setEnabled(true);
			var paginatedData = this.getView().getModel("dashBoardModel").getData().pageArray;
			var selectedPage = parseInt(oDefaultDataModel.getProperty("/selectedPage"));
			var startValue = parseInt(paginatedData[0].text);
			var startNumber = 1;
			var array = [];
			if ((startValue - 1) === 1) {
				startNumber = 1;
				sap.ui.getCore().byId(oAppContId + "--alarmList--idPrevButton").setEnabled(false);
			} else {
				startNumber = selectedPage - 3;
			}
			for (var i = startNumber; i <= (startNumber + 4); i++) {
				var object = {
					"text": i
				};
				array.push(object);
			}
			this.getModel("dashBoardModel").setProperty('/pageArray', array);
			oDefaultDataModel.setProperty("/selectedPage", (parseInt(oDefaultDataModel.getProperty("/selectedPage")) - 1));
			this.getAlarmData();
		},

		/**
		 * Method is called when user clicks on the next button in the pagination.
		 * 
		 */
		onScrollRight: function() {
			var oDefaultDataModel = this.getModel("dashBoardModel");
			var oAppContId = this.getView().createId("appscollectioncontainer");
			sap.ui.getCore().byId(oAppContId + "--alarmList--idPrevButton").setEnabled(true);
			sap.ui.getCore().byId(oAppContId + "--alarmList--idNextButton").setEnabled(true);
			var paginatedData = this.getView().getModel("dashBoardModel").getData().pageArray;
			var selectedPage = parseInt(oDefaultDataModel.getProperty("/selectedPage"));
			var startNumber = 1;
			var array = [];
			if (selectedPage > 2) {
				if ((selectedPage + 3) >= oDefaultDataModel.getProperty("/numberOfPages")) {
					sap.ui.getCore().byId(oAppContId + "--alarmList--idNextButton").setEnabled(false);
					startNumber = parseInt(oDefaultDataModel.getProperty("/numberOfPages")) - 4;
				} else {
					startNumber = selectedPage - 1;
				}
			} else {
				sap.ui.getCore().byId(oAppContId + "--alarmList--idPrevButton").setEnabled(false);
			}
			for (var i = startNumber; i <= (startNumber + 4); i++) {
				var object = {
					"text": i
				};
				array.push(object);
			}
			this.getModel("dashBoardModel").setProperty('/pageArray', array);
			oDefaultDataModel.setProperty("/selectedPage", (parseInt(oDefaultDataModel.getProperty("/selectedPage")) + 1));
			this.getAlarmData();
		},

		/**
		 * Method is called when user clicks on the particular page number.
		 * 
		 */
		onPageClick: function(oEvent) {
			var oDefaultDataModel = this.getModel("dashBoardModel");
			var selectedPage = oEvent.getSource().getText();
			oDefaultDataModel.setProperty("/selectedPage", selectedPage);
			this.getAlarmData();
		},

		onDowntimeTblSearch: function(oEvent) {
			var value = oEvent.getSource().getValue();
			var oAppContId = this.getView().createId("appscollectioncontainer");
			var oDTList = sap.ui.getCore().byId(oAppContId + "--downtimecptureapp--downTimeCaptureTable");
			var aFilters;
			var filterParams = ["well", "childCode", "downtimeCode", "createdAt", "duration", "rcTime", "downtimeText", "childText"];
			var filterArray = [];
			if (value) {
				for (var i = 0; i < filterParams.length; i++) {
					filterArray.push(new sap.ui.model.Filter(filterParams[i], sap.ui.model.FilterOperator.Contains, value));
				}
				aFilters = new sap.ui.model.Filter({
					filters: filterArray,
					and: false
				});
			}
			oDTList.getBinding("items").filter(aFilters);
		},

		/*End of Methods by Kiruthika*/

		/////////////////methods for suggestion Input
		onLivechange: function(evt) {
			this.oSuggestionParentInput = evt.getSource();
			var oFragmentId = "oSuggestionPopover",
				oFragmentName = "com.murphy.ioprocapp.fragment.SuggestionListPopover";
			if (!this.oSuggestionList) {
				this.oSuggestionList = this._createFragment(oFragmentId, oFragmentName);
				this.getView().addDependent(this.oSuggestionList);
			}
			var query = evt.getSource().getValue();
			this.oSuggestionList.openBy(this.oSuggestionParentInput);
			/* if (query === "") {
			this.oSuggestionList.close();
			}*/
			if (query && query.length > 0) {
				var filterParams = ["firstName", "lastName"];
				var filterArray = [];
				for (var i = 0; i < filterParams.length; i++) {
					filterArray.push(new sap.ui.model.Filter(filterParams[i], sap.ui.model.FilterOperator.Contains, query));
				}
				var aFilters = new sap.ui.model.Filter({
					filters: filterArray,
					and: false
				});
			}
			var oList = sap.ui.core.Fragment.byId("oSuggestionPopover", "suggestionlist");
			var binding = oList.getBinding("items");
			binding.filter(aFilters);
		},

		onpopoverOpen: function() {
			this.oSuggestionParentInput.focus();
		},

		_initilizeLocalModelForSuggestions: function(oModel) {
			oModel.setProperty("/currentSelectedObjects", {});

			oModel.setProperty("/suggestionItems", []);
		},

		_getCurrentNearByUser: function(lat, lng, muwi) {
			var sUrl = "/taskmanagementRest/location/getNearestUsers";
			var isCreateTask = this.getModel("dashBoardModel").getProperty("/isCreateTask");
			if (lat && lng && isCreateTask) {
				sUrl = sUrl + "?latitude=" + lat + "&longitude=" + lng;
			} else if (!muwi) {
				sUrl = sUrl + "?latitude=28.4248829&longitude=-99.6108322";
			} else {
				sUrl = "/taskmanagementRest/location/getNearestUsersByMuwi?muwi=" + muwi;
			}
			//var sUrl = "/taskmanagementRest/location/getNearestUsers?latitude=28.4248829&longitude=-99.6108322";
			this.doAjax(sUrl, "GET", null, function(oData) {

				this.getModel("dashBoardModel").setProperty("/suggestionItems", oData.nearestUsers);

			}.bind(this), function(oError) {
				var sErrorMessage;
				sErrorMessage = oError.getParameter("statusText");
				this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
			}.bind(this));
		},
		onSuggestionListItemPress: function(evt) {

			this.setSelections(evt, "press");

		},
		onSuggestionListItemSelectionChange: function(evt) {

			this.oSuggestionParentInput.focus();
			if (evt.getParameter("selected")) {
				this.setSelections(evt, "select");

			} else {
				var oCurrentObject = evt.getParameter("listItem").getBindingContext("dashBoardModel").getObject();
				this.removeSelections(oCurrentObject, "uncheck");
			}

		},
		removeSelections: function(oCurrentObject, sType) {
			var aNewArry = [];

			var oObj = this.getModel("dashBoardModel").getProperty("/currentSelectedObjects");
			if (sType === "token") {
				var oListItems = sap.ui.core.Fragment.byId("oSuggestionPopover", "suggestionlist").getSelectedItems();
				$.each(oListItems, function(iIndex, oObj) {
					if (oObj.getBindingContext("dashBoardModel").getObject().userId === oCurrentObject.userId) {
						oObj.setSelected(false);
					}
				}.bind(this));
			}
			$.each(oObj, function(index, oValue) {
				if (oCurrentObject.userId !== oValue.userId) {
					aNewArry.push(oValue);
				}
			});
			this.getModel("dashBoardModel").setProperty("/currentSelectedObjects", aNewArry);
		},
		setSelections: function(oEvent, sEvent) {
			this.oSuggestionParentInput.setValue("");
			var oListItem = oEvent.getParameter("listItem");
			var oPressedObject = oListItem.getBindingContext("dashBoardModel").getObject();
			var userName = oPressedObject.firstName + oPressedObject.lastName;
			var sUrl = "/taskmanagementRest/user/getDetails?userName=" + userName;
			var oSelectedItems = oEvent.getSource().getSelectedItems(),
				sTextString = "";
			this.doAjax(sUrl, "GET", null, function(oData) {
					if (oData && oData.isExists === true) {
						//remove the temp arry data if any since a fresh push 
						oPressedObject.emailId = oData.emailId;
						var aTemporarySuggestion = [];
						if (oSelectedItems.length > 0) {
							$.each(oSelectedItems, function(indx, val) {
								var oCurrentBindObj = val.getBindingContext("dashBoardModel").getObject();
								aTemporarySuggestion.push(oCurrentBindObj);
							}.bind(this));
						}
						if (sEvent === "press") {
							oListItem.setSelected(true);
							aTemporarySuggestion.push(oPressedObject);
							//this.oSuggestionList.close();
						}
						var oObj = this.getModel("dashBoardModel").getProperty("/currentSelectedObjects");
						$.each(oObj, function(indx, val) {
							aTemporarySuggestion.push(val);
						}.bind(this));
						aTemporarySuggestion = this.removeDuplicates(aTemporarySuggestion, "emailId");
						this.getModel("dashBoardModel").setProperty("/currentSelectedObjects", aTemporarySuggestion);
						// this.getModel("dashBoardModel").setProperty("/abcd", sTextString);
						this.oSuggestionParentInput.fireLiveChange();
					} else {
						this._showToastMessage("Selected user is not available in IDP");
						this.removeSelections(oPressedObject, "uncheck");
						oListItem.setSelected(false);
						this.oSuggestionParentInput.fireLiveChange();
					}
				}.bind(this),
				function(oError) {
					this._createConfirmationMessage("Error", oError.statusText, "Error", "", "Close", false, null);
				}.bind(this));
		},
		onTokenDelete: function(evt) {

			var tokenObj = evt.getParameter("token").getBindingContext("dashBoardModel").getObject();
			this.removeSelections(tokenObj, "token");
		},
		onTokenDeselect: function(evt) {

			if (evt.getParameter("type") === "removed") {
				var tokenObj = evt.getParameter("removedTokens")[0].getBindingContext("dashBoardModel").getObject();
				this.removeSelections(tokenObj, "token");
			}
		},
		removeDuplicates: function(originalArray, prop) {
			var newArray = [];
			var lookupObject = {};

			for (var i in originalArray) {
				lookupObject[originalArray[i][prop]] = originalArray[i];
			}

			for (i in lookupObject) {
				newArray.push(lookupObject[i]);
			}
			return newArray;
		},

		onPressDownloadReport: function() {
			var sUrl = "/taskmanagementRest/audit/getReport";
			this.doAjax(sUrl, "GET", null, function(oData) {
				if (oData) {
					this.onClickDownloadLink("", oData);
				} else {
					this._createConfirmationMessage("Error", oData.message, "Error", "", "Close", false, null);
				}
			}.bind(this), function(oError) {
				var sErrorMessage;
				sErrorMessage = oError.getParameter("statusText");
				this._createConfirmationMessage("Error", sErrorMessage, "Error", "", "Close", false, null);
			}.bind(this));
		},
		
		alarmActionListClose: function() {
			this.getModel("dashBoardModel").setProperty("/alarmRefresh", true);
		},
		
		onExit: function() {
				clearInterval(this.oTimerRefresh);
				clearInterval(this.oAlarmRefresh);
			}
			//////////////end of suggestion methods

	});
});