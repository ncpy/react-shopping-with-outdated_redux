import { CLEAR_ORDER, CREATE_ORDER, FETCH_ORDERS } from "../type";


const orderReducers = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return { order: action.payload }
        case CLEAR_ORDER:
            return { order: null }
        case FETCH_ORDERS:
            return { orders: action.payload } // NOT order
        default:
            return state
    }
}

export { orderReducers }