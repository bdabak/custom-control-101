sap.ui.define(
  ["sap/ui/core/Control", "./StarRatingItem"],
  function (Control, StarRatingItem) {
    "use strict";

    return Control.extend("com.smod.controls.ui.StarRating", {
      metadata: {
        properties: {
          selectedValue: { type: "string", bindable: true },
          selectedValueText: { type: "string", bindable: true },
          editable: { type: "boolean", bindable: true, defaultValue: true },
          radioName: { type: "string", bindable: false },
          excludedValues: { type: "object", bindable: true },
        },
        aggregations: {
          ratingItems: {
            type: "com.smod.controls.ui.StarRatingItem",
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
        jQuery.sap.includeStyleSheet(sLibraryPath + "/controls/StarRating.css");
        // var vRadioName = crypto.randomUUID();
        var vRadioName = "RIRG_" + new Date().getTime();
        this.setProperty("radioName", vRadioName, true);
      },
      renderer: function (oRM, oControl) {
        var items = oControl.getRatingItems();
        var excludedValues = this.getParent()?.getExcludedValues() || [];
        var radioName = oControl.getRadioName();

        var initialValueItem = new StarRatingItem({
          value: null,
          valueText: "",
          selected:
            !oControl.getSelectedValue() ||
            oControl.getSelectedValue() === null,
          hidden: true,
        }).setParent(oControl);

        //Main content begin
        oRM.openStart("div");
        oRM.writeControlData(oControl);
        oRM.class("star-rating-main");
        oRM.attr("control-id", radioName);
        oRM.openEnd();

        oRM.openStart("div");
        oRM.class("star-rating-items");
        oRM.openEnd();

        items.forEach(function (item, index) {
          if (index === 0) {
            //Input begin
            oRM.openStart("input");
            oRM.class("star-rating-item-input");
            oRM.class("star-null");
            oRM.attr("type", "radio");
            oRM.attr("name", radioName);
            oRM.attr("value", null);
            if (
              oControl.getSelectedValue() === null ||
              !oControl.getSelectedValue()
            ) {
              oRM.attr("checked", true);
            }

            oRM.attr("id", "id-" + radioName + "-star-null");

            oRM.openEnd(); //Input
            oRM.close("input"); //Input
          }

          var sStarName = "star-" + (index + 1);
          //Input begin
          oRM.openStart("input");
          oRM.class("star-rating-item-input");
          oRM.class(sStarName);
          oRM.attr("type", "radio");
          oRM.attr("name", radioName);
          oRM.attr("value", item.getValue());
          if (oControl.getSelectedValue() === item.getValue()) {
            oRM.attr("checked", true);
          }

          oRM.attr("id", "id-" + radioName + "-" + sStarName);

          oRM.openEnd(); //Input
          oRM.close("input"); //Input
        });

        //Rating container begin
        oRM.openStart("section");
        oRM.class("star-rating-container");
        oRM.openEnd();

        items.unshift(initialValueItem);
        items.forEach(function (item, index) {
          var isSelected = oControl.getSelectedValue() === item.getValue();

          item.setSelected(isSelected);
          item.setIndex(index);
          if (isSelected) oControl.setSelectedValueText(item.getValueText());
          oRM.renderControl(item);
        });
        oRM.close("section");
        //Rating container end

        //Label
        // oRM.openStart("label");
        // oRM.class("star-rating-item-label");
        // oRM.attr("for", "id-" + radioName + "-star-null");
        // oRM.openEnd(); //Label
        // oRM.text("Clear");
        // oRM.close("label"); //Label

        oRM.close("div");

        //Rating value text begin
        oRM.openStart("div");
        oRM.class("star-rating-value-text");
        if (oControl.getSelectedValueText()) {
          oRM.class("show");
        }
        oRM.openEnd();
        oRM.text(oControl.getSelectedValueText());
        oRM.close("div");
        //Rating value text end

        oRM.close("div");
        //Main content end
      },
    });
  }
);
