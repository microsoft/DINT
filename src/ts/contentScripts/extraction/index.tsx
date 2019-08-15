import {Extractor} from "./Extractor"
//import { SimilarityChecker } from '../similarity/SimilarityChecker';

// Extractor
var extractor = new Extractor(true);
extractor.getPage();
extractor.getProduct();
//extractor.setAddToCartCallback(() => alert("it works!"));

// Similarity 
/*var similarityChecker1 = new SimilarityChecker();
var similarityFound = similarityChecker1.isSimilar(produc);
if (similarityFound)
    console.log("Similarity Found");
else
    console.log("No Similarity Found");*/
