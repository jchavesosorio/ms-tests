const { test, expect } = require('@playwright/test');
import {HomePage} from "../../page-objects/pages/homepage.page"
import {ResourcePage} from "../../page-objects/pages/resource.page"
import {
    resourcesSelectors,
    filterResourcesSelectors
} from "../../page-objects/selectors/mulesoft";
import {path} from "../../test-data/test-data"
import {waitPresents} from "../../helpers/waitPresents"

const screenSizes = ['Desktop','Mobile']

for (const screenSize of screenSizes) {
    test.describe("Test Resources Hub", () => {

        test.beforeEach( async ({page}) => {
            // Initialize POM
            const homePage = new HomePage(page);
            await page.goto(path.resources);
            await homePage.acceptAllCookies();
        });

        test(`Elements are displayed - ${screenSize}`, async ({ page }) => {
            // TODO rethink this test, waitUntil might be the right way
            await page.waitForTimeout(waitPresents.fiveSeconds);
            expect(await page.locator(resourcesSelectors.bannerTiles).isVisible()).toBeTruthy();
            expect(await page.locator(resourcesSelectors.allTiles).isVisible()).toBeTruthy();
            expect(await page.locator(resourcesSelectors.searchBox).isVisible()).toBeTruthy();
        });

        test(`No localized LP, /node/ or -new  on EN Resources Hub - ${screenSize}`, async ({page}) => {
            // Initialize POM
            const resourcesHub = new ResourcePage(page);
            await page.waitForTimeout(waitPresents.fiveSeconds);

            const list = await resourcesHub.getResourcesList();
            expect(await resourcesHub.checkLocalizedOnHub(list)).toBe([]);
            expect(await resourcesHub.checkNodeOnHub(list)).toBe([]);
            expect(await resourcesHub.checkNewPageOnHub(list)).toBe([]);
        });

        test(`Filter work as expected - ${screenSize}`, async ({page}) => {

            // TODO change filter logic, flaky test
            // Initialize POM
            const resourcesHub = new ResourcePage(page);
            await page.waitForTimeout(waitPresents.fiveSeconds);

            const list = await resourcesHub.getResourcesList();
            await resourcesHub.clickFilter();
            expect(await resourcesHub.getFilterCountResult()).toBe(list.length);
            const filterOp = await resourcesHub.selectFilterOptions();
            console.log('filterOp ',filterOp);
            const fil = await resourcesHub.getFilters();
            console.log(fil);
            expect((await resourcesHub.getResourcesList()).length).toBeGreaterThanOrEqual(3)
            expect(resourcesHub.arraysEqual(fil, filterOp)).toBeTruthy();
            await resourcesHub.clearFilter()
            expect(await  page.locator(filterResourcesSelectors.filterOptionSelected).isVisible()).toBeFalsy();
        });

        test(`Search work as expected - ${screenSize}`, async ({page}) => {
            // Initialize POM
            const resourcesHub = new ResourcePage(page);
            expect(await resourcesHub.searchFunctionality()).toBeTruthy();
            await resourcesHub.clearSearch();
        });
    });
}




