import { CustomLayer, MainViewInterface } from "@navvis/indoorviewer";
import { MouseMove } from "./mouseMove";

export class ContextMenuManager extends CustomLayer {
  public modelContextActive: boolean = false;
  private mouseMove: MouseMove;
  public object: any;
  constructor(view: MainViewInterface, isActive: boolean, mm: MouseMove) {
    super(view);
    this.modelContextActive = isActive;
    this.mouseMove = mm;
  }
  public onContextMenu() {
    if (this.modelContextActive) {
      return [
        {
          name: "Rotate",
          icon: "fa-level-up",
          callback: this.rotateObject,
        },
      /*  {
          name: "Rotate Vertically",
          icon: "fa-level-down",
          callback: this.rotateObjectVertical,
        },*/
        {
          name: "Relocate",
          icon: "fa-arrows",
          callback: this.relocateObject,
        },
        {
          name: "Remove",
          icon: "fa-close",
          callback: this.removeObject,
        },
      ];
    } else {
      console.log("Error loading custom menu");
      return undefined;
    }
  }

  public removeObject = () => {
    this.mouseMove.deleteModel(this.view, this.object);
  };

  public relocateObject = () => {
    this.mouseMove.relocateModel(this.object);
  };

  public rotateObject = () => {
    //this.mouseMove.rotateModel(this.object);
  }

  public rotateObjectVertical = () => {
    //this.mouseMove.rotateModel(this.object);
  }

  public setVar(view: any, object: any) {
    this.view = view;
    this.object = object;
  }
}
