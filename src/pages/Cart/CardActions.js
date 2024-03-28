export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'
export const CLEAR_CART = 'CLEAR_CART';


export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    ...product
  },
});

export const removeFromCart = (id) => ({
  type : REMOVE_FROM_CART,
  payload: id,
})

export const incrementQuantity = (id) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: id
  };
};

export const decrementQuantity = (id) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: id
  };
};

export const updateCartItems = (items) => ({
  type: UPDATE_CART_ITEMS,
  payload: items,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});