import React from 'react'
import '../Home/Home.css'
import { Link } from 'react-router-dom'
import hero from '../Cart/images/hero.png'
import fashion from '../Cart/images/fashion.png'
import phone from '../Cart/images/phone.png'
const Home = ()=>{
    return (
        <div>
            <Link to='/products/mens-shirts'>
            <div className='phone-container'>
                <div className = 'hero-content'>
                    <h1 className='collection'>New</h1>
                    <h1 className='summer'>SUMMER 2024</h1>
                    <h1 className='collection'>COLLECTION</h1>
                    <h3 className='deal'>DON'T MISS THE DEAL</h3>
                    <p> New Arrivals is a new teenage girls and boys clothing lastest fashion brands is lanched</p>
                    <p>Up to 60% Off + Extra 15% Cashback</p>
                </div>
                <div className='phone-image'>
                <img src={phone} alt='phone'/>
                </div>
            </div>
            </Link>
            <Link to='/products/smartphones'>
            <div className='fashion-container'>
            <div className='fashion-image'>
                <img src={fashion} alt='fashion'/>
                </div>
                <div className = 'hero-content'>
                    <h1 className='iphone'>IPHONE 15 </h1>
                    <h1 className='here'>IS HERE!!!</h1>
                    <h3 className='amount'>Just the right amount of everything</h3>
                    <p className='axis'> Explore All Brand Mobiles Upto 10% off on Axis Bank Credit Card</p>
                </div>
            </div>
            </Link>
            <Link to ='/products/mens-shoes'>
            <div className='hero-container'>
                <div className = 'hero-content'>
                    <h1>YOUR FEET</h1>
                    <h1> DESERVE THE </h1>
                    <h1 className='best'>BEST</h1>
                    <h3 className='feet'> Your FEET Deserve The BEST And We're Here To Help You With Our SHOES.</h3>
                </div>
                <div className='hero-image'>
                <img src={hero} alt='hero'/>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default Home
