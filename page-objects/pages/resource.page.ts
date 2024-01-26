import {env as envVars} from "process";
import {resourcesSelectors, filterResourcesSelectors} from "../selectors/mulesoft";
import {localizationPath, mulesoft, searchResources} from "../../test-data/test-data"
import {waitPresents} from "../../helpers/waitPresents"
import {Page} from "@playwright/test";

export class ResourcePage{
    private page: Page;

    constructor(page) {
        this.page = page;
    }
    public async getFilterCountResult(){
        const element =  await this.page.locator(filterResourcesSelectors.foundingShowing).innerText();
        const match = element.match(/\d+/);
        return match ? parseInt(match[0], 10) : false;
    }

    public async getResourcesList() {
         await this.page.waitForSelector(resourcesSelectors.tiles, { timeout: waitPresents.fiveSeconds });
          const elements = await this.page.$$(resourcesSelectors.tiles);
            const hrefs = await Promise.all(
                elements.map(async (element) => {
                    // console.log(await element.innerText());
                    const href = await element.getAttribute(mulesoft.href);
                    return href ? href : null;
                })
            );
            return hrefs.filter((href) => href !== null) as string[];
    }
    public async checkLocalizedOnHub(hrefList: string[]) {
        const auxs = await Promise.all(
            hrefList.map(async (href) => {
                return href && (
                    href.includes(localizationPath.deOrigin) ||
                    href.includes(localizationPath.ptOrigin) ||
                    href.includes(localizationPath.frOrigin) ||
                    href.includes(localizationPath.jpOrigin) ||
                    href.includes(localizationPath.esOrigin) ||
                    href.includes(localizationPath.de) ||
                    href.includes(localizationPath.pt) ||
                    href.includes(localizationPath.fr) ||
                    href.includes(localizationPath.jp) ||
                    href.includes(localizationPath.es)
                ) ? href : null;
            })
        );
        return auxs.filter((aux) => aux !== null) as string[];
    }
    public async checkNodeOnHub(hrefList: string[]) {
        const auxs = await Promise.all(
            hrefList.map(async (href) => {
                return href && (
                    href.includes(mulesoft.node)
                ) ? href : null;
            })
        );
       return  auxs.filter((aux) => aux !== null) as string[];
    }

    public async checkNewPageOnHub(hrefList: string[]) {
        const auxs = await Promise.all(
            hrefList.map(async (href) => {
                const url = new URL(envVars.BASE_URL+href);
                const path = url.pathname;

                return path.endsWith(mulesoft.new) ? href : null;
            })
        );
        return auxs.filter((aux) => aux !== null) as string[];
    }

    public async clickFilter(){
        return await this.page.locator(resourcesSelectors.btnFilter).click();
    }

    public async selectFilterOptions() {
        let arr: string[] = [];
        const regex = /^([^\n]*)/;

        for (let i = 0; i < 3; i++) {
            const checkboxes = await this.page.$$(filterResourcesSelectors.filterOptions);
            checkboxes.sort(() => Math.random() - 0.5);
            if (i < checkboxes.length) {
                await checkboxes[i].click();
                const fullText = await checkboxes[i].innerText();
                const match = fullText.match(regex);
                match ? arr.push(match[1]) :false;
            }
        }
        await this.page.locator(resourcesSelectors.closeFilter).first().click();
        return arr;
    }

    public async getFilters(){
        const filters = await this.page.$$(filterResourcesSelectors.filterOptionSelected);
        const promises = filters.map(async (element) => {
            return  await element.innerText();
        });
       return await Promise.all(promises);
    }

    public arraysEqual(arr1: any[], arr2: any[]): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        }
        const sortedArr1 = arr1.slice().sort();
        const sortedArr2 = arr2.slice().sort();
        return sortedArr1.every((value, index) => value === sortedArr2[index]);
    }

    public async clearFilter(){
        await this.page.locator(resourcesSelectors.clearAllBtn).first().click();
    }

    public async searchFunctionality(){
        // TODO fill input with more/different information
        await this.page.locator(resourcesSelectors.searchBox).fill(searchResources.api);
        const element = (await this.page.locator('a.component-tile p.field').nth(3).innerText()).toLowerCase();
        return element.includes(searchResources.api);
    }

    public async clearSearch(){
        await this.page.locator(resourcesSelectors.searchBox).clear();
    }

    public async getAllFilterOptions() {
        const filters = await this.page.locator(filterResourcesSelectors.filterOptions).all();
        const promises = filters.map(async (element) => {
            const text = await element.innerText();
            return text.trim();
        });
        return await Promise.all(promises);
    }

    public divideTileText(text) {
        const lines = text.split('\n');
        return  lines.filter((line) => line.trim() !== '');
    }
}
