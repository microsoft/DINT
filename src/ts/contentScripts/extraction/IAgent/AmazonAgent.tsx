import { IAgent } from './IAgent';

export class AmazonAgent implements IAgent {
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

    private getButton(id: string)  { return document.getElementById(id); }

    private buttonPreprocess(button: HTMLElement | null) {
        if (button == null)
            return false;
        button.setAttribute("type", "button");
        return true;
    }

    setAddToCartButton(callback: () => void) {
        var button = this.getButton("add-to-cart-button");
        if (!this.buttonPreprocess(button))
            return false;
        button!.addEventListener('click', callback);
        button!.style.removeProperty('cursor');
        return true;
    }

    addToCartAction() {
        //alert('add to cart action');
        var button = this.getButton('add-to-cart-button');
        if (button == null)
            return;
        button.setAttribute("type", "submit");
        button.click();
    }

}