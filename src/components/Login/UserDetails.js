import React, { useEffect, useState } from 'react'
import './UserDetails.css'
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './UserDetailsActions';
import { auth } from '../Config/Config';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserDetails(user)
                dispatch(loginUser(user))
            } else {
                setUserDetails(null)
                dispatch(logoutUser())
            }
        })

        return () => {
            unsubscribe()
        }
    }, [dispatch])

  return (
    <div className='user-details'>
      <p> Email : {userDetails && userDetails.email}</p>
      <p> uid : {userDetails && userDetails.uid}</p>
    </div>
  )
}

export default UserDetails
