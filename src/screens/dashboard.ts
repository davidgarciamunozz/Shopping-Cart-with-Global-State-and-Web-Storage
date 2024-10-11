//global state services
import { initialState } from '../store/store';
import { dispatch } from '../store/store';
import { setProducts } from '../store/actions';
import { addObserver } from '../store/store';
//import Product component
import Product, {ProductType } from '../components/Product/Product';

//import getProducts service
import { getProducts } from '../services/getProducts';
//import set function from storage
import { set } from '../utils/storage';
import { get } from '../utils/storage';

class Dashboard extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        //subscribe to global state
        addObserver(this.updateProducts);
    }
    
    connectedCallback() {
        this.render();
        getProducts().then((products) => {
            //store products on local storage
            set('products', products, false);
            //store products on global state from local storage
            const storedProducts = get('products', initialState.products);
            dispatch(setProducts(storedProducts));
            console.log(storedProducts);

        });
        
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
    
    createProduct = (product: any) => {
        const productElement = new Product();
        productElement.setAttribute(ProductType.IMAGE, product.image);
        productElement.setAttribute(ProductType.TITLE, product.title);
        productElement.setAttribute(ProductType.DESCRIPTION, product.description);
        productElement.setAttribute(ProductType.CATEGORY, product.category);
        productElement.setAttribute(ProductType.PRICE, product.price);
        productElement.setAttribute(ProductType.RATING, product.rating.rate);
        
        //append product to container
        this.shadowRoot?.querySelector('.product-container')?.appendChild(productElement);
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
                </style>
                
                <div class="product-container"></div>
            `;
        }
    }
}

customElements.define('dashboard-container', Dashboard);
