
const waits_1 = require("./waits");
exports.isElementPresent = void 0;

/**
 * Checks if an Element is present.
 * @param {WebdriverIO.Element | string} element - The WebdriverIO Element.
 * @param {WaitOptions=} options - Wait options for the operation.
 * @returns {boolean} True if element is present.
 */
// @ts-ignore

async function isElementPresent(element, options) {
    try {
        await (0, waits_1.waitForElementToBeAvailable)(element, options);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.isElementPresent = isElementPresent;
