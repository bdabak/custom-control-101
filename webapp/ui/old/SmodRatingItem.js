sap.ui.define(["sap/ui/core/Control"], function (Control) {
  "use strict";

  return Control.extend("com.smod.controls.ui.SmodRatingItem", {
    metadata: {
      properties: {
        value: { type: "int", bindable: true },
        valueText: { type: "string", bindable: true },
        selected: { type: "boolean", bindable: true, defaultValue: false },
        hidden: { type: "boolean", bindable: true, defaultValue: false },
      },
      aggregations: {},
      events: {},
    },

    /**
     * @override
     */
    onAfterRendering: function () {
      this._refreshActive();
    },

    renderer: function (oRM, oControl) {
      var sSelectedValue = oControl.getParent()?.getSelectedValue();
      var editable = oControl.getParent()?.getEditable();
      var radioName = oControl.getParent()?.getRadioName();

      if (sSelectedValue) {
        sSelectedValue = -1;
      }
      //Label begin
      oRM.openStart("label");
      oRM.class("smod-rating-item-label");
      if (!editable) {
        oRM.class("disabled");
      }
      if (oControl.getHidden()) {
        oRM.class("initial");
      }
      oRM.writeControlData(oControl);
      oRM.attr("for", "id-" + radioName + "-" + oControl.getValue());
      oRM.attr("data-tooltip", oControl.getValueText());
      oRM.openEnd();

      oRM.openStart("i"); //Icon begin
      oRM.class("smod-rating-item-icon");
      oRM.openEnd();

      oRM.close("i"); //Label  end
      oRM.close("label"); //Label  end

      //Input begin
      oRM.openStart("input");
      oRM.class("smod-rating-item-input");
      if (oControl.getHidden()) {
        oRM.class("initial");
      }
      oRM.attr("type", "radio");
      oRM.attr("name", radioName);
      oRM.attr("value", oControl.getValue());
      if (oControl.getSelected()) {
        oRM.attr("checked", true);
      }

      oRM.attr("id", "id-" + radioName + "-" + oControl.getValue());

      oRM.openEnd(); //Input
      oRM.close("input"); //Input
    },

    onmouseover: function (event) {
      var editable = this.getParent()?.getEditable();

      if (editable) {
        if (event.target.className.includes("smod-rating-item-icon")) {
          $(event.currentTarget)
            .parent()
            .find(".smod-rating-item-icon")
            .removeClass("hover-active");
          $(event.currentTarget)
            .nextUntil(":last", ".smod-rating-item-label")
            .find(".smod-rating-item-icon")
            .addClass("hover-passive");

          //--Make active
          $(event.currentTarget)
            .next()
            .prevUntil(
              $(event.currentTarget).parent(),
              ".smod-rating-item-label"
            )
            .find(".smod-rating-item-icon")
            .removeClass("hover-passive")
            .addClass("hover-active");
        }
      }
    },

    onmouseout: function (event) {
      var editable = this.getParent()?.getEditable();
      if (editable) {
        var hint = this.getParent().$().find(".smod-rating-value-hint");
        if (hint) {
          $(hint).fadeOut(function () {
            $(hint).text("");
          });
        }

        this.$()
          .parent()
          .find(".smod-rating-item-icon")
          .removeClass("hover-active")
          .removeClass("hover-passive");
      }
    },

    ontap: function (event) {
      var that = this;
      var editable = this.getParent()?.getEditable();

      if (editable) {
        if (event.target.className.includes("smod-rating-item-icon")) {
          this.getParent().setProperty("selectedValue", this.getValue(), true);
          this.getParent().setProperty(
            "selectedValueText",
            this.getValueText(),
            true
          );
          $(".smod-rating-item-input").prop("checked", false);
          this.$().find(".smod-rating-item-input").prop("checked", true);
          var valueText = this.getParent().$().find(".smod-rating-value-text");
          if (valueText) {
            $(valueText).fadeOut(50, function () {
              $(valueText).text(that.getValueText()).fadeIn();
              $(valueText).addClass("show");
            });
          }

          this.getParent().fireEvent("change");

          this._refreshActive();
        }
      }
    },

    _refreshActive: function () {
      if (this.getParent().getSelectedValue() === this.getValue()) {
        //--Make selected column and previous active
        this.$().parent().find(".smod-rating-item-icon").removeClass("active");

        this.$()
          .next()
          .prevUntil(this.$().parent(), ".smod-rating-item-label")
          .find(".smod-rating-item-icon")
          .addClass("active");
      }
    },
  });
});
