import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../pages/Cart/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import Login from './Login/Login';
import { auth } from './Config/Config';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            nav('/');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    }

    return (
        <div className='navbar-container'>
            <div className='navbar'>
                <Link to='/'>
                    <img src={logo} alt='flipcart-logo' className='navbar-logo' />
                </Link>
                <div className='navbar-search'>
                    <input type='search' placeholder='Search for Products Brands and More...' className='navbar-searchbox' />
                    <button className='searchbtn'><IoSearch /></button>
                    {loggedIn !== null && (loggedIn ? (
                        <>
                            <Link to='/user-details' className='user-email'>
                                <button className='navbar-btnn'>Profile</button>
                                <button className='navbar-btnn' onClick={handleLogout}>LogOut</button>
                            </Link>
                        </>
                    ) : (
                        <button className='navbar-btnn' onClick={() => setOpen(true)}>Login</button>
                    ))}
                    <div className='navbar-bcs'>
                        <button className='navbar-btnn'> <h3>Become a Seller</h3></button>
                    </div>
                    <div className='navbar-more'>
                        <h3>More <i className='moredown'><MdKeyboardArrowDown /></i></h3>
                    </div>
                    <div className='navbar-cart'>
                        <div className='cart-icon'>
                            <FaShoppingCart />
                        </div>
                        <button className='navbar-btnn'> <Link to='/cart' className='cart'><h3>Cart</h3></Link></button>
                    </div>
                </div>
            </div>
            <Login open={open} setOpen={setOpen} loggedIn={loggedIn} />
        </div>
    );
};

export default Navbar;
