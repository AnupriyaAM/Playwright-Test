import { expect } from "@playwright/test";
import { BasePage } from "../utils/basePage";
import { Constants } from "../utils/constants";

export class ProductListPage extends BasePage {
    private pageHeading = ".app_logo";
    private productLabel = "//span[@data-test='title']";
    private productList = ".inventory_item";
    private itemName = ".inventory_item_name";
    private itemDesc = ".inventory_item_desc";
    private itemPrice = ".inventory_item_price";
    private productByTitle = (productTitle: string) => `//div[text()='${productTitle}']`;

    /**
     * Validates that the main page heading and product label are displayed correctly.
     */
    async validateHeading() {
        await expect(this.page.locator(this.pageHeading)).toHaveText(Constants.product.title);
        await expect(this.page.locator(this.productLabel)).toHaveText(Constants.product.product);
    }

    /**
     * Logs the total number of products displayed on the inventory page.
     */
    async validateProductList() {
        const productList = await this.page.locator(this.productList).count();
        console.log(`product List displayed is ${productList}`);
    }

    /**
     * Selects a random product from the inventory and retrieves its details.
     * 
     * @returns An object containing productTitle, productDesc, and productPrice
     * @throws Error if product details cannot be retrieved
     */
    async getProductDetails() {
        const products = this.page.locator(this.productList);
        const count = await products.count();
        const randomIndex = Math.floor(Math.random() * count);
        const randomProduct = products.nth(randomIndex);
        const productTitle = await randomProduct.locator(this.itemName).textContent();
        const productDesc = await randomProduct.locator(this.itemDesc).textContent();
        const productPrice = await randomProduct.locator(this.itemPrice).textContent();
        await this.captureScreenshot();
        if (!productTitle || !productDesc || !productPrice) {
            throw new Error("Failed to get product details from inventory page");
        }
        console.log(productTitle)
        console.log(productDesc)
        console.log(productPrice)
        return { productTitle: productTitle.trim(), productDesc: productDesc.trim(), productPrice: productPrice.trim() };
    }

    /**
     * Selects a product by its title on the inventory page.
     * 
     * @param productTitle - The exact title of the product to select
     */
    async selectProduct(productTitle: string) {
        await this.click(this.page.locator(this.productByTitle(productTitle)), productTitle);
    }
}