import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";

export class CartPage extends BasePage {

    /**
     * Validates that the cart page displays the correct product details and UI elements.
     * @param product - Object containing productTitle, productDesc, and productPrice to validate against the cart.
     */
    async cartValidation(product: { productTitle: string; productDesc: string; productPrice: string }) {
        await this.click(this.page.locator(".shopping_cart_link"), "Cart Basket")
        const cartQty = await this.page.locator(".shopping_cart_badge").innerText();
        await expect(this.page.locator("//span[@data-test='title']")).toHaveText("Your Cart")
        await expect(this.page.locator(".cart_quantity_label")).toHaveText("QTY")
        await expect(this.page.locator(".cart_desc_label")).toHaveText("Description")
        if (!cartQty)
            await expect(this.page.locator(".cart_quantity")).toHaveText(cartQty);
        console.log("Cart Quanity - ", cartQty)
        await expect(this.page.locator(".inventory_item_name")).toHaveText(product.productTitle);
        await expect(this.page.locator(".inventory_item_desc")).toHaveText(product.productDesc);
        await expect(this.page.locator(".inventory_item_price")).toHaveText(product.productPrice);
        await this.page.locator("#remove-sauce-labs-backpack").isVisible();
        await this.page.locator("#continue-shopping").isVisible();
        await expect(this.page.locator(`#continue-shopping`)).toHaveText("Continue Shopping");
        await this.page.locator("#checkout").isVisible();
        await expect(this.page.locator(`#checkout`)).toHaveText("Checkout");
    }
}