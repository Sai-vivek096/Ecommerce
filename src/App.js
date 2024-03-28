import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './pages/Home/Home';
import Products from './pages/products/Products';
import Cart from './pages/Cart/Cart';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './pages/Store/store';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import UserDetails from './components/Login/UserDetails';
import Checkout from './pages/Cart/Checkout';
import AddressForm from './Orders/AddressForm';
import ConfirmOrder from './Orders/ConfirmOrder';
import ViewOrders from './Orders/ViewOrders';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/user-details' element={<UserDetails />}/>
          <Route path='/products/:category' element={<Products/>}/>
          <Route path='/product-details/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/address' element={<AddressForm/>}/>
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/confirm-order" element={<ConfirmOrder/>} />
          <Route path='/view-orders' element={<ViewOrders/>}/>
        </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
