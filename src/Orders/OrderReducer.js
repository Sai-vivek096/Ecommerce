import { PLACE_ORDER, UPDATE_ADDRESS, } from "./OrderActions";


const initialState = {
  address: {
    name: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
  }
};

debugger;
const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
      case PLACE_ORDER:
        return {
          ...state,
          address: action.payload,
        };
    default:
      return state;
  }
};

export default addressReducer;