import { test } from '../fixture/customFixture';
import { Constants } from '../utils/constants';

let tcCount:number =1;

test(`TC_${tcCount++} to validate process of product order from inventory`, async ({ CartPage, CheckoutPage, CustomerDetailsPage, LoginPage, ProductListPage, ProductPage, ThankyouPage, }) => {
 await LoginPage.navigateTo(Constants.url.url);
 await LoginPage.validateTitle();
 await LoginPage.login(Constants.Standard.userName,Constants.Standard.password);
 await ProductListPage.validateHeading();
 await ProductListPage.validateProductList();
 const product = await ProductListPage.getProductDetails();
 await ProductListPage.selectProduct(product.productTitle);
 await ProductPage.validateProductDetails(product);
 await ProductPage.addProductToCart();
 await CartPage.cartValidation(product);
 await CustomerDetailsPage.checkoutValidation();
 await CheckoutPage.checkoutOverview(product);
 await ThankyouPage.thankyouValidation();
 await ThankyouPage.backHomeValidation();
});

test(`TC_${tcCount++} to validate process of removing the product from your cart`, async ({ CartPage, LoginPage, ProductListPage, ProductPage }) => {
 await LoginPage.navigateTo(Constants.url.url);
 await LoginPage.validateTitle();
 await LoginPage.login(Constants.Standard.userName,Constants.Standard.password);
 await ProductListPage.validateHeading();
 const product = await ProductListPage.getProductDetails();
 await ProductListPage.selectProduct(product.productTitle);
 await ProductPage.addProductToCart();
 await CartPage.removeFromCart();
});

test(`TC_${tcCount++} to validate process of continue shopping from your cart`, async ({ CartPage, LoginPage, ProductListPage, ProductPage }) => {
 await LoginPage.navigateTo(Constants.url.url);
 await LoginPage.validateTitle();
 await LoginPage.login(Constants.Standard.userName,Constants.Standard.password);
 await ProductListPage.validateHeading();
 const product = await ProductListPage.getProductDetails();
 await ProductListPage.selectProduct(product.productTitle);
 await ProductPage.addProductToCart();
 await CartPage.contShopping();
});

test(`TC_${tcCount++} to verify checkout error validation`, async ({ CustomerDetailsPage, LoginPage, ProductListPage, ProductPage}) => {
 await LoginPage.navigateTo(Constants.url.url);
 await LoginPage.validateTitle();
 await LoginPage.login(Constants.Standard.userName,Constants.Standard.password);
 const product = await ProductListPage.getProductDetails();
 await ProductListPage.selectProduct(product.productTitle);
 await ProductPage.addProductToCart();
 await CustomerDetailsPage.checkoutErrorValidation();
});