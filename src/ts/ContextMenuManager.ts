import { CustomLayer, MainViewInterface } from "@navvis/indoorviewer";
export class ContextMenuManager extends CustomLayer {
  public modelContextActive: boolean = false;
  constructor(view: MainViewInterface, isActive: boolean) {
    super(view);
    this.modelContextActive = isActive;
  }
  public onContextMenu() {
    if (this.modelContextActive) {
      return [
        {
          name: "Rotate",
          icon: "fa-globe",
          callback: function () {
            // Action for when the menu item is clicked
            window.open("https://www.navvis.com", "_blank");
          },
        },
        {
          name: "Rotate",
          icon: "fa-globe",
          callback: function () {
            // Action for when the menu item is clicked
            window.open("https://www.navvis.com", "_blank");
          },
        },
      ];
    } else {
      return undefined;
    }
  }
}
