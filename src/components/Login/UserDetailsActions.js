export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';


export const loginUser = (userDetails) => {
  return {
    type: LOGIN_USER,
    payload: userDetails
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};
