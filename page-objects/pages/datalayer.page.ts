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

    // async lala(){
    //    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    //     const jwt = new google.auth.JWT('ga-onclicks-testing@ga-onclick-testing.iam.gserviceaccount.com', null, "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdvOcRr0noKzY3\nBUwrwKxKdWTW0g0cIG7m99HgOnr+qgO+fDzubo2nQrDnAWaJNvOyjFPNKNQIgVlW\noqgiiFHgdnWycltq+M/AEgfYX2qsR9c9FEhStkKQmBks0s1YSltAE0VNhrsUDV4E\nHSNSXdE6PmcUfugRU/r54lbAlSQ0heF0P7i9TWOKogbciQY1RVIPyOOEcPNFj4CQ\n3hDcjE1wAgInp1L4pdrOmPBMpAKORqayO7Ir+UO5anEVN6xw6pfoA8r7GNcINrS5\n9zrxWSy1Xy/czBg2Sw3ey38RmAm5poUPxaJYgnaKqKbpSl1bzsxblaRwhpm1Ux97\nYk3coQtBAgMBAAECggEABl3OGTiBFAPveJ3H/uGUSp6Nmv6IHS0hcMTKlaFinrXz\nt/vZdTmk0b4HOBGmRu4+/IM9rCOEWFIJLi4bOWaVYGkDk9faAPmpH+xSYP0r5+dv\n5GUVzLHSwrWC2ZxqAZDhuTa15rzD/vmRpHqdFvlWpSJI5IrBONbSA8UrAXObjhuT\nfdwwE10nN5HB4wjQROeJvbYnjlJ8/CK/FWimh+XyrDanWByeMJ//Hxr2cQsuPP1r\nYxZvx4dQRbJOyTWDFkZUv0D1mv+ObbqcvaOxNRi4Z6OZFIr78jsR8A1TyM0i/YMP\nvYVu5BqpppsmW8XCWAL4WeUYc6y3KJG98s9rh7kMYQKBgQDNiaGSp/agPowKWGGy\ntRC2OMsZbAz5R/8rCKtUvDozsqxZJ410uHsDj08KHf6mGbFn3P9e6CbTlB4K0nPc\n29kxmwGvvjX4Gu1D8XNXKNaR8LP6WFDcreq4xYP2ytHpq5q6nNRZIptCG2B9qkTq\nHqfHGpCwZ5Qi+I3ieUQy/u9mcQKBgQDEdvuARFQbC3AnrUdRyTjK5mbhdU8UBl9t\nDA2HMainJXn/A4Qqd46QDejiCDY0QykdotdrO+B9nyB8hNy6TIBrGGxyawwt9Tsr\nDULOhharI1I1hBaIOT5VZsaosrF7gurM0wGBY4fTa9RBmCVdY2xm9Mjd2IQNSkyf\nTBiH/3N50QKBgAfMvEPredF07i2KUxLMCjlQCG0Li6Z+E/HXH2FUz0Sc+Ctd8+FF\nCu4EpzQ0FTDKctAFM++vEaIf0dAJUnpEIYbfYf4AUt36b5yPchgRpareHoZWiaMG\nOo0OecaIxdR/PZztTKWhSZEFpvC94GWeCjHlES6Qj6+QDRpWDb99qyoRAoGAHOti\nxBPKyZxaawy/tdNH794QgNmSxWDWxSeECkWODOSgW6B54QJuUtgpUrRgvjqwn7Mr\nwJY0ymkVEB9Cmo3OTXVv6TvGtDEn/4NZNStZxOFTJZuG8ZBzk4Cod4auR38S7wmU\nbCZphP6XZPxva5rKBzG7K6TGc2pfcwdxiPtaVTECgYEAg+ilAqgwCIUForkx7Vfv\n/ssL3gYk+V8KlI2hcPFjzs2yKiBPxDUVQ0fm8ndbwbZkQUQq7UJefQuqO33EFg5t\nlUHlQPJ0WgZI8DOpgwPWvUTjd9S2519iL9PSF7sM0CzvkgPAoiclSPoqH1NlOO3c\nJKx9Md92N00vI2trefzPPfo=\n-----END PRIVATE KEY-----\n", scopes)
    //
    // }
    async getDatalayerEvent(event){
        const datalayer = await this.page.evaluate('window.dataLayer')
        // @ts-ignore
        for(const datalayerEvent of datalayer){
            if(datalayerEvent.event == event)
                return datalayerEvent
        }
    }
}
