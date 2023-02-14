/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsmodcontrolsrating/custom-control-rating/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
