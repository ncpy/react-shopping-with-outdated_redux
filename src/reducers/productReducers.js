import { FETCH_PRODUCTS } from "../type";

export const productReducers = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            console.log("datadata: "+action.payload)
            return {items: action.payload}
        default:
            return state
    }
}