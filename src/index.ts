import "./index.scss";
import {ApiInterface, getApi} from "@navvis/indoorviewer";
import { SideBarMenuModifier } from "./ts/SideBarMenuModifier";
import { Modal } from "./ts/modal";
import { Layer } from "./ts/layer";
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
				this.modal = new Modal();
				this.ivApi = iv;
				this.modal.setLayer(this.ivApi);
				this.modal.assignEventListeners();
				new SideBarMenuModifier(iv);
				//this.setLayer();
			});
	}
	/*setLayer() {
		var main_view = this.ivApi.legacyApi.getMainView();
		console.log(main_view);
		this.layer = new Layer(main_view, main_view.scene);
		main_view.addToScene(this.layer);
		this.layer.paintSphere();
	}*/
}

(<any>window).TestApp = new TestApp();
