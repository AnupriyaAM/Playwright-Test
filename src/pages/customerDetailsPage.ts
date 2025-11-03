import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { faker } from "@faker-js/faker";

export class CustomerDetailsPage extends BasePage {
    /**
     * Validates the Checkout Information page flow.
     * Ensures the correct page is displayed, required fields are filled in, and navigation proceeds to the next step.
     */
    async checkoutValidation() {
        await this.click(this.page.locator("#checkout"), "Checkout");
        await expect(this.page.locator("//span[@data-test='title']")).toHaveText("Checkout: Your Information")
        await this.fill(this.page.locator("#first-name"), faker.person.firstName());
        await this.fill(this.page.locator("#last-name"), faker.person.lastName());
        await this.fill(this.page.locator("#postal-code"), faker.location.zipCode());
        await expect(this.page.locator("#cancel")).toBeVisible();
        await this.click(this.page.locator("#continue"), "Continue");
    }
}