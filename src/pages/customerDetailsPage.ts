import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { faker } from "@faker-js/faker";
import { Constants } from "../utils/constants";

export class CustomerDetailsPage extends BasePage {

    private checkout = "#checkout";
    private checkoutTitle = "//span[@data-test='title']";
    private firstName = "#first-name";
    private lastName = "#last-name";
    private postalCode = "#postal-code";
    private cancel = "#cancel";
    private continue = "#continue";

    /**
     * Validates the Checkout Information page flow.
     * Ensures the correct page is displayed, required fields are filled in, and navigation proceeds to the next step.
     */
    async checkoutValidation() {
        await this.click(this.page.locator(this.checkout), Constants.cart.checkout);
        await expect(this.page.locator(this.checkoutTitle)).toHaveText(Constants.checkout.yourInfo)
        await this.fill(this.page.locator(this.firstName), faker.person.firstName());
        await this.fill(this.page.locator(this.lastName), faker.person.lastName());
        await this.fill(this.page.locator(this.postalCode), faker.location.zipCode());
        await expect(this.page.locator(this.cancel)).toBeVisible();
        await this.click(this.page.locator(this.continue), Constants.checkout.continue);
    }
}