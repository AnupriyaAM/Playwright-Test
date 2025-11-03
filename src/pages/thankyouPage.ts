import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";

export class ThankyouPage extends BasePage {

    /**
     * Validates the Thank You / Order Confirmation page after completing a purchase.
     * Ensures that the success message, descriptive text, and "Back Home" button are displayed correctly.
     */
    async thankyouValidation() {
        await expect(this.page.locator(".complete-header")).toHaveText("Thank you for your order!")
        await expect(this.page.locator(".complete-text")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        await expect(this.page.locator("#back-to-products")).toHaveText("Back Home")
    }

    /**
     * Clicks on the "Back Home" button and validates that the user is navigated back to the Products page.
     */
    async backHomeValidation() {
        await this.click(this.page.locator("#back-to-products"), "Back Home");
        await expect(this.page.locator("//span[@data-test='title']")).toHaveText("Products")
    }
}