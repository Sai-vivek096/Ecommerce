import React, { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth, fs } from '../Config/Config';

const Login = ({ open, setOpen, loggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const [login, setLogin] = useState(true);

    useEffect(() => {
        if (loggedIn) {
            setOpen(false);
        }
    }, [loggedIn, setOpen]);

    const handleLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                nav('/');
            })
            .catch(() => {
                alert("Error logging in");
            });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((credentials) => {
                console.log(credentials);
                fs.collection('users').doc(credentials.user.uid).set({
                    Email: email,
                    Password: password,
                })
                    .then(() => {
                        alert("Sign up successful");
                        setEmail('');
                        setPassword('');
                    });
            })
            .catch(() => {
                alert("Error signing up");
            });
    };

    return open ? (
        <div className='overlay'>
            <div className='Login'>
                <div className='left'>
                    <div className='left-container'>
                        <p className='Login-title'>Login</p>
                        <p className='Login-des'>
                            Get access to your Orders, Wishlist and Recommendations
                        </p>
                    </div>
                </div>
                <div className='right'>
                    <input type='email'
                        className='Login-input'
                        placeholder='Enter email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type='password'
                        className='Login-input'
                        placeholder='Enter password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className='termsandcon'>
                        By continuing, you agree to MyBuy's
                        <span style={{ color: "blue" }}>Terms of Use</span> and
                        <span style={{ color: "blue" }}>Privacy Policy</span>
                    </p>
                    {
                        !loggedIn && ( 
                            login ? (
                                <button className='Login-btn' onClick={handleLogin}>Login</button>
                            ) : (
                                <button className='Login-btn' onClick={handleSignup}>SignUp</button>
                            )
                        )
                    }
                    {!loggedIn && ( 
                        <p className='Login-signup' onClick={() => setLogin(!login)}>
                            {login ? 'New to MyBuy? Create an account' : 'Already a user? Login'}
                        </p>
                    )}
                </div>
                <div className='close' onClick={() => setOpen(false)}>
                    <RxCross2 />
                </div>
            </div>
        </div>
    ) : null;
};

export default Login;
