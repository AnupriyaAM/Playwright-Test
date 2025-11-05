import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { Constants } from "../utils/constants";

export class ProductPage extends BasePage {

    private detailImg = ".inventory_details_img";
    private detailName = ".inventory_details_name";
    private detailDesc = ".inventory_details_desc";
    private detailPrice = ".inventory_details_price";
    private cartBadge = ".shopping_cart_badge";
    private addToCart = `#add-to-cart`;
    private removeBtn = `#remove`;

    /**
     * Validates the details of a single product on the product details page.
     * Ensures the image, name, description, and price are displayed and match the expected product.
     * 
     * @param product - Object containing productTitle, productDesc, and productPrice to validate.
     */
    async validateProductDetails(product: { productTitle: string; productDesc: string; productPrice: string }) {
        await this.page.locator(this.detailImg).isVisible();
        await this.page.locator(this.detailName).isVisible();
        await expect(this.page.locator(this.detailName)).toHaveText(product.productTitle);
        await this.page.locator(this.detailDesc).isVisible();
        await expect(this.page.locator(this.detailDesc)).toHaveText(product.productDesc);
        await this.page.locator(this.detailPrice).isVisible();
        await expect(this.page.locator(this.detailPrice)).toHaveText(product.productPrice);
        await this.captureScreenshot();
    }

    /**
     * Adds the product to the shopping cart and validates that the cart updates correctly.
     * Ensures that the "Add to Cart" button changes to "Remove" and the cart badge appears.
     */
    async addProductToCart() {
        await expect(this.page.locator(this.cartBadge)).toBeHidden();
        await this.click(this.page.locator(this.addToCart), Constants.product.addToCart);
        await expect(this.page.locator(this.removeBtn)).toHaveText(Constants.cart.remove);
        await expect(this.page.locator(this.cartBadge)).toBeVisible();
        await this.captureScreenshot();
    }
}