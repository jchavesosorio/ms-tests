
import {navResourcesSelectors, megaMenuSelectors, homepageSelectors} from "../selectors/mulesoft";
import {waitPresents} from "../../helpers/waitPresents"
import {clickElement} from "../../helpers/help";

export class NavigationPage{
    constructor() {
    }

public async accessResourcesHub(){
    await $(megaMenuSelectors.resources).moveTo();
    await $(navResourcesSelectors.selectAllResources).waitForExist({timeout: waitPresents.fiveSeconds});
    await $(navResourcesSelectors.selectAllResources).click();
}

}

export default new NavigationPage();
