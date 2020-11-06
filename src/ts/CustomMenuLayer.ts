import { CustomLayer } from "@navvis/indoorviewer";
export class CustomMenuLayer extends CustomLayer {
  public onContextMenu() {
    return false;
  }
}
