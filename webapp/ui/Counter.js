sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.controls.ui.Counter", {
    metadata: {
      properties: {
        value: { type: "int", bindable: true },
      },
      aggregations: {
        _decrementButton: {
          type: "sap.m.Button",
          multiple: false,
        },
        _incrementButton: {
          type: "sap.m.Button",
          multiple: false,
        },
      },
      events: {
        change: {
          parameters: {
            oldValue: { type: "int" },
            newValue: { type: "int" },
          },
        },
      },
    },

    init: function () {
      //First activates
      var sLibraryPath = jQuery.sap.getModulePath("com.smod.controls"); //get the server location of the ui library
      jQuery.sap.includeStyleSheet(sLibraryPath + "/ui/Counter.css");
      var that = this;
      var oDB = new sap.m.Button({
        icon: "sap-icon://less",
        type: "Reject",
      }).addStyleClass("sapUiTinyMarginEnd");
      that.setAggregation("_decrementButton", oDB);

      var oIB = new sap.m.Button({
        icon: "sap-icon://add",
        type: "Accept",
      }).addStyleClass("sapUiTinyMarginBegin");
      that.setAggregation("_incrementButton", oIB);
    },

    renderer: function (oRM, oControl) {
      var oDB = oControl.getAggregation("_decrementButton");
      var oIB = oControl.getAggregation("_incrementButton");

      oIB.detachPress(oControl._increment, oControl);
      oIB.attachPress(oControl._increment, oControl);

      oDB.detachPress(oControl._decrement, oControl);
      oDB.attachPress(oControl._decrement, oControl);

      oRM.openStart("div"); //<div
      oRM.writeControlData(oControl);
      oRM.class("smod-counter");
      oRM.openEnd(); //>

      oRM.openStart("div"); //Agg cont
      oRM.class("smod-counter-content");
      oRM.openEnd(); //>

      oRM.renderControl(oDB);

      //--Value
      oRM.text(oControl.getValue());
      //--Value

      oRM.renderControl(oIB);

      oRM.close("div"); //</div>

      oRM.close("div"); //</div>
    },

    _changeValue: function (operation) {
      var iVal = this.getValue();
      var oVal = iVal;

      iVal = operation === "+" ? iVal + 1 : iVal - 1;

      this.setValue(iVal);

      this.fireChange({ newValue: iVal, oldValue: oVal });
    },
    _increment: function () {
      this._changeValue("+");
    },
    _decrement: function () {
      this._changeValue("-");
    },
  });
});
