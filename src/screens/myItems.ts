//import global state services
import { initialState } from "../store/store";

class MyCart extends HTMLElement {
    constructor () {
        super ();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }
    render = () => {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <h1>My Cart</h1>
                    <div class="cart-container">
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('my-cart', MyCart);