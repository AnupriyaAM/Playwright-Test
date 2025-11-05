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
    private cartID = ".shopping_cart_link";
    private errorMsg = "//h3[@data-test='error']";

    /**
     * Validates the Checkout Information page flow.
     * Ensures the correct page is displayed, required fields are filled in, and navigation proceeds to the next step.
     */
    async checkoutValidation() {
        await this.click(this.page.locator(this.checkout), Constants.cart.checkout);
        await expect(this.page.locator(this.checkoutTitle)).toHaveText(Constants.checkout.yourInfo);
        await this.fill(this.page.locator(this.firstName), faker.person.firstName());
        await this.fill(this.page.locator(this.lastName), faker.person.lastName());
        await this.fill(this.page.locator(this.postalCode), faker.location.zipCode());
        await expect(this.page.locator(this.cancel)).toBeVisible();
        await this.captureScreenshot();
        await this.click(this.page.locator(this.continue), Constants.checkout.continue);
    }
    
    /**
     * Validates that the checkout process correctly displays error messages 
     * when mandatory fields are left blank.
     * This method triggers and verifies errors for missing first name, 
     * last name, and postal code fields in sequence.
     */
    async checkoutErrorValidation() {
        await this.click(this.page.locator(this.cartID), Constants.cart.cartBasket);
        await this.click(this.page.locator(this.checkout), Constants.cart.checkout);
        await this.firstNameError();
        await this.lastNameError();
        await this.postCodeError();
    }

    /**
     * Validates that the correct error message is displayed 
     * when the first name field is left empty during checkout.
     * Fills in other fields, submits the form, checks the error message, 
     * and then clears the fields for the next validation.
     */
    async firstNameError() {
        await this.fill(this.page.locator(this.lastName), faker.person.lastName());
        await this.fill(this.page.locator(this.postalCode), faker.location.zipCode());
        await this.click(this.page.locator(this.continue), Constants.checkout.continue);
        await expect(this.page.locator(this.errorMsg)).toHaveText(Constants.checkout.firstNameError);
        await this.captureScreenshot();
        await this.fill(this.page.locator(this.lastName), Constants.checkout.empty);
        await this.fill(this.page.locator(this.postalCode), Constants.checkout.empty);
    }

    /**
     * Validates that the correct error message is displayed 
     * when the last name field is left empty during checkout.
     * Fills in other fields, submits the form, checks the error message, 
     * and then clears the fields for the next validation.
     */
    async lastNameError() {
        await this.fill(this.page.locator(this.firstName), faker.person.firstName());
        await this.fill(this.page.locator(this.postalCode), faker.location.zipCode());
        await this.click(this.page.locator(this.continue), Constants.checkout.continue);
        await expect(this.page.locator(this.errorMsg)).toHaveText(Constants.checkout.lastnameError);
        await this.captureScreenshot();
        await this.fill(this.page.locator(this.firstName), Constants.checkout.empty);
        await this.fill(this.page.locator(this.postalCode), Constants.checkout.empty);
    }

    /**
     * Validates that the correct error message is displayed 
     * when the postal code field is left empty during checkout.
     * Fills in other fields, submits the form, and verifies the expected error message.
     */
    async postCodeError() {
        await this.fill(this.page.locator(this.firstName), faker.person.firstName());
        await this.fill(this.page.locator(this.lastName), faker.person.lastName());
        await this.click(this.page.locator(this.continue), Constants.checkout.continue);
        await expect(this.page.locator(this.errorMsg)).toHaveText(Constants.checkout.postError);
        await this.captureScreenshot();
    }
}