import {
  AbstractViewInterface,
  CustomLayer,
  MainViewInterface,
  SceneLayerConfigInterface,
} from "@navvis/indoorviewer";
import * as THREE from "three";
import { MouseMove } from "./mouseMove";

export class Layer extends CustomLayer {
  constructor(view: any, mm: MouseMove) {
    super(view);
  }
}
