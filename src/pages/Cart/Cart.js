import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity, updateCartItems } from './CardActions';
import '../Cart/Cart.css';
import { auth, fs } from '../../components/Config/Config';
import Checkout from './Checkout'

const Cart = () => { 
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [proceedToCheckout, setProceedToCheckout] = useState(false);
  console.log(cartItems);
  
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

  useEffect(() => {
    const fetchCartItems = async () => {
      debugger;
      if (!uid) {
        console.error('User ID is not available');
        return; 
      }
      const db = fs;
      const cartItemsRef = db.collection('cart').doc(uid).collection('items');
      try {
        const snapshot = await cartItemsRef.get();
        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
          };
        });
        console.log(items)
        dispatch(updateCartItems(items)); 
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchCartItems();
  }, [dispatch, uid]);
  
  const handleRemoveFromCart = async (itemId) => {
    debugger
    if (!uid) {
      console.error('User ID is not available');
      return; 
    }
    const db = fs;
    try {
      await db.collection('cart').doc(uid).collection('items').doc(itemId).delete();
      console.log('Item removed from cart successfully');
      dispatch(removeFromCart(itemId))
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };
  
  const handleDecrement = (id) => {
      dispatch(decrementQuantity(id));
  };
  const handleProceedToCheckout = () => {
    setProceedToCheckout(true);
  };
console.log(cartItems);
  return (
    <div className='contain'>
    <div className='Cart-items'>
      <div className='Cart-container'>
        {proceedToCheckout ? (
          <Checkout/>
        ) : (
            <div className='Cart-content'>
          <div>
              {cartItems.length > 0 ? (
                <div>
                  {cartItems.map((cartItem, index) => (
                    <div key={index} className='Cart-item'>
                      <div className='Cart-item--left'>
                        <img src={cartItem.thumbnail} alt='img' />
                      </div>
                      <div className='Cart-item--right'>
                        <div className='cart-detail'>
                        <h3>Name: {cartItem.title}</h3>
                        <p>Description: {cartItem.description}</p>
                        <p>Discount %: {cartItem.discountPercentage}</p>
                        <p>Brand: @{cartItem.brand}</p>
                        <p>Price: ${cartItem.price}</p></div>
                        <div className="quantity-controls">
                          <button className="quantity-control" onClick={() => handleDecrement(cartItem.id)}>-</button>
                          <span className="quantity">{cartItem.quantity}</span>
                          <button className="quantity-control" onClick={() => handleIncrement(cartItem.id)}>+</button>
                       </div>
                        <button
                          type='button'
                          className='Cart-item-button'
                          onClick={() => handleRemoveFromCart(cartItem.id)}>
                          Remove From Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='empty'>Cart is empty</p>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className='Cart-sidebar'>
                <div className='Cart-subtotal'>
                  <h3 className='total'>Subtotal</h3><br/>
                  <h4>Total Amount ${calculateSubtotal()}</h4>
                </div>
                <button type='button' className='check' onClick={handleProceedToCheckout}>
                  Proceed To CheckOut
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Cart;
