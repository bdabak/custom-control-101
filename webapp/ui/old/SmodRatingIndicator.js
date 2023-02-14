sap.ui.define(
  ["sap/ui/core/Control", "com/smod/controls/controls/SmodRatingItem"],
  function (Control, SmodRatingItem) {
    "use strict";

    return Control.extend("com.smod.controls.ui.SmodRatingIndicator", {
      metadata: {
        properties: {
          selectedValue: { type: "int", bindable: true },
          selectedValueText: { type: "string", bindable: true },
          editable: { type: "boolean", bindable: true, defaultValue: true },
          radioName: { type: "string", bindable: false },
        },
        aggregations: {
          ratingItems: {
            type: "com.smod.controls.ui.SmodRatingItem",
            multiple: true,
            singularName: "ratingItem",
          },
        },
        defaultAggregation: "ratingItems",
        events: {
          change: {},
        },
      },
      init: function () {
        //initialisation code, in this case, ensure css is imported
        var sLibraryPath = jQuery.sap.getModulePath("com.smod.controls"); //get the server location of the ui library
        jQuery.sap.includeStyleSheet(
          sLibraryPath + "/controls/SmodRatingIndicator.css"
        );
        var vRadioName = crypto.randomUUID();
        this.setProperty("radioName", vRadioName, true);
      },
      renderer: function (oRM, oControl) {
        var items = oControl.getRatingItems();
        var radioName = oControl.getRadioName();

        var initialValueItem = new SmodRatingItem({
          value: -1,
          valueText: "",
          selected:
            !oControl.getSelectedValue() || oControl.getSelectedValue() === -1,
          hidden: true,
        }).setParent(oControl);

        //Main content begin
        oRM.openStart("div");
        oRM.writeControlData(oControl);
        oRM.class("smod-rating-container");
        oRM.attr("control-id", radioName);
        oRM.openEnd();

        oRM.openStart("div");
        oRM.class("smod-rating-group");
        oRM.openEnd();

        //Add aggregation rating items
        items.unshift(initialValueItem);
        items.forEach(function (item) {
          var isSelected = oControl.getSelectedValue() === item.getValue();

          item.setSelected(isSelected);
          if (isSelected) oControl.setSelectedValueText(item.getValueText());
          oRM.renderControl(item);
        });

        oRM.openStart("div");
        oRM.class("smod-rating-value-text");
        if (oControl.getSelectedValueText()) {
          oRM.class("show");
        }
        oRM.openEnd();
        oRM.text(oControl.getSelectedValueText());
        oRM.close("div"); //Rating group end

        oRM.close("div"); //Rating group end

        oRM.close("div"); //Rating container end
      },
    });
  }
);
