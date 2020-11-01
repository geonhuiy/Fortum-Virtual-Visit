import {
  AbstractViewInterface,
  CustomLayer,
  MainViewInterface,
  SceneLayerConfigInterface,
} from "@navvis/indoorviewer";
import * as THREE from "three";


export class Layer extends CustomLayer {
  private main_view: any;
  private main_scene: any;
  constructor(view: any, scene: SceneLayerConfigInterface) {
    super(view, scene);
    this.main_view = view;
    this.main_scene = scene;
  }
}
