import axios from 'axios';

export const FETCH_SINGLE_PRODUCTS_REQUEST = 'FETCH_SINGLE_PRODUCTS_REQUEST';
export const FETCH_SINGLE_PRODUCTS_SUCCESS = 'FETCH_SINGLE_PRODUCTS_SUCCESS';
export const FETCH_SINGLE_PRODUCTS_FAILURE = 'FETCH_SINGLE_PRODUCTS_FAILURE';


const fetchSingleProductsRequest = () => ({
    type: FETCH_SINGLE_PRODUCTS_REQUEST,
  });
  
  const fetchSingleProductsSuccess = (products) => ({
    type: FETCH_SINGLE_PRODUCTS_SUCCESS,
    payload: products,
  });
  
  const fetchSingleProductsFailure = (error) => ({
    type: FETCH_SINGLE_PRODUCTS_FAILURE,
    payload: error,
  });

  
export const fetchSingleProducts = (id) => {
    return (dispatch) => {
      dispatch(fetchSingleProductsRequest());
      debugger;
      axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          dispatch(fetchSingleProductsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchSingleProductsFailure(error.message));
        });
    };
  };