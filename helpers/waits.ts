import { WaitOptions, ClickOptions } from "./types";
export declare function getElement(element: WebdriverIO.Element | string): Promise<WebdriverIO.Element>;
/**
 * Waits for an element to be displayed or present.
 * @param element - The WebdriverIO Element.
 * @param options - Options to wait for the element.
 * @returns True if element is displayed, or void failing with default error message or provided in options.
 */
export declare function waitForElementToBeAvailable(element: WebdriverIO.Element | string, options?: WaitOptions): Promise<boolean | void>;
/**
 * Waits for an element to be clickable.
 * @param element - The WebdriverIO Element.
 * @param options - Options to wait for the element.
 * @returns True if element is clickable, or void failing with default error message or provided in options.
 */
export declare function waitForClickableElement(element: WebdriverIO.Element | string, options?: ClickOptions): Promise<boolean | void>;
//# sourceMappingURL=waits.d.ts.map
