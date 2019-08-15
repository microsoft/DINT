import {IExtractor} from './IExtractor'

export class WalmartExtractor extends IExtractor {

    constructor() { super("https://www.walmart.com/"); }

    protected isProductPage() {
        if (document.querySelector('button[data-tl-id=ProductPrimaryCTA-cta_add_to_cart_button]') != null)
            return true;
        return  false;
    }

    protected isCartPage() {
        return location.href.endsWith("/cart");
    }

    protected isCheckoutPage() {
        return location.href.startsWith(this.getWebsite() + "checkout/")
    }

}