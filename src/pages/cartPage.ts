import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { Constants } from "../utils/constants";

export class CartPage extends BasePage {

    private cartID = ".shopping_cart_link";
    private cartBadge = ".shopping_cart_badge";
    private title = "//span[@data-test='title']";
    private qtyLabel = ".cart_quantity_label";
    private descLabel = ".cart_desc_label";
    private cartQty = ".cart_quantity";
    private itemName = ".inventory_item_name";
    private itemDesc = ".inventory_item_desc";
    private itemPrice = ".inventory_item_price";
    private removeBtn = '//button[text()="Remove"]';
    private continueBtn = "#continue-shopping";
    private checkoutBtn = "#checkout";
    private cartProduct = ".cart_item";

    /**
     * Validates that the cart page displays the correct product details and UI elements.
     * @param product - Object containing productTitle, productDesc, and productPrice to validate against the cart.
     */
    async cartValidation(product: { productTitle: string; productDesc: string; productPrice: string }) {
        await this.click(this.page.locator(this.cartID), Constants.cart.cartBasket);
        const cartQty = await this.page.locator(this.cartBadge).innerText();
        await expect(this.page.locator(this.title)).toHaveText(Constants.cart.yourCart);
        await expect(this.page.locator(this.qtyLabel)).toHaveText(Constants.cart.quantity);
        await expect(this.page.locator(this.descLabel)).toHaveText(Constants.cart.description);
        if (!cartQty)
            await expect(this.page.locator(this.cartQty)).toHaveText(cartQty);
        console.log("Cart Quanity - ", cartQty);
        await expect(this.page.locator(this.itemName)).toHaveText(product.productTitle);
        await expect(this.page.locator(this.itemDesc)).toHaveText(product.productDesc);
        await expect(this.page.locator(this.itemPrice)).toHaveText(product.productPrice);
        await this.page.locator(this.removeBtn).isVisible();
        await expect(this.page.locator(this.removeBtn)).toHaveText(Constants.cart.remove);
        await this.page.locator(this.continueBtn).isVisible();
        await expect(this.page.locator(this.continueBtn)).toHaveText(Constants.cart.contShopping);
        await this.page.locator(this.checkoutBtn).isVisible();
        await expect(this.page.locator(this.checkoutBtn)).toHaveText(Constants.cart.checkout);
        await this.captureScreenshot();
    }

    /**
     * Removes a product from the shopping cart and verifies that 
     * the product is no longer visible in the cart.
     * and asserts that the product element is hidden after removal.
     */
    async removeFromCart() {
        await this.click(this.page.locator(this.cartID), Constants.cart.cartBasket);
        await this.click(this.page.locator(this.removeBtn), Constants.cart.remove);
        await expect(this.page.locator(this.cartProduct)).toBeHidden();
        await this.captureScreenshot();
    }

    /**
     * Navigates back to the product listing page from the cart page.
     * Verifies that the user is redirected to the product page 
     */
    async contShopping() {
        await this.click(this.page.locator(this.cartID), Constants.cart.cartBasket);
        await this.click(this.page.locator(this.continueBtn), Constants.cart.contShopping);
        await expect(this.page.locator(this.title)).toHaveText(Constants.product.product);
        await this.captureScreenshot();
    }

}