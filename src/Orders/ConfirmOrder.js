import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import confirm from '../pages/Cart/images/confirm.png'
import { IoIosCloudDone } from 'react-icons/io';
import './ConfirmOrder.css';
import {useNavigate} from 'react-router-dom'
import { fs, auth } from '../components/Config/Config';
import { clearCart } from '../pages/Cart/CardActions';
import { placeOrder } from './OrderActions';

const ConfirmOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const {address} = useSelector((state) => state.address); 
  const dispatch = useDispatch()
  const nav = useNavigate()

  function GetUserUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            }
        })
    },[])
    return uid;
}

  const uid = GetUserUid();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += cartItem.price * cartItem.quantity;
    });
    return total;
  };

  const handleViewOrder = () => {
    if (!address || cartItems.length === 0) {
      console.error('Address is required and cart should not be empty to place an order');
      return;
    }
  
    const orderDetails = {
      items: cartItems,
      address: address,
      totalAmount: calculateTotalAmount(cartItems),
    };
    saveOrderToDatabase(orderDetails)
    .then(() => {
      dispatch(placeOrder(orderDetails));
      const db = fs;
      const snapshot = db.collection('cart').doc(uid).collection('items');
      snapshot.get().then(cartitems => cartitems.forEach(item => item.ref.delete()))
      dispatch(clearCart());
      nav('/view-orders');
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
};

  

  const saveOrderToDatabase = async (orderDetails) => {
    try {
      await fs.collection('orders').doc(uid).collection('userOrders').add(orderDetails);
      console.log('Order placed successfully');
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className='order'>
    <div className="confirm-order-container">
      <h2>Your Order</h2>
      <div className="thank-you">
        <IoIosCloudDone className="cloud-done-icon" />
        <p>Thank you for shopping with us!</p>
      </div>
      <div className="shipping-address">
        <h3>Shipping Address:</h3>
        {address ? (
         
          <div className='content'>
            <p>Name: {address.name}</p>
            <p>Phone: {address.phoneNumber}</p>
            <p>Address: {address.addressLine1}</p>
            <p>Pincode: {address.pincode}</p>
          </div>
        ) : (
          <p>No address found</p>
        )}
      </div>
      <div className="cart-items">
        <h3>Product Details:</h3>
        {cartItems.map((cartItem) => (
          <div key={cartItem.id}>
            <p>
              {cartItem.title} - ${cartItem.price}
            </p>
            <p>
             Quantity: {cartItem.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className="total-amount">
        <h3>Total Amount: ${calculateTotalAmount()}</h3>
      </div><br/>
      <button onClick={handleViewOrder} className='Place-btn'>View Order</button>
    </div>
      <img src={confirm} alt='img' height={550} className='png'/>
    </div>
  );
};

export default ConfirmOrder;
