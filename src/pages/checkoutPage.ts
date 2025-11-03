import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";

export class CheckoutPage extends BasePage {

    /**
     * Validates the Checkout Overview page details before completing the purchase.
     * Ensures that product details, labels, and action buttons are displayed correctly.
     * 
     * @param product - Object containing productTitle, productDesc, and productPrice to validate against the checkout overview page.
     */
    async checkoutOverview(product: { productTitle: string; productDesc: string; productPrice: string }) {
        await expect(this.page.locator("//span[@data-test='title']")).toHaveText("Checkout: Overview")
        await expect(this.page.locator(".cart_quantity_label")).toHaveText("QTY")
        await expect(this.page.locator(".cart_desc_label")).toHaveText("Description")
        await expect(this.page.locator(".inventory_item_name")).toHaveText(product.productTitle)
        await expect(this.page.locator(".inventory_item_desc")).toHaveText(product.productDesc)
        await expect(this.page.locator(".inventory_item_price")).toHaveText(product.productPrice)
        await expect(this.page.locator("#cancel")).toBeVisible();
        await expect(this.page.locator("#finish")).toBeVisible();
        await expect(this.page.locator("#finish")).toHaveText("Finish")
        await this.click(this.page.locator("#finish"), "Finish");
    }
}