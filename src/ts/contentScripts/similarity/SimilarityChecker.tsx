import { AmazonExtractor } from '../extraction/PageExtractors/AmazonExtractor';
import { AmazonProduct } from '../extraction/ProductExtractors/AmazonProduct';
import { RProduct, Product } from '../../background/store/reducers';

export class SimilarityChecker {

    isSimilar(currentProduct: Product):Product | undefined {
        // This parses through the order history arrary and sees 
        // if any keywords from the current product's data 
        // matches any of the items in the user's order history 
        var orderHistory = this.getOrderHistory().history;
        var currentProdCategory: string[];
        var catIndex:Number = -1, index:Number = -1;
        
        // Category checking
       
        var currentProdCategory: string[] = (currentProduct.category)  ? currentProduct.category : [];
        // history loop
        for (var m = 0; m < orderHistory.length; m++) {
            var purchasedProdCategory:any = orderHistory[m].category;
            if (purchasedProdCategory != null) {
                // purchased prod loop
                for (var i = purchasedProdCategory.length-1; i >= 0; i--) {
                    // current prod loop
                    for (var j = currentProdCategory.length - 1; j >= 0; j--) {
                        if (currentProdCategory[j] == purchasedProdCategory[i]){
                            if (i >= j && i >= index) {
                                index = i; 
                                catIndex = m;
                                //console.log("positions " + i + " " + j);
                                //console.log("found match at " + currentProdCategory[j] + " and " + purchasedProdCategory[i]);
                            }
                            else if (j >= i && j >= index) {
                                index = j; 
                                catIndex = m;
                                //console.log("positions " + i + " " + j);
                                //console.log("found match at " + currentProdCategory[j] + " and " + purchasedProdCategory[i]);
                            }
                        } 
                    }
                }
            }
        }
        console.log(catIndex);
        if (catIndex >= 0 && index > 0){
            return this.getMatchedItem(catIndex);
        }
        return undefined;
    }

    getMatchedItem(index:any):Product {
        var result:Product = this.getOrderHistory().history[index];
        //alert("matched with " + JSON.stringify(result));
        return result;
    }

    getCurrentProdData(type:string):any {
        // Use the extractor to make sure we're on a product page
        var pageChecker = new AmazonExtractor();
        if (pageChecker.getPageType() == "ProductPage"){
            var currentProd = new AmazonProduct();
            if (currentProd){
                if(type == "Name")
                    return currentProd.getName();
                if(type == "Category")
                    return currentProd.getCategory();
            }
            else
                console.log("error");
        }
        else
            return "";
    }

    getOrderHistory():RProduct {
        // TODO: get PurchasedProducts from DB
        // Create fake history
        var fakeHistory:RProduct; 
        
        var product1:Product, product2:Product, product3:Product, product4:Product, product5:Product, product6:Product;
        product1 = {
            name: "Jurassic World Chomp 'n Roar Mask Velociraptor \"blue\"",
            cost: 10,
            category: ["Toys & Games ", "Dress Up",  "Pretend Play", "Masks"],
            site: "Amazon",
            imgSrc: "https://dyn0.media.forbiddenplanet.com/products/ccc3d79aafb1f918a63d7b09fba9962431156a34.jpg.jpg"
        }
        product2 = {
            name: "JWSilk Extra Wide Silk Chiffon Scarf Floral Print",
            cost: 10,
            category: ["Clothing, Shoes & Jewelry", "Women", "Accessories", "Scarves & Wraps", "Fashion Scarves"],
            site: "Amazon",
            imgSrc: "https://cdn.shopify.com/s/files/1/1486/9868/products/yangtze-store-extra-wide-silk-chiffon-shawl-wrap-scarf-blue-and-orange-floral-print-sch149-23109053456_grande.jpg?v=1519406176"
        }
        product3 = {
            name: "BRONAX Men's Stylish Graffiti Personality Sneakers",
            cost: 10,
            category: ["Clothing, Shoes & Jewelry", "Men",  "Shoes",  "Athletic", "Tennis & Racquet Sports"],
            site: "Amazon",
            imgSrc: "https://images-na.ssl-images-amazon.com/images/I/811UUxiyrzL.jpg"
        }
        product4 = {
            name: "Made In The A.M.",
            cost: 10,
            category: ["CDs & Vinyl", "Alternative Rock", "British Alternative", "Britpop"],
            site: "Amazon",
            imgSrc: "https://i.ytimg.com/vi/8bbI-SUN0XQ/hqdefault.jpg"
        }
        product5 = {
            name: "Hello Is It Tea You're Looking For Poster 11x14",
            cost: 10,
            category: ["Handmade Products", "Home & Kitchen", "Artwork", "Posters"],
            site: "Amazon",
            imgSrc: "https://images-na.ssl-images-amazon.com/images/I/41ZulkjoURL._QL70_.jpg"
        }
        product6 = {
            name: "Crest Cavity Protection Regular Toothpaste,",
            cost: 10,
            category: ["Personal care", "Oral care"],
            site: "Walmart",
            imgSrc: "https://i5.walmartimages.com/asr/6db3974d-604b-4021-93bb-18fc21a80b51_1.608a0dbdec34b710a4851edc9dc2af77.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
        }

        fakeHistory = {
            current: null,
            history: [product1, product2, product3, product4, product5, product6]
        }

        return fakeHistory;
    }
}