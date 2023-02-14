sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/IconPool",
    "./TimerDigits",
    "./TimerStatus",
  ],
  function (Control, IconPool, TimerDigits, TimerStatus) {
    "use strict";

    return Control.extend("com.smod.controls.ui.Timer", {
      metadata: {
        properties: {
          // hours: { type: "int", bindable: true, defaultValue: 0 },
          // minutes: { type: "int", bindable: true, defaultValue: 0 },
          // seconds: { type: "int", bindable: true, defaultValue: 0 },
          started: { type: "boolean", bindable: false, defaultValue: false },
        },
        aggregations: {
          digits: {
            type: "com.smod.controls.ui.TimerDigits",
            multiple: false,
          },
          status: {
            type: "com.smod.controls.ui.TimerStatus",
            multiple: false,
          },
        },
        events: {},
      },

      init: function () {
        //initialisation code, in this case, ensure css is imported
        var sLibraryPath = jQuery.sap.getModulePath("com.smod.controls"); //get the server location of the ui library
        jQuery.sap.includeStyleSheet(sLibraryPath + "/ui/Timer.css");

        var oDigits = new TimerDigits();
        this.setAggregation("digits", oDigits);

        var oStatus = new TimerStatus();
        this.setAggregation("status", oStatus);
      },

      renderer: function (oRM, oControl) {
        var oIB = new sapç();
        //Main div begin
        oRM.openStart("div");
        oRM.class("smod-timer");
        oRM.writeControlData(oControl);
        oRM.openEnd();

        //--Render status
        oRM.renderControl(oControl.getStatus());

        //--Render digits
        oRM.renderControl(oControl.getDigits());

        var oIconInfoPlay = IconPool.getIconInfo("sap-icon://media-play");
        var oIconInfoPause = IconPool.getIconInfo("sap-icon://media-pause");

        oRM.openStart("div"); //Div button begin
        oRM.class("smod-timer-button");

        oRM.class(
          oControl.getStarted() ? "smod-timer-playing" : "smod-timer-stopped"
        );
        oRM.attr("data-sap-ui-icon-content-play", oIconInfoPlay.content);
        oRM.attr("data-sap-ui-icon-content-pause", oIconInfoPause.content);
        oRM.openEnd();
        oRM.close("div"); //Div button end

        oRM.close("div"); //Main div end
      },

      ontap: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(e.target).hasClass("smod-timer-button")) {
          if ($(e.target).hasClass("smod-timer-stopped")) {
            // //--Set to played mode
            // $(e.target).removeClass("smod-timer-stopped");
            // $(e.target).addClass("smod-timer-playing");

            this.startTimer();
          } else if ($(e.target).hasClass("smod-timer-playing")) {
            this.stopTimer();
            // //--Set to pause mode
            // $(e.target).removeClass("smod-timer-playing");
            // $(e.target).addClass("smod-timer-stopped");
          }
        }
      },

      startTimer: function () {
        this.setStarted(true);
        this.getStatus().setState("green");
        this.getDigits().startTimer();
      },
      stopTimer: function () {
        this.setStarted(false);
        this.getStatus().setState("none");
        this.getDigits().stopTimer();
      },
    });
  }
);
