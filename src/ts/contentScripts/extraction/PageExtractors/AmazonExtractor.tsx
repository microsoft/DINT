import {IExtractor} from './IExtractor'

export class AmazonExtractor extends IExtractor{

    constructor() { super("https://www.amazon.com/"); }
    
    protected isProductPage() {
        if (document.getElementById('add-to-cart-button') != null)
            return true;
        return  false;
    }

    protected isCartPage() {
        if (location.href.includes("/cart/"))
            return true;
        return false;
    }

    protected isCheckoutPage() {
        var headings = document.getElementsByTagName("h1");
        if (headings.length != 1)
            return false;
        if (headings[0].textContent == null)
            return false;
        if (headings[0].textContent.includes("Checkout"))
            return true;
        return false;
    }
}