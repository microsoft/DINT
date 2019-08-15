import {IExtractor} from './PageExtractors/IExtractor'
import {AmazonExtractor} from './PageExtractors/AmazonExtractor'
import { IProduct } from './ProductExtractors/IProduct';
import { AmazonProduct } from './ProductExtractors/AmazonProduct';
import { AmazonAgent } from './IAgent/AmazonAgent';
import {IAgent} from './IAgent/IAgent';
import { WalmartExtractor } from './PageExtractors/WalmartExtractor';
import { WalmartProduct } from './ProductExtractors/WalmartProduct';
import { WalmartAgent } from './IAgent/WalmartAgent';

export class Extractor {
    private extractor: IExtractor;
    private product: null | IProduct;
    private agent: IAgent;
    private debug: boolean;

    constructor(debug=false) {
        this.debug = debug;
        this.extractor = this.setExtractor();
        this.product = this.setProduct();
        this.agent = this.setAgent();
    }

    private setExtractor() {
        var extractorFactory = [
            new AmazonExtractor(),
            new WalmartExtractor(),
        ]
        var extractors = extractorFactory.map(x => x.isWebsite())
        if (extractors.filter(x => x).length == 1)
            return extractorFactory[extractors.indexOf(true)]
        else
            throw "No extractor for page!"
    }

    private setProduct() {
        if (this.extractor.getPageType() != "ProductPage")
            return null;
        switch(this.extractor.getWebsite()) {
            case "https://www.amazon.com/":
                return new AmazonProduct();
            case "https://www.walmart.com/":
                return new WalmartProduct();
            default:
                throw " No product class implementation for that website.";
        }
    }

    private setAgent() {
        switch(this.extractor.getWebsite()) {
            case "https://www.amazon.com/":
                return new AmazonAgent();
            case "https://www.walmart.com/":
                return new WalmartAgent();
            default:
                throw " No product class implementation for that website.";
        }
    }

    getPage() {
        if (this.debug) {
            //alert(JSON.stringify(this.extractor.getPageType()));
        }
        return this.extractor.getPageType();
    }

    getProduct() {
        if (this.debug) {
            //alert(JSON.stringify(this.product));
        }         
        return this.product;
    }

    setTestButton() {
        this.agent.setTestButton();
    }

    setAddToCartCallback(callback: () => void) {
        this.agent.setAddToCartButton(callback)
    }

    addToCartAction() {
        if(this.agent === undefined) {
            this.agent = this.setAgent();
        }
        this.agent.addToCartAction();
    }
}