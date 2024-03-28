export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const PLACE_ORDER ='PLACE_ORDER';


export const updateAddress = (addressData) => {
  return {
    type: UPDATE_ADDRESS,
    payload: addressData
  };
};

debugger;
export const placeOrder = (addressDetails) => ({
  type: PLACE_ORDER,
  payload: addressDetails,
  
});
