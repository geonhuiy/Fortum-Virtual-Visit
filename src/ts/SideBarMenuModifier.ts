import {
  ApiInterface,
  IconInfoInterface,
  SidebarMenuItemInterface,
} from "@navvis/indoorviewer";

export class SideBarMenuModifier {
  private equipmentIcon: IconInfoInterface = {
    className: "material-icons",
    ligature: "work",
    path: "",
  };

  private callbackMenuItem: SidebarMenuItemInterface = {
    title: "Place Equipment",
    icon: this.equipmentIcon,
    isVisible: () => true,
    template: "",
    items: [],
    onClick: () => {
      this.callbackFunction();
    },
    isFullscreen: false,
  };

  private callbackFunction(): void {
    document.getElementById("modal-container").style.display = "block";
    this.ivApi.ui.sidebarMenuService.closeMenu();
  }

  constructor(private ivApi: ApiInterface) {
      const menuItems = this.ivApi.ui.sidebarMenuService.items;
      //menuItems.splice(1, menuItems.length, this.callbackMenuItem);
      menuItems.push(this.callbackMenuItem);
      //ivApi.ui.sidebarMenuService.openMenu();
  }
}
