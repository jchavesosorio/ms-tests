import {ClickOptions, WaitOptions} from "./types";

export declare function isElementPresent(element: WebdriverIO.Element | string, options?: WaitOptions): Promise<boolean>;

export declare function clickElement(element: WebdriverIO.Element | string, options?: ClickOptions): Promise<void>;
