import { combineReducers } from "redux";
import productReducer from "./ProductReducers";
import cartReducer from "../Cart/CardReducer";
import addressReducer from "../../Orders/OrderReducer";
import userReducer from "../../components/Login/UserDetailsReducers";

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    address: addressReducer,
    user: userReducer,
})

export default rootReducer