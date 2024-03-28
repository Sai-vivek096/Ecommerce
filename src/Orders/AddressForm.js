import './AddressForm.css'
import React, { useEffect, useState } from 'react';
import { auth, fs,  } from '../components/Config/Config'; 
import { Link } from 'react-router-dom';
import { updateAddress } from './OrderActions';
import { useDispatch } from 'react-redux';
import address from '../pages/Cart/images/address.png'


const AddressForm = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    pincode: ''
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) {
      console.error("User not logged in");
      return;
    }

    const address = {
      userId: uid,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2,
      pincode: formData.pincode
    };

    try {
      await fs.collection('addresses').doc(uid).collection('userAddresses').add(address);
      console.log("Address added successfully");
      dispatch(updateAddress(address))
    } catch (error) {
      console.error('Error adding address to Firestore:', error);
    }
  };

  return (
    <div className="address-form-container">
      <img src={address} alt='img' className='addressimg'/>
      <div className="address-form-card">
        <h3 className='heading'>Enter your Details:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder='Enter your name..' name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" placeholder='Enter Number..' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <label htmlFor="addressLine1">Address:</label>
          <input type="text" id="addressLine1" placeholder='Enter your Address..' name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" name="pincode" placeholder='Enter Pincode..' value={formData.pincode} onChange={handleChange} />
          <div className="button-container">
            <button type="submit" className="save-address-btn">Save Address</button>
            <Link to='/checkout'>
              <button type='submit' className="proceed-btn">Back</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
