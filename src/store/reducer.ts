export const reducer = (previousState:any, action:any) => {
    const {type, payload} = action;
    switch(type) {
        case 'CHANGE_SCREEN':
            return {
                ...previousState,
                currentScreen: payload
            }
        case 'SET_PRODUCTS':
            return {
                ...previousState,
                products: payload
            }
        case 'ADD_PRODUCT_TO_CART':
              // Verify if the product already exists in the cart
            const productExists = previousState.cartProducts.some(
                (product: any) => product.id === payload.id
            );
            
            // If the product already exists, return the previous state
            if (productExists) {
                return previousState;
            }

            return {
                ...previousState,
                cartProducts: [...previousState.cartProducts, payload]
            };
        
        default:
            return previousState;
    }
    
}