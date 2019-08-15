import { IAgent } from './IAgent';

export class WalmartAgent implements IAgent {
    private debug: boolean;

    constructor(debug=false) { 
        this.debug = debug 
    }

    setTestButton() {
        if (this.debug) {
            var debug = this.debug;
            var button = document.createElement('button');
            button.id = "test-button";
            var text = document.createTextNode('Test');
            button.appendChild(text);
            document.body.insertBefore(button, document.body.firstChild);
    
            button.addEventListener("click", function() {
                if (debug)
                    alert("test-listener");
                return;
            });
        }
    }

    setAddToCartButton(callback: () => void) {
        var button: HTMLButtonElement | null = document.querySelector("button[data-tl-id=ProductPrimaryCTA-cta_add_to_cart_button]")
        if (button == null)
            return false;
        
        var newButton = button.cloneNode(true);

        var parentDom = document.querySelector("div.prod-product-cta-add-to-cart")
        if (parentDom == null)
            return false;
        parentDom.insertBefore(newButton, button);

        document.querySelector("div.prod-product-cta-add-to-cart")!.addEventListener('click', callback);
        button!.style.display = 'none'
        button.id = "addToCartNow"
        return true;
    }

    addToCartAction() {
        var nodes = document.querySelectorAll("div.prod-product-cta-add-to-cart")
        if (nodes.length != 1)
            return;
        if (nodes[0].children.length == 2) {
            nodes[0].firstElementChild!.remove()
            document.getElementById("addToCartNow")!.click();
            document.getElementById("addToCartNow")!.style.display = ''
        }
    }

}