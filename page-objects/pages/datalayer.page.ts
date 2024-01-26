import {localizationPath, mulesoft} from "../../test-data/test-data"
import {waitPresents} from "../../helpers/waitPresents"
import {Page} from "@playwright/test";
// const { google } = require('googleapis')

export class DatalayerPage {

    private page: Page;

    constructor(page) {
        this.page = page;
    }
    async findEvents(eventName) {
        await this.page.waitForFunction(`typeof window.dataLayer.find((obj) => obj.event === "${eventName}") !== "undefined"`);
        return this.page.evaluate(`window.dataLayer.slice().reverse().filter((obj) => obj.event === '${eventName}')`);
    };

    async findEventsByProperty(name, value) {
        await this.page.waitForFunction(`typeof window.dataLayer.find((obj) => obj.${name} === "${value}") !== "undefined"`);
        return this.page.evaluate(`window.dataLayer.slice().reverse().filter((obj) => obj.${name} === '${value}')`);
    };

    async getDatalayerEvent(event){
        const datalayer = await this.page.evaluate('window.dataLayer')
        // @ts-ignore
        for(const datalayerEvent of datalayer){
            if(datalayerEvent.event == event)
                return datalayerEvent
        }
    }
}
