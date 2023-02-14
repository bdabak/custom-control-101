sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.controls.ui.Timer", {
    metadata: {
      properties: {
        title: { type: "string", bindable: true, defaultValue: "N/A" },
        hours: { type: "int", bindable: true, defaultValue: 0 },
        minutes: { type: "int", bindable: true, defaultValue: 0 },
        seconds: { type: "int", bindable: true, defaultValue: 0 },
        _started: { type: "boolean", bindable: false, defaultValue: false },
      },
      aggregations: {
        _playButton: {
          type: "sap.m.Button",
          multiple: false,
        },
      },
      events: {},
    },

    init: function () {
      //First activates
      var sLibraryPath = jQuery.sap.getModulePath("com.smod.controls"); //get the server location of the ui library
      jQuery.sap.includeStyleSheet(sLibraryPath + "/ui/Timer.css");

      var oPB = new sap.m.Button({
        icon: "sap-icon://media-play",
        type: "Accept",
        press: this.toggleTimer.bind(this),
        tooltip: "Başlat/Durdur",
      });

      this.setAggregation("_playButton", oPB);
    },

    toggleTimer: function (oEvent) {
      var bStarted = this.getProperty("_started");
      var oPB = this.getAggregation("_playButton");

      this.setProperty("_started", !bStarted);

      oPB.setIcon(
        !bStarted ? "sap-icon://media-pause" : "sap-icon://media-play"
      );
      oPB.setType(!bStarted ? "Reject" : "Accept");

      if (!bStarted) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    },

    startTimer: function () {
      var h = this.getHours();
      var m = this.getMinutes();
      var s = this.getSeconds();

      this._timerInterval = setInterval(
        function () {
          s = s + 1;
          if (s === 60) {
            m = m + 1;
            s = 0;
          }
          if (m === 60) {
            h = h + 1;
            m = 0;
          }
          this.setHours(h);
          this.setMinutes(m);
          this.setSeconds(s);
        }.bind(this),
        1000
      );
    },
    stopTimer: function () {
      clearInterval(this._timerInterval);
    },

    renderer: function (oRM, oControl) {
      var oPB = oControl.getAggregation("_playButton");

      oRM.openStart("div"); //<div main
      oRM.writeControlData(oControl);
      oRM.class("smod-timer");
      oRM.openEnd(); //>

      oRM.openStart("div"); //<div title begin
      oRM.class("smod-timer-title");
      oRM.openEnd(); //>
      oRM.text(oControl.getTitle());
      oRM.close("div"); //</div> title end

      oRM.openStart("div"); //<div content begin
      oRM.class("smod-timer-content");
      oRM.openEnd(); //>

      oRM.openStart("div"); //<div digits begin
      oRM.class("smod-timer-content-digits");
      oRM.openEnd(); //>

      var sTimer =
        oControl.pad2Digits(oControl.getHours()) +
        ":" +
        oControl.pad2Digits(oControl.getMinutes()) +
        ":" +
        oControl.pad2Digits(oControl.getSeconds());

      oRM.text(sTimer);
      oRM.close("div"); //</div> digits end

      oRM.openStart("div"); //<div buttons begin
      oRM.class("smod-timer-content-buttons");
      oRM.openEnd(); //>
      oRM.renderControl(oPB);
      oRM.close("div"); //</div> buttons end

      oRM.close("div"); //</div> content end

      oRM.close("div"); //</div> main
    },
    pad2Digits: function (n) {
      return n.toString().padStart(2, "0");
    },
  });
});
