import { reducer } from "./reducer";

//initial state
export let initialState = {
    currentScreen: 'home',
    products: [],
    cartProducts: [],
}

//Create dispatch function
export const dispatch = (action:any) => {
    const clone = JSON.parse(JSON.stringify(initialState));
    initialState = reducer(clone, action);
    //Notify all observers
    observers.forEach((observer:any) => observer());
}

//Create suscribe function
let observers:any[] = [];
export const addObserver = (ref : any) => {
	observers = [...observers, ref];
}