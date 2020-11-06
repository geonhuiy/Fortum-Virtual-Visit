import "./index.scss";
import {ApiInterface, getApi} from "@navvis/indoorviewer";
import { SideBarMenuModifier } from "./ts/SideBarMenuModifier";
import { Modal } from "./ts/modal";
import { Layer } from "./ts/layer";
import { MouseMove } from "./ts/mouse";
import { CustomMenuLayer } from "./ts/CustomMenuLayer";
class TestApp
{
	public ivApi: ApiInterface;
	private modal: Modal;
	public layer: Layer;

	constructor()
	{
		getApi("https://nvdev-0.iv.navvis.com/")
			.then((iv: ApiInterface) =>
			{
				// 1. Instantiate necessary objects, assign event listeners on modal.ts
				this.modal = new Modal(iv);
				//this.ivApi = iv;
				this.modal.setLayer();
				this.modal.assignEventListeners();
				new SideBarMenuModifier(iv);
				new CustomMenuLayer(iv.legacyApi.getMainView());
			});
	}
}

(<any>window).TestApp = new TestApp();
