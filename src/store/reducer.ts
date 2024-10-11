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
        default:
            return previousState;
    }
}