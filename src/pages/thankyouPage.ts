import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { Constants } from "../utils/constants";

export class ThankyouPage extends BasePage {

    private headerText = ".complete-header";
    private orderText = ".complete-text";
    private backToProduct = "#back-to-products";
    private productTitle = "//span[@data-test='title']";

    /**
     * Validates the Thank You / Order Confirmation page after completing a purchase.
     * Ensures that the success message, descriptive text, and "Back Home" button are displayed correctly.
     */
    async thankyouValidation() {
        await expect(this.page.locator(this.headerText)).toHaveText(Constants.thankyou.title)
        await expect(this.page.locator(this.orderText)).toHaveText(Constants.thankyou.orderText)
        await expect(this.page.locator(this.backToProduct)).toHaveText(Constants.thankyou.backHome)
    }

    /**
     * Clicks on the "Back Home" button and validates that the user is navigated back to the Products page.
     */
    async backHomeValidation() {
        await this.click(this.page.locator(this.backToProduct), Constants.thankyou.backHome);
        await expect(this.page.locator(this.productTitle)).toHaveText(Constants.product.product)
    }
}