sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.controls.ui.TimerDigits", {
    metadata: {
      properties: {
        hours: { type: "int", bindable: true, defaultValue: 0 },
        minutes: { type: "int", bindable: true, defaultValue: 0 },
        seconds: { type: "int", bindable: true, defaultValue: 0 },
      },
      aggregations: {},
      events: {},
    },

    renderer: function (oRM, oControl) {
      oRM.openStart("div"); //Main div begin
      oRM.class("smod-timer-digits");
      oRM.writeControlData(oControl);
      oRM.openEnd();

      oRM.openStart("span"); //Span hour begin
      oRM.class("smod-timer-digit-hour");
      oRM.openEnd();
      oRM.text(oControl.padTo2Digits(oControl.getHours()));
      oRM.close("span"); //Span hour end

      oRM.openStart("span"); //Span : begin
      oRM.class("smod-timer-colon");
      oRM.openEnd();
      oRM.text(":");
      oRM.close("span"); //Span : end

      oRM.openStart("span"); //Span min begin
      oRM.class("smod-timer-digit-min");
      oRM.openEnd();
      oRM.text(oControl.padTo2Digits(oControl.getMinutes()));
      oRM.close("span"); //Span min end

      oRM.openStart("span"); //Span : begin
      oRM.class("smod-timer-colon");
      oRM.openEnd();
      oRM.text(":");
      oRM.close("span"); //Span : end

      oRM.openStart("span"); //Span sec begin
      oRM.class("smod-timer-digit-sec");
      oRM.openEnd();
      oRM.text(oControl.padTo2Digits(oControl.getSeconds()));
      oRM.close("span"); //Span sec end

      oRM.close("div"); //Main div end
    },

    startTimer: function () {
      var that = this;
      this.timeInterval = setInterval(function () {
        var h = that.getHours();
        var m = that.getMinutes();
        var s = that.getSeconds();

        s = s + 1;

        if (s === 60) {
          m = m + 1;
          s = 0;
        }

        if (m === 60) {
          h = h + 1;
          m = 0;
        }

        that.setProperty("hours", h, false);
        that.setProperty("minutes", m, false);
        that.setProperty("seconds", s, false);
      }, 1000);
    },
    stopTimer: function () {
      clearInterval(this.timeInterval);
    },
    padTo2Digits: function (num) {
      return num.toString().padStart(2, "0");
    },
  });
});
