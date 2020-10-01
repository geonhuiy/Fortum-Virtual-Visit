import "./index.scss";
import {ApiInterface, getApi} from "@navvis/indoorviewer";
import { SideBarMenuModifier } from "./menu/SideBarMenuModifier";

class TestApp
{
	public ivApi: ApiInterface;

	constructor()
	{
		getApi("https://nvdev-0.iv.navvis.com/")
			.then((iv: ApiInterface) =>
			{
				this.ivApi = iv;
				new SideBarMenuModifier(iv);
			});
	}
}

(<any>window).TestApp = new TestApp();
