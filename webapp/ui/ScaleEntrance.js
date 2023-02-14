sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.controls.ui.ScaleEntrance", {
    metadata: {
      properties: {
        scaleList: { type: "object", bindable: true },
        scaleValue: { type: "string", bindable: true },
        editable: { type: "boolean", bindable: true, defaultValue: true },
      },
      aggregations: {
        scaleCustomizer: {
          type: "sap.m.Table",
          multiple: false,
        },
      },
      events: {
        change: {},
      },
    },
    init: function () {
      var that = this;
      //initialisation code, in this case, ensure css is imported
      var sLibraryPath = jQuery.sap.getModulePath("com.smod.controls"); //get the server location of the ui library
      jQuery.sap.includeStyleSheet(
        sLibraryPath + "/controls/ScaleEntrance.css"
      );

      var oModel = new sap.ui.model.json.JSONModel({
        scaleList: [],
        editable: true,
      });

      var oCustomizer = new sap.m.Table({
        columns: [
          new sap.m.Column({
            hAlign: "Center",
            header: new sap.m.Title({ text: "Skala" }),
          }),
          new sap.m.Column({
            width: "7rem",
            hAlign: "Center",
            header: new sap.m.Title({ text: "Min" }),
          }),
          new sap.m.Column({
            width: "7rem",
            hAlign: "Center",
            header: new sap.m.Title({ text: "Max" }),
          }),
        ],
      });

      this.setModel(oModel);

      var oRowTemplate = new sap.m.ColumnListItem({
        cells: [
          new sap.m.Label({
            text: "{Name}",
          }),
          new sap.m.Input({
            value: {
              path: "Low",
              type: "sap.ui.model.type.Float",
              formatOptions: {
                minFractionDigits: 3,
                maxFractionDigits: 3,
              },
            },
            editable: {
              path: "/editable",
            },
            autocomplete: false,
            valueLiveUpdate: false,
            textAlign: "Right",
            change: function (e) {
              if (isNaN(parseFloat(e.getParameter("value")))) {
                e.getSource().setValue(null);
              }
              that._updateScaleText();
            }.bind(that),
          }),
          new sap.m.Input({
            value: {
              path: "High",
              type: "sap.ui.model.type.Float",
              formatOptions: {
                minFractionDigits: 3,
                maxFractionDigits: 3,
              },
            },
            editable: {
              path: "/editable",
            },
            autocomplete: false,
            valueLiveUpdate: false,
            textAlign: "Right",
            change: function (e) {
              if (isNaN(parseFloat(e.getParameter("value")))) {
                e.getSource().setValue(null);
              } else {
                that._setNextMinValue(e);
              }
              that._updateScaleText();
            }.bind(that),
          }),
        ],
      });

      oCustomizer.bindAggregation("items", {
        path: "/scaleList",
        template: oRowTemplate,
      });

      this.setAggregation("scaleCustomizer", oCustomizer);
    },
    renderer: function (oRM, oControl) {
      var oCustomizer = oControl.getAggregation("scaleCustomizer");
      var oModel = oControl.getModel();

      oControl._generateTableFromValue();
      //oModel.setProperty("/scaleList", oControl.getScaleList());
      oModel.setProperty("/editable", oControl.getEditable());

      oRM.openStart("div");
      oRM.writeControlData(oControl);
      oRM.class("smod-scale-entrance");
      oRM.openEnd();

      oRM.renderControl(oCustomizer);

      oRM.close("div");
    },
    _generateTableFromValue: function () {
      var oModel = this.getModel();
      var sScaleValue = this.getScaleValue();
      var aScaleList = [];

      if (!sScaleValue) {
        return;
      }
      var aRows = sScaleValue.split("|") || [];
      if (aRows.length > 0) {
        $.each(aRows, function (i, oRow) {
          var aFields = oRow.split("~") || [];
          var oScaleRow = {
            Name: aFields[0] || null,
            Low: aFields[1] || null,
            High: aFields[2] || null,
          };

          aScaleList.push(oScaleRow);
        });
      }

      oModel.setProperty("/scaleList", aScaleList);
    },
    _setNextMinValue: function (e) {
      var fVal = parseFloat(
        e.getParameter("value").replace(".", "").replace(",", ".")
      );
      var oSource = e.getSource();
      var oContext = oSource.getBindingContext();
      var sPath = oContext.sPath;
      var oModel = oContext.oModel;
      var aScaleList = oModel.getProperty("/scaleList");
      var aPath = sPath.split("/");
      var iNextRow = parseInt(aPath[2]) + 1;
      var sNextPath = "/" + aPath[1] + "/" + iNextRow + "/Low";

      if (aScaleList[iNextRow]) {
        oModel.setProperty(sNextPath, parseFloat(fVal + 0.001).toFixed(3));
      }
    },
    _updateScaleText: function () {
      var oModel = this.getModel();
      var aScaleValue = oModel.getProperty("/scaleList");
      var sScaleText = "";
      $.each(aScaleValue, function (i, oScale) {
        if (sScaleText === "") {
          sScaleText = oScale.Name + "~" + oScale.Low + "~" + oScale.High;
        } else {
          sScaleText =
            sScaleText +
            "|" +
            oScale.Name +
            "~" +
            oScale.Low +
            "~" +
            oScale.High;
        }
      });
      this.setScaleValue(sScaleText);
      console.log(sScaleText);
    },
  });
});
