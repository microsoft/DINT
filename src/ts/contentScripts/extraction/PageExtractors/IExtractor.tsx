export abstract class IExtractor {
    private website: string;
    private type: string;

    protected abstract isProductPage(): boolean;
    protected abstract isCartPage(): boolean;
    protected abstract isCheckoutPage(): boolean;

    constructor(name: string) {
        this.website = name;
        this.type = this.setPageType();
    }

    isWebsite() { return location.href.startsWith(this.website); }
    getWebsite() { return this.website; }
    getPageType() { return this.type; }

    private extractionCheck() {
        var extractionResults = [
            this.isProductPage(),
            this.isCartPage(),
            this.isCheckoutPage(),
        ];
        var patterns_match = extractionResults.filter(x => x).length;
        
        return patterns_match > 1 ? false : true;

    }
    
    private setPageType() {
        if (this.extractionCheck()) {
            if (this.isCartPage())
                return "CartPage"
            else if (this.isCheckoutPage())
                return "CheckoutPage"
            else if (this.isProductPage())
                return "ProductPage" 
            else {
                return "DefaultPage"
            }
        }
        else
            throw "extractionCheck() failed"
    }
}