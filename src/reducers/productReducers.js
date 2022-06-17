import { FETCH_PRODUCTS } from "../type";

export const productReducers = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {items: action.payload}
        default:
            return state
    }
}