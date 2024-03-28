import React from "react";
import './ProductDetailsCard.css';
const ProductDetailCard = ({ products }) => {
  return (
    <div className="ProductDetailCard">
      <div className="ProductDetailCard-Img">
        <img src={products.thumbnail} alt="img" />
      </div>
      <div className="ProductDetailCard-details">
        <p className="ProductDetailCard-name">{products.title}</p>
        <div className="ratingsAndreviews">
          <div className="stars">{products.rating} ◈</div>
          <p className="ratings">
            {products.rating} Ratings &  Reviews
          </p>
        </div>
        <div className="ProductDetailCard-Productdetails">
          <li className="ProductDetailCard-detail">${products.price}</li>
          <li className="ProductDetailCard-detail">{products.brand}</li>
          <li className="ProductDetailCard-detail">%{products.discountPercentage}</li>
          <li className="ProductDetailCard-detail">{products.Proccessor}</li>
        </div>
      </div>

      <div className="ProductDetailCard-PriceandDelivery">
        <div className="pricecontainer">
          <p className="ProductDetailCard-price">{products.Sellingprice}</p>
          <img
            src="https://t4.ftcdn.net/jpg/04/77/40/89/240_F_477408960_bZBlon7D2wMSheS8ktw8O8pYyCCgSZVp.jpg"
            height={130}
            alt=""
          />
        </div>
        <p className="freedel">Free delivery</p>
        <p className="discount">
          Upto <b>17,500</b> off on Exchange No Cost EMI from 23,317/month
        </p>
      </div>
    </div>
  );
};

export default ProductDetailCard;