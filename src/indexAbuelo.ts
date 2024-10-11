//import screens (Dashboard)
import './screens/dashboard';
//import initialState 
import { initialState } from './store/store';
//import actions
import { changeScreen } from './store/actions';
//import dispatch
import { dispatch } from './store/store';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
        console.log(initialState);
        //add event listener to the button
        this.shadowRoot?.querySelector('#carrito')?.addEventListener('click', this.handleCarrito);
    }

    handleCarrito = () => {
        //dispatch action to change screen
        dispatch(changeScreen('myItems'));
    }

    render = () => {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
            switch (initialState.currentScreen) {
                case 'home':
                    const dashboardContainer = document.createElement('dashboard-container');
                    this.shadowRoot.appendChild(dashboardContainer);
                    break;
                case 'myItems':
                    this.shadowRoot.innerHTML = `
                        <my-cart></my-cart>
                    `;
                    break;
                default:
                    break;
            }
            
        }
    }
}

customElements.define('app-container', AppContainer);