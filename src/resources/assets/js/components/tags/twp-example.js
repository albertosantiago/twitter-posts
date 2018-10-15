'use strict';

import $ from 'jquery';

class TwpExampleHTMLElement extends HTMLElement {

    constructor(){
        console.log("CONSTRUCTOR_EXAMPLE");
        super();
        var header = document.createElement('h1');
        header.innerHTML = "Eeres un carapolla!";
        this.appendChild(header);
    }

    attributeChangedCallback(){
        console.log("ATTRIBUTE_CHANGED_CALLBACK_EXAMPLE");
    }
    connectedCallback() {
        console.log("CONNECTED_CALLBACK_EXAMPLE");
    }
    disconnectedCallback() {
        console.log("DISCONNECTED_CALLBACK_EXAMPLE");
    }
}

if(window.customElements!==undefined){
    if(window.customElements.get('twp-example')===undefined){
        window.customElements.define('twp-example', TwpExampleHTMLElement);
    }
}
