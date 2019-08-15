import {IPrice, IProduct} from './IProduct'

export class WalmartPrice implements IPrice {
    private price: null | Number;

    constructor() {
        this.price = this.setPrice();
    }

    getPrice() {
        return this.price ? this.price : NaN;
    }

    getPrices() {
        return { price: this.getPrice() }
    }

    private setPrice() {
        var price = document.getElementById('price')
        if (price == null)
            return null;
        return parseFloat(price!.innerText!.substr(1));
    }
}

export class WalmartProduct extends IProduct {
    constructor() { super(); }

    protected setName() { 
        var dom = document.querySelector("h1.prod-ProductTitle");
        return dom ? dom.textContent : null
    }

    protected setSite() { return 'Walmart'; }

    protected setDescription() { 
        var divDom = document.querySelector("div.prod-ProductHighlights-description");
        if (divDom == null)
            return null;
        var lisDom = divDom.getElementsByTagName('li')
        if (lisDom == null)
            return null;

        var description = ""
        for (var i = 0; i < lisDom.length; i++)
            description += lisDom[i].textContent!.trim() + " ";
            
        return description.trim();
    }

    protected setCategories() {
        var lisDom = document.querySelectorAll("li.breadcrumb")
        if (lisDom.length == 0)
            return null
        var result = [];
        for (var i = 0; i < lisDom.length; i++) {
            if (lisDom[i].textContent != null) {
                if (i > 0)
                    result.push(lisDom[i].textContent!.substr(1))
                else
                    result.push(lisDom[i].textContent!);
            }
        }
        return result.length == 0 ? null : result;
    }

    protected setImage() {
        var imgDom = document.querySelector("img.hover-zoom-hero-image");
        return imgDom ? imgDom.getAttribute('src') : null;
    }

    protected setUrl() { return location.href; }
    protected setPrices() { return new WalmartPrice(); }
}