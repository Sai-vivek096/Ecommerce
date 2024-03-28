import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fs } from '../components/Config/Config';
import { updateAddress } from './OrderActions';

const UpdateAddressForm = ({ address, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(address);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fs.collection('addresses').doc(address.userId).collection('userAddresses').doc(address.id).update(formData);
      console.log("Address updated successfully");
      dispatch(updateAddress(address.id, formData)); 
      onClose(); 
    } catch (error) {
      console.error('Error updating address in Firestore:', error);
    }
  };

  return (
    <div className="address-form-container">
      <div className="address-form-card">
        <h3 className='heading'>Update Address:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          <label htmlFor="addressLine1">Address:</label>
          <input type="text" id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
          <div className="button-container">
            <button type="submit" className="save-address-btn">Update Address</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddressForm;
