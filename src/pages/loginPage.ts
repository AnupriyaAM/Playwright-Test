import { expect, Locator } from "@playwright/test";
import { BasePage } from "../utils/basePage";

export class LoginPage extends BasePage {
    private userName = "#user-name";
    private password = "#password";
    private loginButton = "#login-button";

    /**
     * Validates that the current page title matches the expected application title.
     * Ensures that the user is on the correct page before proceeding with further actions.
     */
    async validateTitle() {
        await expect(this.page).toHaveTitle(/Swag Labs/);
    }

    /**
     * Logs in to the application using the provided credentials.
     * Fills in the username and password fields, then clicks the login button.
     * 
     * @param userName - The username to be entered in the login form.
     * @param password - The password to be entered in the login form.
     */
    async login(userName: string, password: string) {
        await this.fill(this.page.locator(this.userName), userName, "User Name");
        await this.fill(this.page.locator(this.password), password, "User Password");
        await this.click(this.page.locator(this.loginButton), "Login");
    }
}