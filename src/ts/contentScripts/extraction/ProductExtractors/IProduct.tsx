export interface IPrice {
    getPrices(): Object;
    getPrice(): Number;
}

export abstract class IProduct {
    private name: null | string;
    private site: null | string;
    private description: null | string;
    private category: null | string[];
    private image: null | string;
    private url: null | string;
    private prices: IPrice;

    constructor() {
        this.name = this.setName();
        this.site = this.setSite();
        this.description = this.setDescription();
        this.category = this.setCategories();
        this.prices = this.setPrices();
        this.image = this.setImage();
        this.url = this.setUrl();
    }

    protected abstract setName(): null | string;
    protected abstract setSite(): null | string;
    protected abstract setDescription(): null | string;
    protected abstract setCategories(): null | string[];
    protected abstract setImage(): null | string;
    protected abstract setUrl(): null | string;
    protected abstract setPrices(): IPrice;
    

    getPrice() { return this.getPrices().getPrice() };
    getName() { return this.name; }
    getSite() { return this.site; }
    getDescription() { return this.description; }
    getCategory() { return this.category; }
    getImage() { return this.image; }
    getUrl() { return this.url; }
    getPrices() { return this.prices; }


    getProduct() {
        return {
            name: this.getName(),
            site: this.getSite(),
            description: this.getDescription(),
            category: this.setCategories(),
            prices: this.prices.getPrices()
        }
    }
}