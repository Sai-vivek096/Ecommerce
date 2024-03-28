import { LOGIN_USER, LOGOUT_USER } from "./UserDetailsActions";

const initialState = {
  userDetails: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userDetails: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        userDetails: null
      };
    default:
      return state;
  }
};

export default userReducer;


