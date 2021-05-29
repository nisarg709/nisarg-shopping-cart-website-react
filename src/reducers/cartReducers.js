import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING,
    CART_SAVE_PAYMENT,
    CART_LIST,
    CART_UPDATE
} from "../constants/cartConstants";

function cartListReducer(state = {cartItems: []}, action) {
    switch (action.type) {
        case CART_LIST:
            return {loading: false, cart: action.payload};
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return {cartItems: [...state.cartItems, item]};
        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x => x.product !== action.payload)};
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload};
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload};
        default:
            return state
    }
}

function cartUpdateReducer(state = {cartItems: []}, action) {
    switch (action.type) {
        case CART_UPDATE:
            return { loading: false, success: true, cartUpdate: action.payload };
        default:
            return state
    }
}

function cartReducer(state = {cartItems: [], shipping: {}, payment: {}}, action) {
    switch (action.type) {
        case CART_LIST:
            return {loading: false, cart: action.payload};
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return {cartItems: [...state.cartItems, item]};
        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x => x.product !== action.payload)};
        case CART_SAVE_SHIPPING:
            return {...state, shipping: action.payload};
        case CART_SAVE_PAYMENT:
            return {...state, payment: action.payload};
        default:
            return state
    }
}

export {cartReducer, cartListReducer, cartUpdateReducer}