export const changeScreen = (screen: string) => {
    return {
        type: 'CHANGE_SCREEN',
        payload: screen 
    }
}

export const setProducts = (storedProducts: any[]) => {
    return {
        type: 'SET_PRODUCTS',
        payload: storedProducts
    }
}

export const addProductToCart = (product: any) => {
    return {
        type: 'ADD_PRODUCT_TO_CART',
        payload: product
    }
}