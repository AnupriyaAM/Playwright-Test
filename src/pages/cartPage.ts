import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { Constants } from "../utils/constants";

export class CartPage extends BasePage {

    private cartID = ".shopping_cart_link";
    private cartBadge = ".shopping_cart_badge";
    private cartTitle = "//span[@data-test='title']";
    private qtyLabel = ".cart_quantity_label";
    private descLabel = ".cart_desc_label";
    private cartQty = ".cart_quantity";
    private itemName = ".inventory_item_name";
    private itemDesc = ".inventory_item_desc";
    private itemPrice = ".inventory_item_price";
    private removeBtn = "#remove-sauce-labs-backpack";
    private continueBtn = "#continue-shopping";
    private checkoutBtn = "#checkout";

    /**
     * Validates that the cart page displays the correct product details and UI elements.
     * @param product - Object containing productTitle, productDesc, and productPrice to validate against the cart.
     */
    async cartValidation(product: { productTitle: string; productDesc: string; productPrice: string }) {
        await this.click(this.page.locator(this.cartID), Constants.cart.cartBasket)
        const cartQty = await this.page.locator(this.cartBadge).innerText();
        await expect(this.page.locator(this.cartTitle)).toHaveText(Constants.cart.yourCart)
        await expect(this.page.locator(this.qtyLabel)).toHaveText(Constants.cart.quantity)
        await expect(this.page.locator(this.descLabel)).toHaveText(Constants.cart.description)
        if (!cartQty)
            await expect(this.page.locator(this.cartQty)).toHaveText(cartQty);
        console.log("Cart Quanity - ", cartQty)
        await expect(this.page.locator(this.itemName)).toHaveText(product.productTitle);
        await expect(this.page.locator(this.itemDesc)).toHaveText(product.productDesc);
        await expect(this.page.locator(this.itemPrice)).toHaveText(product.productPrice);
        await this.page.locator(this.removeBtn).isVisible();
        await this.page.locator(this.continueBtn).isVisible();
        await expect(this.page.locator(this.continueBtn)).toHaveText(Constants.cart.contShopping);
        await this.page.locator(this.checkoutBtn).isVisible();
        await expect(this.page.locator(this.checkoutBtn)).toHaveText(Constants.cart.checkout);
    }
}