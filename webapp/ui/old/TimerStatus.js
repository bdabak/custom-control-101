sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.controls.ui.TimerStatus", {
    metadata: {
      properties: {
        state: { type: "string", bindable: true, defaultValue: "none" },
      },
      aggregations: {},
      events: {},
    },

    renderer: function (oRM, oControl) {
      oRM.openStart("div"); //Main div begin
      oRM.class("smod-timer-status");
      oRM.writeControlData(oControl);
      oRM.openEnd();

      oRM.openStart("div"); //Span hour begin
      oRM.class("smod-timer-status-" + oControl.getState());
      oRM.openEnd();
      oRM.close("div"); //Span hour end

      oRM.close("div"); //Main div end
    },
  });
});
