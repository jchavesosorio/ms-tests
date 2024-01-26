import {log} from "util";

const { test, expect } = require('@playwright/test');
import {HomePage} from "../../page-objects/pages/homepage.page"
import {ResourcePage} from "../../page-objects/pages/resource.page"
import {DatalayerPage} from "../../page-objects/pages/datalayer.page"
import {events} from "../../test-data/datalayer";
import {resourcesSelectors, filterResourcesSelectors} from "../../page-objects/selectors/mulesoft";
import {path} from "../../test-data/test-data"
import {waitPresents} from "../../helpers/waitPresents"

const screenSizes = ['Desktop','Mobile']

for (const screenSize of screenSizes) {
    test.describe("Test Resources Hub OnClicks", () => {

        test.beforeEach( async ({page},testInfo) => {
            // Initialize POM
            const homePage = new HomePage(page);

            if(screenSize == 'Mobile') {
                await page.setViewportSize({
                    width: 360,
                    height: 649,
                });
            }
            await page.goto(path.resources);
            await homePage.acceptAllCookies();
        });

        test(`Filter btn should fire datalayer event ${events.click} - ${screenSize}`, async ({ page }) => {
                // Initialize POM
            const datalayerPage = new DatalayerPage(page);
            await page.locator(resourcesSelectors.btnFilter).click();
            expect(await datalayerPage.findEvents(events.click)).toBeDefined()
        });
        test(`Item filter selected should fire datalayer event ${events.filterApplied} - ${screenSize}`, async ({ page }) => {
            // Initialize POM
            const datalayerPage = new DatalayerPage(page);
            const resourcesPage = new ResourcePage(page);
            await page.waitForTimeout(waitPresents.fiveSeconds);

            await page.locator(resourcesSelectors.btnFilter).click();

            const allFilters = await resourcesPage.getAllFilterOptions();
            const indexR = Math.floor(Math.random() * allFilters.length) + 1;
            await page.locator(filterResourcesSelectors.filterOption(allFilters[indexR])).click();
            const event = await datalayerPage.findEvents(events.filterApplied);
            expect(event).toBeDefined();
            expect(event[0].clickText).toBe(allFilters[indexR]);
        });

        test(`Filter btn should fire datalayer event ${events.clearAllFilters} - ${screenSize} `, async ({ page }) => {
            // Initialize POM
            const datalayerPage = new DatalayerPage(page);

            await page.locator(resourcesSelectors.btnFilter).click();
            await page.locator(filterResourcesSelectors.businessAutomation).click();
            screenSize == 'Desktop' ? await page.locator(resourcesSelectors.clearAllBtn).nth(1).click() : await page.locator(resourcesSelectors.clearAllBtn).nth(2).click();
            expect(await datalayerPage.findEvents(events.clearAllFilters)).toBeDefined()
            });

        test(`Tiles should fire datalayer event ${events.tileClick} - ${screenSize}`, async ({ page, context }) => {

            // Initialize POM
            const datalayerPage = new DatalayerPage(page);
            const resourcePage = new ResourcePage(page);

            const indexR = Math.floor(Math.random() * 100) + 3;
            // triggers new tab with the LP
            // const [newPage] =
            await Promise.all([
                page.locator(resourcesSelectors.tiles).nth(indexR).click()
            ])
            // get event information
            const logType = await datalayerPage.findEvents(events.tileClick);

            // get tile content
            const content = await page.locator(resourcesSelectors.tiles).nth(indexR).innerText()
            const href = await page.locator(resourcesSelectors.tiles).nth(indexR).getAttribute('href')

            const splitText = resourcePage.divideTileText(content)

            expect(logType).toBeDefined();
            expect(logType[0].clickText).toBe(splitText[3])
            expect(logType[0].itemTitle).toBe(splitText[1])
            expect(logType[0].clickUrl).toContain(href)
        });

    });
}
