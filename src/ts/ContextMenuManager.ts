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
          callback: function () {
          },
        },
        {
          name: "Remove",
          icon: "fa-close",
          callback: this.removeObject,
        },
      ];
    } else {
      return undefined;
    }
  }

  public removeObject = () => {
      this.mouseMove.deleteModel(this.view, this.object);
  }

  public setVar(view: any, object: any) {
      this.view = view;
      this.object = object;
  }
}


