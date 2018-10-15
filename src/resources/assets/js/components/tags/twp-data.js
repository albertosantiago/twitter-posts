'use strict';

class TwpDataHTMLElement extends HTMLElement {

    constructor(){
        super();
    }
    
    connectedCallback() {}
}

if(window.customElements!==undefined){
    if(window.customElements.get('twp-data')===undefined){
        window.customElements.define('twp-data', TwpDataHTMLElement);
    }
}

export default TwpDataHTMLElement;
