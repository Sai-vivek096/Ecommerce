import React, { useState, useEffect } from 'react';
import { auth, fs } from '../../components/Config/Config';
import { useDispatch} from 'react-redux';
import { placeOrder } from '../../Orders/OrderActions';
import { Link } from 'react-router-dom';
import AddressDetail from './images/AddressDetail.png';
import UpdateAddressForm from '../../Orders/UpdateAddressForm';
import ConfirmOrder from '../../Orders/ConfirmOrder';
import './Checkout.css'

const AddressSelection = ({cartItems}) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (auth.currentUser) { 
          const snapshot = await fs.collection('addresses').doc(auth.currentUser.uid).collection('userAddresses').get();
          const addressesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAddresses(addressesData);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleEditAddress = (address) => {
    setEditAddress(address);
  };

  const handleCloseEdit = () => {
    setEditAddress(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const orderDetails = {
      address: selectedAddress,
    };
    dispatch(placeOrder(orderDetails.address));
    try {
      const db = fs;
      const batch = db.batch(); 
      for (const cartItem of cartItems) {
        try {
          const productSnapshot = await db.collection('products').where('title', '==', cartItem.title).get();
          if (productSnapshot.empty) {
            console.error(`Product with title "${cartItem.title}" not found in Firestore`);
            continue; 
          }
          productSnapshot.forEach((doc) => {
            const productRef = db.collection('products').doc(doc.id);
            const productData = doc.data();
            const updatedStock = productData.stock - cartItem.quantity;
            if (updatedStock < 0) {
              console.error(`Insufficient stock for product with title "${cartItem.title}"`);
              return; 
            }
            batch.update(productRef, { stock: updatedStock });
            console.log(`Stock quantity updated for product "${cartItem.title}"`);
          });
        } catch (error) {
          console.error(`Error updating stock for product "${cartItem.title}":`, error);
        }
      }
      await batch.commit();
      console.log('Stock quantities updated successfully');
    } catch (error) {
      console.error('Error updating stock quantities:', error);
    }
    

  }

  return (
    <div className="container">
      {!submitted ? (
        <>
          <form onSubmit={handleSubmit} className="address-card">
            <div className='btn-add'>
              <h3 className='h3s'>Select Your Address:</h3>
              <Link to='/address'><button className='Place-btnn'>New Address</button></Link>
            </div>
            <div className="address-selection-box">
              {addresses.map((address, index) => (
                <div key={index} className="address-item">
                  <input type="radio" checked={selectedAddress && selectedAddress.id === address.id} onChange={() => handleAddressSelect(address)} />
                  <p>Name: {address.name}</p>
                  <p>Address: {address.addressLine1}</p>
                  <p>Phone: {address.phoneNumber}</p>
                  <p>Pincode: {address.pincode}</p>
                  <button type="button" className='edit' onClick={() => handleEditAddress(address)}>Edit</button>
                </div>
              ))}
            </div>
            {selectedAddress ? (
              <button type="submit" className='Place-btn'>Place Your Order</button>
            ) : null}
          </form>
          <div className='upadd'>
            {editAddress && <UpdateAddressForm address={editAddress} onClose={handleCloseEdit} />}
          </div>
          <img src={AddressDetail} alt='img' height={550} className='addimg' />
        </>
      ) : (
        <ConfirmOrder />
      )}
    </div>
  );
};

export default AddressSelection;
