import {Page} from "@playwright/test";
import {sliderSelectors} from "../../selectors/components";
import {mulesoft, urls} from "../../../test-data/test-data";


export class SliderPage{
    private page: Page;

    constructor(page) {
        this.page = page;
    }

    //TODO move this to another file so it can manage image at a global level. passing the selectors parameters
    public async getImages(){
        const arr=[];
        const images = this.page.locator(sliderSelectors.sliderImage);
        const imgElements = await images.locator('img').all();
        for await (const img of imgElements){
            const src = await img.getAttribute(mulesoft.src);
            const res = await this.page.request.get(urls.prod+src);
            arr.push(res);
        }
        return arr;
    }

    public async getImagesStatus(arr){
        const aux =[];
        for(const element of arr)
            aux.push(element.status())
        return aux;
    }

    public async getImagesSize(arr){
        const aux =[];
        for(const element of arr){
            aux.push(parseInt(element.headers()['content-length'], 10));
        }
        return aux;
    }
}
