//import screens (Dashboard)
import './screens/dashboard';
//import initialState 
import { initialState } from './store/store';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
        console.log(initialState);
    }


    render = () => {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <h1>Dashboard</h1>
                </div>
            `;
            const dashboardContainer = document.createElement('dashboard-container');
            this.shadowRoot.appendChild(dashboardContainer);
        }
    }
}

customElements.define('app-container', AppContainer);