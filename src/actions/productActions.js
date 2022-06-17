import { FETCH_PRODUCTS } from "../type"

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products")
    const data = await res.json()
    console.log("datamız "+data[1])
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    })
}