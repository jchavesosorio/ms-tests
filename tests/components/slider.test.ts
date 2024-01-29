const { test, expect } = require('@playwright/test');
import {HomePage} from "../../page-objects/pages/homepage.page";
import {SliderPage} from "../../page-objects/pages/components/slider.page"
import {DatalayerPage} from "../../page-objects/pages/datalayer.page";
import {sliderSelectors} from "../../page-objects/selectors/components";
import {slider} from "../../test-data/test-data";
import {events} from "../../test-data/datalayer";
const screenSizes = ['Desktop','Mobile']


for (const screenSize of screenSizes) {
    test.describe("Slider component test", () => {
        test.beforeEach(async ({page}) => {
            // Initialize POM
            const homePage = new HomePage(page);

            if(screenSize == 'Mobile'){
                await page.setViewportSize({
                    width: 360,
                    height: 649,
                });
            }
            await page.goto('home');
            await homePage.acceptAllCookies();
        });
        test(`Elements are displayed - ${screenSize}`, async ({page}) => {
            await page.waitForLoadState("domcontentloaded")
            if (screenSize == 'Desktop') {
                expect(await page.locator(sliderSelectors.component).isVisible()).toBeTruthy();
                expect(await page.locator(sliderSelectors.prevBtn).isVisible()).toBeTruthy();
                expect(await page.locator(sliderSelectors.nextBtn).isVisible()).toBeTruthy();
                expect(await page.locator(sliderSelectors.allBullets).isVisible()).toBeTruthy();
            }else{
                expect(await page.locator(sliderSelectors.allBullets).isVisible()).toBeTruthy();
                expect(await page.locator(sliderSelectors.sliderLeft).first().isVisible()).toBeTruthy();
            }
        });

        test(`Find broken images - ${screenSize}`, async ({page}) => {
            await page.waitForLoadState("domcontentloaded")
            // Initialize POM
            const slider = new SliderPage(page);
            const images = await slider.getImages();
            expect.soft((await slider.getImagesStatus(images)).every(code => code === 200)).toBeTruthy();
            expect((await slider.getImagesSize(images)).every(item => item < 150000)).toBeTruthy();
        });

        test(`Bullets, click next slide - active class - ${screenSize}`, async ({page}) => {

            //get all bullets elements
            let bulletFirst = await page.locator(sliderSelectors.bullet).first();
            let bulletSec = await page.locator(sliderSelectors.bullet).nth(1);

            await expect(await page.locator(sliderSelectors.bullet).first()).toHaveClass(slider.activeBulletsClass);

            await bulletSec.click();

            expect(await bulletFirst.isVisible()).toBeTruthy();
            expect(await bulletSec.isVisible()).toBeTruthy();
            expect(await bulletSec.getAttribute('class')).toBe(slider.activeBulletsClass)
        });

        test(`Bullets should fire ${events.click} and ${events.sliderClick} events - ${screenSize}`, async ({page}, testInfo) => {
            // Initialize POM
            const datalayerPage = new DatalayerPage(page);

            //get bullet element
            let bulletLast = await page.locator(sliderSelectors.bullet).last();

            await bulletLast.click();

            const click = await datalayerPage.getDatalayerEvent(events.click);
            const sliderClick = await datalayerPage.findEvents(events.sliderClick);
            expect(click.event).toBe(events.click);
            expect(sliderClick[0].event).toBe(events.sliderClick);
        });
        test.skip(`Slide should fire ${events.ctaButton},  ${events.click} and ${events.sliderClick} events - ${screenSize}`, async ({page}, testInfo) => {
            //TODO this test is breaking because after click it opens a new page on the same tab and the events get lost

            // Initialize POM
            const datalayerPage = new DatalayerPage(page);
            const slider = await page.locator(sliderSelectors.component).first()

            await Promise.all([
                slider.click()
            ])

            const logTypes = await datalayerPage.findEvents(events.click);
            console.log(logTypes)
            const sliderClick = await  datalayerPage.findEvents(events.sliderClick);
            const ctaButton = await  datalayerPage.findEvents(events.ctaButton);
            console.log(sliderClick)
            console.log(ctaButton)
            // expect( click.event).toBe(events.click);
            // expect(sliderClick[0].event).toBe(events.sliderClick);
            // expect(ctaButton[0].event).toBe(events.ctaButton);

        });
    });
}
