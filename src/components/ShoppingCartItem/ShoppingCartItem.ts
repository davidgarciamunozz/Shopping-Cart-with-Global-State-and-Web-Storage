
class ShoppingCart extends HTMLElement {
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
                    <h1>Shopping Cart</h1>
                    <div class="cart-container">
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('shopping-cart', ShoppingCart);