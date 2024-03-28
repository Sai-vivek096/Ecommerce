import React, { useEffect, useState } from 'react';
import './Products.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductDetailCard from '../ProductDetails/ProductDetailsCard';
import { fetchProducts } from '../Store/ProductActions';

const Products = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    if (params.category) {
      dispatch(fetchProducts(params.category));
    }
  }, [dispatch, params.category]);

  useEffect(() => {
    setFilteredProducts(products);
    const uniqueBrands = Array.from(new Set(products.map(product => product.brand)));
    setBrands(uniqueBrands);
    const prices = products.map(product => product.price);
    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));
  }, [products]);

  const handleSortByPrice = (sortBy) => {
    let sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      if (sortBy === 'lowToHigh') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  const handleFilterByBrand = (brand) => {
    setSelectedBrand(brand);
    const filteredByBrand = products.filter((product) =>
      product.brand.toLowerCase().includes(brand.toLowerCase())
    );
    setFilteredProducts(filteredByBrand);
  };

  const handleFilterByRating = (rating) => {
    setSelectedRating(rating);
    const filteredByRating = products.filter((product) => product.rating >= rating);
    setFilteredProducts(filteredByRating);
  };

  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedRating(0);
    setFilteredProducts(products);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="Products">
      <div className="Products-Filters">
        <p className="filter-head">Filters</p>
        <div className="category">
          <p className="filter-categoryHead">Rating</p>
          <select value={selectedRating} onChange={(e) => handleFilterByRating(Number(e.target.value))}>
            <option value={0}>Select Rating</option>
            <option value={5}>5 stars</option>
            <option value={4}>4 stars & above</option>
            <option value={3}>3 stars & above</option>
            <option value={2}>2 stars & above</option>
            <option value={1}>1 star & above</option>
          </select>
        </div>
        <div className="Price">
          <p className="priceHead">Price</p>
          <select value={`${minPrice}-${maxPrice}`} onChange={(e) => handleSortByPrice(e.target.value)}>
            <option value={`${minPrice}-${maxPrice}`}>Price Range</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        <div className="brand">
          <p>Brand</p>
          <select value={selectedBrand} onChange={(e) => handleFilterByBrand(e.target.value)}>
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>
      <div className="Products-items">
        <p className="totalresults">Showing 1-{filteredProducts.length} of {filteredProducts.length} results</p>
        <div className="">
          {filteredProducts.map((product, index) => (
            <Link key={index} to={`/product-details/${product.id}`}>
              <ProductDetailCard products={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
