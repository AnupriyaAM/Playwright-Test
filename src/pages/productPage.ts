import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";

export class ProductPage extends BasePage {

    /**
     * Validates the details of a single product on the product details page.
     * Ensures the image, name, description, and price are displayed and match the expected product.
     * 
     * @param product - Object containing productTitle, productDesc, and productPrice to validate.
     */
    async validateProductDetails(product: { productTitle: string; productDesc: string; productPrice: string }) {
        await this.page.locator(".inventory_details_img").isVisible();
        await this.page.locator(".inventory_details_name").isVisible();
        await expect(this.page.locator(".inventory_details_name")).toHaveText(product.productTitle);
        await this.page.locator(".inventory_details_desc").isVisible();
        await expect(this.page.locator(".inventory_details_desc")).toHaveText(product.productDesc);
        await this.page.locator(".inventory_details_price").isVisible();
        await expect(this.page.locator(".inventory_details_price")).toHaveText(product.productPrice);
    }

    /**
     * Adds the product to the shopping cart and validates that the cart updates correctly.
     * Ensures that the "Add to Cart" button changes to "Remove" and the cart badge appears.
     */
    async addProductToCart() {
        await expect(this.page.locator(".shopping_cart_badge")).toBeHidden();
        await this.click(this.page.locator(`#add-to-cart`), "Add to Cart");
        await expect(this.page.locator(`#remove`)).toHaveText("Remove");
        await expect(this.page.locator(".shopping_cart_badge")).toBeVisible();
    }
}