import { CustomLayer, MainViewInterface } from "@navvis/indoorviewer";
import { MouseMove } from "./mouseMove";
export class CustomMenuLayer extends CustomLayer {
  constructor(view: MainViewInterface) {
    super(view);
  }
  public onContextMenu() {
    return false;
  }
}
