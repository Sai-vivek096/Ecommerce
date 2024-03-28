import React, { useEffect, useState } from 'react';
import '../ProductDetails/ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import { AiFillStar, AiFillThunderbolt } from "react-icons/ai";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchSingleProducts } from './ProductDetailsAction';
import { addToCart } from '../Cart/CardActions';
import { auth, fs } from '../../components/Config/Config';

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [imageId, setImageId] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { singleProduct} = useSelector((state) => state.products);
  const [loggedIn, setLoggedIn] = useState(false); 
  const nav = useNavigate()
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [redirectPath, setRedirectPath] = useState('/');


  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        nav(redirectPath || '/');
      })
      .catch(() => {
        alert("Error logging in");
      });
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSingleProducts(`${params.id}`));
    }
  }, [dispatch, params.id]);

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

  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();

  useEffect(() => {
    const checkIfProductIsInCart = async () => {
      const db = fs;
      try {
        const cartSnapshot = await db.collection('cart').doc(uid).collection('items').where('id', '==', singleProduct.id).get();
        if (!cartSnapshot.empty) {
          setCartItems(prevItems => [...prevItems, singleProduct.id]);
        }
      } catch (error) {
        console.error('Error checking if product is in cart:', error);
      }
    };

    if (uid && singleProduct) {
      checkIfProductIsInCart();
    }
  }, [uid, singleProduct]);

  const addCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      setRedirectPath('/product-details/:id');
      handleLogin(); 
      return;
    }
    if (!cartItems.includes(singleProduct.id)) {
      const db = fs;
      try {
        await db.collection('cart').doc(uid).collection('items').add({
          ...singleProduct,
          quantity: 1
        });
        dispatch(addToCart({ ...singleProduct, quantity: 1 }));
        setCartItems(prevItems => [...prevItems, singleProduct.id]);
      } catch (error) {
        console.error('Error adding product to Firestore:', error);
      }
    } else {
      alert("Already added to cart");
    }
  };

  const handleBuyNow = () => {
    const user = auth.currentUser;
    if (!user) {
      setRedirectPath('/');
      handleLogin(); 
      return;
    }
    if (!cartItems.includes(singleProduct.id)) {
      dispatch(addToCart({ ...singleProduct, quantity: 1 }));
      setCartItems(prevItems => [...prevItems, singleProduct.id]);
    } else {
      alert("Already added to cart");
    }
  };

  return singleProduct ? (
    <div className="ProductDetails">
      <div className="ProductDetails-left">
        <div className="otherImgs">
          {singleProduct.images.length > 0 && singleProduct.images.map((img, i) =>
              <img src={img} onClick={()=> setImageId(i)} alt="" className="proimg" key={i} />
          )}
        </div>
        <div className="ProductDetail-Img">
          <img src={singleProduct.images[imageId]} alt="" />
          <div className="ProductDetail-btns">
            {!cartItems.includes(singleProduct.id) ? (
              <button className="ProductDetail-btn" onClick={addCart}>
                <FaShoppingCart /> Add to Cart
              </button>
            ) : (
                <button className="ProductDetail-btn" disabled>
                  Already in Cart
                </button>
              )}
           {loggedIn ? (
              <Link to='/checkout'>
                <button className="ProductDetail-btn" onClick={handleBuyNow}>Buy Now <AiFillThunderbolt /></button>
              </Link>
            ) : (
              <button className="ProductDetail-btn" onClick={handleLogin}>Buy Now <AiFillThunderbolt /></button>
            )}
          </div>
        </div>
      </div>

      <div className="ProductDetails-right">
        <p className="ProductName">{singleProduct.title}</p>
        <div className="ratingsreviews">
          <div className="stars">
            {singleProduct.rating} <AiFillStar />
          </div>
          <div className="ratings">
            {singleProduct.rating} Reviews
          </div>
          <img src="" alt="" />
        </div>
        <p className="price">₹{singleProduct.price}</p>
        <p className="packfee">+ ₹69 Secured Packing Fee </p>
        <p className="availableoff">Available offers</p>
        <li className="offers">
          <img
            src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
            alt=""
            height={20}
          />
          <b>Bank Offer </b>5% Cashback on Flipkart Axis Bank CardT&C
        </li>
        <li className="offers">
          <img
            src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
            alt=""
            height={20}
          />
          <b>Partner Offer </b> Purchase now & get a surprise cashback coupon
          for January / February 2023Know More
        </li>
        <li className="offers">
          <img
            src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
            alt=""
            height={20}
          />
          <b>Partner Offer </b> Sign up for Flipkart Pay Later and get Flipkart
          Gift Card worth up to ₹500*Know More
        </li>
        <li className="offers">
          <img
            src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/49f16fff-0a9d-48bf-a6e6-5980c9852f11.png?q=90"
            alt=""
            height={20}
          />
          <b> EMI starting </b> from ₹832/monthView Plans
        </li>

        <div className="descriptions">
          <div className="colors">
            <p className="color">Color</p>
            <div className="colorimgs">
              <img src={singleProduct.thumbnail} alt="" />
              <img src={singleProduct.thumbnail} alt="" />
              <img src={singleProduct.thumbnail} alt="" />
            </div>
          </div>
          <div className="highlights">
            <p className="highlight-title">Highlights</p>
            <div className="highlight">
              <li className="highlight-item">{singleProduct.description}</li>
              <li className="highlight-item">{singleProduct.discountPercentage}%</li>
            </div>
          </div>
        </div>

        <div className="RatingsAndReviews">
          <p className="RatingsAndReviews-title">Ratings & Reviews</p>
          <div className="RatingsAndReviews-container">
            <div className="RatingsAndReviews-stars">
              <p className="RatingsAndReviews-reviews">
                {singleProduct.rating} <AiFillStar />
              </p>
              <p className="RatingsAndReviews-ratings">
                {singleProduct.rating} Ratings & Reviews
              </p>
            </div>
            <div className="RatingsAndReviews-charts">
              <li>
                <p className="star">5</p>
                <div className="bar">
                  <div className="innerbar" style={{ width: "80%" }}></div>
                </div>
              </li>
              <li>
                <p className="star">4</p>
                <div className="bar">
                  <div className="innerbar" style={{ width: "50%" }}></div>
                </div>
              </li>
              <li>
                <p className="star">3</p>
                <div className="bar">
                  <div className="innerbar" style={{ width: "33.6%" }}></div>
                </div>
              </li>
              <li>
                <p className="star">2</p>
                <div className="bar">
                  <div className="innerbar" style={{ width: "29.6%" }}></div>
                </div>
              </li>
              <li>
                <p className="star">1</p>
                <div className="bar">
                  <div className="innerbar" style={{ width: "10%" }}></div>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : 'There is no product available with the given id';
};

export default ProductDetails;