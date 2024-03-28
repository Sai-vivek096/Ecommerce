import { FETCH_SINGLE_PRODUCTS_FAILURE, 
    FETCH_SINGLE_PRODUCTS_REQUEST, 
    FETCH_SINGLE_PRODUCTS_SUCCESS 
} from '../ProductDetails/ProductDetailsAction'
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
  } from './ProductActions'

const initialState = {
    products: [],
    singleProduct: null,
    loading: false,
    error: null,
}



const productReducer = (state=initialState, action)=>{
    switch (action.type){
        case FETCH_PRODUCTS_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_PRODUCTS_SUCCESS:
            return{
                ...state,
                loading: false,
                products: action.payload.products,
                error: ''
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading:false,
                products: [],
                error: action.payload
            }
        case FETCH_SINGLE_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_SINGLE_PRODUCTS_SUCCESS :
            return {
                ...state,
                loading: false, 
                singleProduct: action.payload,
            }
        case FETCH_SINGLE_PRODUCTS_FAILURE:
            return{
                ...state,
                loading:false,
                singleProduct:null,
                error:action.payload,
            }
        default:
            return state;
    }
}

export default productReducer