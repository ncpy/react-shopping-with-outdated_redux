import { FETCH_PRODUCTS } from "../type"
import { FILTER_PRODUCTS_BY_SIZE } from "../type"
import { ORDER_PRODUCTS_BY_PRICE } from "../type"

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products")
    const data = await res.json()
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    })
}

export const filterProducts = (products, size) => async (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: 
                size === ""
                    ? products
                    : products.filter(x => x.availableSizes.indexOf(size) >= 0)

        }
    })
}

export const sortProducts = (filteredProducts, sort) => async (dispatch) => {
    const sortedProducts = filteredProducts.slice()
    if (sort === "latest") {
        sortedProducts.sort((a,b)=>(a._id < b._id ? 1 : -1))
    } else {
        sortedProducts.sort((a,b)=>(a.price < b.price ? 1 : -1))
        sort === "lowest" 
            ? sortedProducts.sort((a,b)=>(a.price > b.price 
                ? 1 
                : -1))
            : sortedProducts.sort((a,b)=>(a.price < b.price //means HIGHEST
                ? 1 
                : -1))
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })
}