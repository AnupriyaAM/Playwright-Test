import { Page, Locator } from '@playwright/test';

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
   * Navigates to the specified URL using Playwright's page.goto().
   * Logs navigation steps to the console.
   * @param url - The URL to navigate to.
   */
    async navigateTo(url: string) {
        try {
            await this.page.goto(url,{ waitUntil: 'domcontentloaded', timeout: 60000 });
            console.log(`Successfully navigated to ${url}`);
        } catch (error) {
            console.log(`Failed to navigate to ${url}: ${error}`);
        }
    }

    /**
     * Get page title
     * @returns The page title
     */
    async getTitle(){
        return await this.page.title();
    }

    /**
     * Clicks on the given locator element.
     * @param locator - Playwright Locator object used to identify the element.
     * @param elementName - Optional name for logging purposes.
     */
    async click(locator: Locator, elementName?: string) {
        await locator.click();
        console.log(`Clicked on ${elementName || 'element'}`);
    }

    /**
     * Fills text into an input field located by the locator.
     * @param locator - Locator of the input element.
     * @param text - Text to be entered.
     * @param elementName - Optional name for logging purposes.
     */
    async fill(locator: Locator, text: string, elementName?: string) {
        await locator.fill(text);
        console.log(`Filled '${text}' into ${elementName || 'element'}`);
    }

    /**
     * Selects a value from a dropdown element.
     * @param locator - Locator of the dropdown.
     * @param value - The option label to select.
     * @param elementName - Optional name for logging purposes.
     */
    async selectOption(locator: Locator, value: string, elementName?: string) {
        await locator.selectOption({ label: value });
        console.log(`Selected '${value}' from ${elementName || 'dropdown'}`);
    }

    /**
     * Retrieves and returns text from the given locator element.
     * @param locator - Locator of the element.
     * @returns The text content of the located element.
     */
    async getTextContent(locator: Locator) {
        return await locator.textContent();
    }

    /**
     * Retrieves and returns the visible inner text from the given locator element.
     * Unlike textContent(), this returns only human-readable text that is visible on the page.
     * @param locator - Locator of the element.
     * @returns The inner text of the located element.
     */
    async getInnerTextContent(locator: Locator) {
        return await locator.innerText();
    }

    /**
     * Takes a full-page screenshot and saves it with the given step name.
     * @param stepName - The name used in the screenshot file.
     */
    async screenshot(stepName: string) {
        await this.page.screenshot({
            path: `test-results/screenshots/${stepName}.png`,
            fullPage: true
        });
    }

}
