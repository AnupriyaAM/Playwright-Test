import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { Constants } from "../utils/constants";

export class CheckoutPage extends BasePage {

    private checkoutTitle = "//span[@data-test='title']";
    private qtyLabel = ".cart_quantity_label";
    private descLabel = ".cart_desc_label";
    private itemName = ".inventory_item_name";
    private itemDesc = ".inventory_item_desc";
    private itemPrice = ".inventory_item_price";
    private cancelBtn = "#cancel";
    private finishBtn = "#finish";

    /**
     * Validates the Checkout Overview page details before completing the purchase.
     * Ensures that product details, labels, and action buttons are displayed correctly.
     * 
     * @param product - Object containing productTitle, productDesc, and productPrice to validate against the checkout overview page.
     */
    async checkoutOverview(product: { productTitle: string; productDesc: string; productPrice: string }) {
        await expect(this.page.locator(this.checkoutTitle)).toHaveText(Constants.checkout.overview);
        await expect(this.page.locator(this.qtyLabel)).toHaveText(Constants.cart.quantity);
        await expect(this.page.locator(this.descLabel)).toHaveText(Constants.cart.description);
        await expect(this.page.locator(this.itemName)).toHaveText(product.productTitle);
        await expect(this.page.locator(this.itemDesc)).toHaveText(product.productDesc);
        await expect(this.page.locator(this.itemPrice)).toHaveText(product.productPrice);
        await expect(this.page.locator(this.cancelBtn)).toBeVisible();
        await expect(this.page.locator(this.finishBtn)).toBeVisible();
        await expect(this.page.locator(this.finishBtn)).toHaveText(Constants.checkout.finish);
        await this.click(this.page.locator(this.finishBtn), Constants.checkout.finish);
    }
}