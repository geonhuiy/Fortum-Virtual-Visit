import "./index.scss";
import {ApiInterface, getApi} from "@navvis/indoorviewer";
import { SideBarMenuModifier } from "./menu/SideBarMenuModifier";
import { Modal } from "./modal/modal";
class TestApp
{
	public ivApi: ApiInterface;
	private modal: Modal;

	constructor()
	{
		getApi("https://nvdev-0.iv.navvis.com/")
			.then((iv: ApiInterface) =>
			{
				this.modal = new Modal();
				this.modal.assignEventListeners();
				this.ivApi = iv;
				new SideBarMenuModifier(iv);
			});
	}
}

(<any>window).TestApp = new TestApp();
