//global state services
import { initialState } from '../store/store';
import { dispatch } from '../store/store';
import { setProducts } from '../store/actions';
import { addObserver } from '../store/store';
import { addProductToCart } from '../store/actions';
//import Product component
import Product, { ProductType } from '../components/Product/Product';

//import getProducts service
import { getProducts } from '../services/getProducts';
//import set function from storage
import { set } from '../utils/storage';
import { get } from '../utils/storage';

class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        //subscribe to global state
        addObserver(this.updateProducts);
        addObserver(this.updateCart);  // subscribe to cart updates
    }

    connectedCallback() {
        this.render();
        this.addEventListener('add-to-cart', this.handleAddToCart);

        getProducts().then((products) => {
            //store products on local storage
            set('products', products, false);
            //store products on global state from local storage
            const storedProducts = get('products', initialState.products);
            dispatch(setProducts(storedProducts));
            //get cart products from local storage
            const storedCartProducts = get('cartProducts', initialState.cartProducts);
            //update global state with cart products
            dispatch(addProductToCart(storedCartProducts));
        });
    }

    handleAddToCart = (event: any) => {
        const product = event.detail;
        const currentCart = get('cartProducts', initialState.cartProducts);

        //validate if the product is already in the cart
        const productIndex = currentCart.findIndex(
            (cartProduct: any) => cartProduct.id === product.id
        );
        if (productIndex !== -1) {
            currentCart[productIndex].quantity += 1;
        } else {
            currentCart.push({
                ...product,
                quantity: 1
            });
        }

        // Update the cart in local storage
        set('cartProducts', currentCart, false);

        // Update the global state
        dispatch(addProductToCart(currentCart));
    }

    updateProducts = () => {
        // Clear previous products
        const productContainer = this.shadowRoot?.querySelector('.product-container');
        if (productContainer) {
            productContainer.innerHTML = '';
        }

        // Add products from the global state
        initialState.products.forEach((product: any) => {
            this.createProduct(product);
        });
        console.log(initialState);
    }

    updateCart = () => {
        // Clear previous cart items
        const cartContainer = this.shadowRoot?.querySelector('.cart-container');
        if (cartContainer) {
            cartContainer.innerHTML = '';
        }

        // Render products in the cart from local storage
        const cartProducts = get('cartProducts', initialState.cartProducts) || [];
        cartProducts.forEach((product: any) => {
            if (product && product.id) {
                this.createCartProduct(product);
            }
        });
    }

    createProduct = (product: any) => {
        const productElement = new Product();
        productElement.setAttribute(ProductType.ID, product.id);
        productElement.setAttribute(ProductType.IMAGE, product.image);
        productElement.setAttribute(ProductType.TITLE, product.title);
        productElement.setAttribute(ProductType.DESCRIPTION, product.description);
        productElement.setAttribute(ProductType.CATEGORY, product.category);
        productElement.setAttribute(ProductType.PRICE, product.price);
        productElement.setAttribute(ProductType.RATING, product.rating.rate);

        //append product to containers
        this.shadowRoot?.querySelector('.product-container')?.appendChild(productElement);
    }

    createCartProduct = (product: any) => {
        const cartProductElement = document.createElement('div');
        cartProductElement.innerHTML = `
            <div class="cart-product">
                <img src="${product.image}" alt="${product.title}" />
                <div>
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            </div>
        `;

        this.shadowRoot?.querySelector('.cart-container')?.appendChild(cartProductElement);
    }

    render = () => {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .product-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 16px;
                        justify-content: center;
                        padding: 16px;
                        box-sizing: border-box;
                    }

                    product-component {
                        flex: 1 1 calc(33% - 32px); /* 3 columns with gap */
                        max-width: calc(33% - 32px);
                        box-sizing: border-box;
                    }

                    @media (max-width: 768px) {
                        product-component {
                            flex: 1 1 calc(50% - 16px); /* 2 columns on smaller screens */
                            max-width: calc(50% - 16px);
                        }
                    }

                    @media (max-width: 480px) {
                        product-component {
                            flex: 1 1 100%; /* 1 column on mobile */
                            max-width: 100%;
                        }
                    }

                    .cart-container {
                        padding: 16px;
                        border: 1px solid #ccc;
                        margin-top: 10rem;
                    }

                    .cart-product {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        margin-bottom: 16px;
                    }

                    .cart-product img {
                        width: 100px;
                        height: 100px;
                        object-fit: cover;
                    }
                </style>

                <div class="product-container"></div>
                <div class="cart-container">
                </div>
            `;
        }
    }
}

customElements.define('dashboard-container', Dashboard);
