jQuery.sap.declare("com.murphy.ioprocapp.util.powerBiControls");

com.murphy.ioprocapp.util.powerBiControls = {
	takeScreenShot: function() {
		html2canvas(document.getElementById("powerBiPop--powerBiDialog-cont"), {
			onrendered: function(canvas) {
				var tempcanvas = document.createElement('canvas');
				tempcanvas.width = 450;
				tempcanvas.height = 450;
				var context = tempcanvas.getContext('2d');
				context.drawImage(canvas, 0, 0, 1440, 638, 0, 0, 1440, 638);
				var link = document.createElement("a");
				link.href = tempcanvas.toDataURL("image/jpg"); //function blocks CORS
				link.download = "screenshot.jpg";
				link.click();
			}
		});
	},
	embedReport: function(reportId, gid,embedToken) {
		this.embedReportAndSetTokenListener(reportId, gid,embedToken);
	},

	fullscreen: function() {
		var element = $("#embedContainer")[0];
		var report = powerbi.get(element);
		report.fullscreen();
	},

	createConfig: function(embedToken, reportId, groupId) {

		//	'https://app.powerbi.com/reportEmbed?reportId=bac25fa7-d58d-40b6-8b01-606d165c3b43&groupId=be8908da-da25-452e-b220-163f52476cdd'
		var models = window['powerbi-client'].models;
		var permissions = models.Permissions.All;
		var embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=' + reportId + '&groupId=' + groupId;
		var embedConfiguration = {
			type: 'report',
			id: reportId,
			embedUrl: embedUrl,
			tokenType: models.TokenType.Embed,
			permissions: permissions,
			settings: {
				customLayout: {
			pageSize: {
				type: models.PageSizeType.Custom,
				width: 1600,
				height: 1200
			}
					
				},
			displayOption: models.DisplayOption.ActualSize,
				filterPaneEnabled: false,
				extensions: [{
					command: {
						name: "copy",
						title: "copy",
						icon: "",
						extend: {
							visualContextMenu: {
								title: "Copy Key Value"
							}
						}
					}
				}]
			},
			accessToken: embedToken
		};

		return embedConfiguration;

	},
	embedReportAndSetTokenListener: function(reportId, groupId,embedToken) {

		var embedContainer = $('#embedContainer')[0];

		// set config for embedding report
		var config = this.createConfig(embedToken, reportId, groupId);

		//  console.log(config);
		// Get a reference to the embedded report HTML element

		// Embed the report and display it within the div container.
		var report = powerbi.embed(embedContainer, config);

		// Report.off removes a given event handler if it exists.        
		report.off("loaded");
		report.on("loaded", function() {
		
				$("#embedContainer").height("30em");  
					$("#embedContainer").width("80em");  
				
		});

		report.on("dataSelected", function(event) {
			var data = event.detail;
			console.log(data);
		});

	}
};