import { test as baseTest } from '@playwright/test'
import { CartPage } from '../pages/cartPage'
import { CheckoutPage } from '../pages/checkoutPage'
import { ThankyouPage } from '../pages/thankyouPage'
import { ProductPage } from '../pages/productPage'
import { CustomerDetailsPage } from '../pages/customerDetailsPage'
import { LoginPage } from '../pages/loginPage'
import { ProductListPage } from '../pages/productListPage'

type customForceFixture = {
    CartPage: CartPage
    CheckoutPage:CheckoutPage
    CustomerDetailsPage:CustomerDetailsPage
    LoginPage: LoginPage
    ProductListPage:ProductListPage
    ProductPage:ProductPage
    ThankyouPage:ThankyouPage
}

export const test = baseTest.extend<customForceFixture>({

    CartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    CheckoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    
    CustomerDetailsPage: async ({ page }, use) => {
        const customerDetailsPage = new CustomerDetailsPage(page);
        await use(customerDetailsPage);
    },

    LoginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    
    ProductListPage: async ({ page }, use) => {
        const productListPage = new ProductListPage(page);
        await use(productListPage);
    },
    
    ProductPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    
    ThankyouPage: async ({ page }, use) => {
        const thankyouPage = new ThankyouPage(page);
        await use(thankyouPage);
    },
})