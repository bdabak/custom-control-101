sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("com.smod.controls.controller.View1", {
      onInit: function () {
        var oViewModel;
        // Model used to manipulate control states
        oViewModel = new JSONModel({
          busy: false,
          selectedRating: null,
          selectedRating2: 3,
          ratingValueList: [
            { value: 1, valueText: "Kötü" },
            { value: 2, valueText: "Orta" },
            { value: 3, valueText: "İyi" },
            { value: 4, valueText: "Çok İyi" },
            { value: 5, valueText: "Muhteşem" },
          ],
          scaleValueList: [
            { Name: "BS", Low: null, High: null },
            { Name: "BÜ", Low: null, High: null },
            { Name: "BÇÜ", Low: null, High: null },
          ],
          scaleValue: "BA~1~2|BS~2.001~5|BÜ~5.001~21|BÇÜ~21.001~45",
          objectHierarchy: {
            name: "Ana Hoshin",
            level: 0,
            id: 1,
            children: [
              {
                name: "Alt Hoshin",
                level: 1,
                id: 5,
                children: [
                  {
                    name: "Departman Hedefi",
                    level: 2,
                    id: 8,
                    children: [
                      {
                        name: "Bireysel Hedef",
                        level: 3,
                        id: 12,
                        children: [
                          {
                            name: "Bireysel Hedef 2",
                            level: 4,
                            id: 11,
                            children: [
                              {
                                name: "Bireysel Hedef 2",
                                level: 4,
                                id: 18,
                                children: [
                                  {
                                    name: "Bireysel Hedef 2",
                                    level: 4,
                                    id: 13,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          pieChartData: [
            {
              category: "Lithuania",
              value: 501.9,
            },
            {
              category: "Czechia",
              value: 301.9,
            },
            {
              category: "Ireland",
              value: 201.1,
            },
            {
              category: "Germany",
              value: 10.8,
            },
            {
              category: "Australia",
              value: 139.9,
            },
            {
              category: "Austria",
              value: 128.3,
            },
            {
              category: "UK",
              value: 99,
            },
          ],
          counterValues: [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
          ],
        });

        this.getView().setModel(oViewModel, "viewModel");
      },
      onValueChange: function (oEvent) {
        sap.m.MessageToast.show(
          `Value changed from ${oEvent.getParameter(
            "oldValue"
          )} to ${oEvent.getParameter("newValue")}`
        );
      },
      onModifyGraphData: function (oEvent) {
        var oViewModel = this.getView().getModel("viewModel");
        var aChartData = oViewModel.getProperty("/pieChartData");

        aChartData.push({
          category: "Turkey",
          value: 25.0,
        });

        oViewModel.setProperty("/pieChartData", aChartData);

        this.getView().byId("myPieGraph").rerender();
      },
      onShowHierarchy: function (oEvent) {
        var oButton = oEvent.getSource();
        // create popover
        if (!this._oPopover) {
          Fragment.load({
            name: "com.smod.controls.fragment.HierarchyView",
            controller: this,
          }).then(
            function (pPopover) {
              this._oPopover = pPopover;
              this.getView().addDependent(this._oPopover);
              this._oPopover.bindElement("/ProductCollection/0");
              this._oPopover.openBy(oButton);
            }.bind(this)
          );
        } else {
          this._oPopover.openBy(oButton);
        }
      },
    });
  }
);
