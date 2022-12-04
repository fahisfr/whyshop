/** @format */

import "../styles/product.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { ImagePath } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductCart from "../components/ProductCart";
import NavBar from "../components/Navbar";
function Product() {
  const navigate = useNavigate();
  const [SearchProductInfo, setSearchProduct] = useState({});
  const { id: productName } = useParams();
  const { products } = useSelector((sate) => sate.products);

  useEffect(() => {
    const findProduct = products.find((item) => item.name === productName);
    findProduct ? setSearchProduct(findProduct) : navigate("/");
  }, [productName]);

  const cart = useSelector((state) => state.user.userInfo?.cart);
  const { isAuth } = useSelector((sate) => sate.user);
  const inCart = cart.find((item) => item._id === SearchProductInfo._id);

  return (
    <div className="product-container">
      <NavBar />
      <div className="pt-details">
        <img src={`${ImagePath + SearchProductInfo.imageId}.jpg`} alt="" />{" "}
        <div className="pt-details-wrapper">
          <span className="pt-name capitalize">{SearchProductInfo.name}</span>
          <span className="pt-price">₹{SearchProductInfo.price} </span>
          {inCart ? (
            <div className="pt-quantity">
              <button className="pt-button">-</button>
              <span className="pt-quantity">{inCart.quantity}kg</span>
              <button className="pt-button">+</button>
            </div>
          ) : (
            <button className="pt-addtocart">Add to cart</button>
          )}
        </div>
      </div>
      <div className="pt-recommends">
        <div className="pt-title">
          <span>Related Products</span>
        </div>
        <div className="pt-products">
          {products.map((product) => {
            return <ProductCart product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Product;
