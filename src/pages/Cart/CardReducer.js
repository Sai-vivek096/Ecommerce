import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QUANTITY, DECREMENT_QUANTITY, UPDATE_CART_ITEMS, CLEAR_CART } from './CardActions';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case DECREMENT_QUANTITY:
    return {
      ...state,
      cartItems: state.cartItems.map(item =>
        item.id === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      ),
    };
      case UPDATE_CART_ITEMS:
        return {
          ...state,
          cartItems: action.payload, 
        };
        case CLEAR_CART:
          return {
            ...state,
            cartItems: [],
          };
    default:
      return state;
  }
};

export default cartReducer;
