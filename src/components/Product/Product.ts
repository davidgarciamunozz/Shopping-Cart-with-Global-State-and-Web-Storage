export enum ProductType {
    IMAGE = 'image',
    TITLE = 'title',
    DESCRIPTION = 'description',
    CATEGORY = 'category',
    PRICE = 'price',
    RATING = 'rating',  
}

class Product extends HTMLElement {
    public image: string = '';
    public title: string = '';
    public description: string = '';
    public category: string = '';
    public price: string = '';
    public rating: string = '';

    static get observedAttributes() {
        return Object.values(ProductType);
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            switch(name) {
                case 'image':
                    this.image = newValue;
                    break;
                case 'title':
                    this.title = newValue;
                    break;
                case 'description':
                    this.description = newValue;
                    break;
                case 'category':
                    this.category = newValue;
                    break;
                case 'price':
                    this.price = parseFloat(newValue).toFixed(2);
                    break;
                case 'rating':
                    this.rating = newValue;
                    break;
                default:
                    break;
            }
        }
    }

    render = () => {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                .product-container {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #e5e5e5;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s;
                    background: #fff;
                    width: 100%;
                    max-width: 250px; /* Ajusta el tamaño máximo para que todas las tarjetas tengan el mismo ancho */
                    height: 100%;
                    margin: 0 auto;
                }

                .product-container:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                }

                .product-container img {
                    width: 100%;
                    height: 150px; /* Ajuste de altura para mantener una proporción adecuada */
                    object-fit: cover;
                }

                .product-content {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 12px;
                    flex-grow: 1;
                }

                .product-title {
                    font-size: 1rem;
                    margin: 0;
                    color: #333;
                }

                .product-description {
                    font-size: 0.85rem;
                    color: #666;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .product-info {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    color: #444;
                }

                .product-price {
                    font-size: 1rem;
                    font-weight: bold;
                    color: #007BFF;
                }

                .product-rating {
                    background: #ffeb3b;
                    border-radius: 4px;
                    padding: 2px 6px;
                    font-weight: bold;
                }
            </style>
            
            <div class="product-container">
                <img src="${this.image}" alt="${this.title}">
                <div class="product-content">
                    <h2 class="product-title">${this.title}</h2>
                    <p class="product-description">${this.description}</p>
                    <div class="product-info">
                        <span class="product-category">${this.category}</span>
                        <span class="product-rating">${this.rating} ★</span>
                    </div>
                    <div class="product-price">$${this.price}</div>
                    <button>Add to Cart</button>
                </div>
            </div>
            `;
        }
    }
}

customElements.define('product-container', Product);

export default Product;
