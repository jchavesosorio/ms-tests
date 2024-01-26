import { expect, type Locator, type Page } from '@playwright/test';
import {homepageSelectors, loginSelectors} from "../selectors/mulesoft";
import {waitPresents} from "../../helpers/waitPresents"

export class HomePage {

    private page: Page;

    constructor(page) {
        this.page = page;
    }
    // public async navigateTo(baseUrl = this.BASE_URL) {
    //     await browser.url(baseUrl);
    //     if (baseUrl == this.BASE_URL) {
    //         await browser.waitUntil(async(): Promise<boolean> => {
    //             return await this.assertRendered();
    //         });
    //     }
    //     await this.acceptAllCookies();
    // }

    public async assertRendered(): Promise<void> {
        // return  $(homepageSelectors.banner).waitForExist({timeout: waitPresents.fiveSeconds});
       return  await this.page.locator(homepageSelectors.banner).click();
    }
    public async acceptAllCookies() {
        //TODO set localization to Chile or similar to avoid issue with vpn
        await this.page.waitForSelector(loginSelectors.acceptAllCookies, { timeout: waitPresents.fiveSeconds });
        console.log('Closing Cookie Banner');
        await this.page.click(loginSelectors.acceptAllCookies);

    }
}
