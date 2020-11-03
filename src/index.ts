import "./index.scss";
import {
	ApiInterface,
	getApi,
	RouteDataInterface,
	RouteElementEntityInterface,
	SiteModelEntityInterface,
	LocationInterface,
} from "@navvis/indoorviewer";
import * as THREE from "three";
import { SideBarMenuModifier } from "./ts/SideBarMenuModifier";
import { Modal } from "./ts/modal";
import { Layer } from "./ts/layer";
import { MouseMove } from "./ts/mouseMove";
//import {GeoCoordinate} from "./GeoCoordinate";





class TestApp {
	public ivApi: ApiInterface;
	private modal: Modal;
	public layer: Layer;
	public locInterface: LocationInterface;
	public ivSm: SiteModelEntityInterface;

	public fP: any;
	public fP2: any;

	constructor() {
		getApi("https://nvdev-0.iv.navvis.com/")
			.then((iv: ApiInterface) => {
				this.modal = new Modal();
				this.ivApi = iv;
				this.modal.setLayer(this.ivApi);
				this.modal.assignEventListeners();
				new SideBarMenuModifier(iv);
				console.log("ivApi: ", this.ivApi.poi);
				this.ivSm = this.ivSm;
				const poi1 = this.ivApi.poi.repository;
				const objectsOnCurrentImage = poi1.findAll();

				//mouse click points x,y,z in meters
				this.fP = null;
				this.fP2 = null;
		
				var clicked = false;
				
				document.getElementById("indoorviewer").addEventListener("click", (event) => {

					
					//	console.log("this.ivApi.poi: ",this.ivApi.poi.repository);
					const point = this.ivApi.legacyApi.getMainView().getCurrentCursorPosition().geometry.coordinates;
				//	console.log("point: ", this.ivApi.legacyApi.getMainView().getCurrentCursorPosition().datasetLocation);
					
					var point2 = this.ivApi.legacyApi.getMainView().getCurrentCursorPosition().datasetLocation;
				
					var x = point.x;
					var y = point.y;
					var z = point.z;

					if(clicked == false){
						this.fP = point2;

				//		console.log("this.fP : ",this.fP);
						clicked = true;

					}else{
						this.fP2 = point2;

				//		console.log("this.fP2: ",this.fP2);
						
						//Z = height, Y = width, X = z
						let distanceZ = this.fP.x - this.fP2.x;
						let distanceY = this.fP.y - this.fP2.y;
						let distanceX = this.fP.z - this.fP2.z;

						console.log("X: ",distanceX);
						console.log("Y: ",distanceY);
						console.log("Z: ",distanceZ);

						clicked = false;
					}
				});


			});
	}

}

(<any>window).TestApp = new TestApp();
