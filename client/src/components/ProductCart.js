import React from "react";
import { Link } from "react-router-dom";
import "../styles/productCart.scss";
import { useDispatch, useSelector } from "react-redux";
import axios, { ImagePath } from "../axios";
import { addToCart } from "../features/cart";
function ProductCart({ product }) {
  const dispatch = useDispatch();
  const addToCarts = async () => {
    try {
      console.log("yes");
      const { _id: id, name, price, imageId, type } = product;
      dispatch(addToCart({ _id: id, name, type, price, imageId, id, quantity: 1 }));
      const { data } = await axios.put(`cart/add-to-cart/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product">
      <div className="product-img">
        <Link to={`/product/${product.name}`}>
          <img src={`${ImagePath + product?.imageId}.jpg`} alt="loading" />{" "}
        </Link>
      </div>
      <div className="product-np">
        <div className="product-n">
          <span className="product-price">${product.price}</span>
          <span className="product-name">{product.name} | 1kg</span>
        </div>
      </div>
      <div className="add-to-cart">
        <button onClick={addToCarts}>Add To Cart</button>
      </div>
    </div>
  );
}

export default ProductCart;
