import React from "react";
import { Link } from "react-router-dom";
import "../styles/productCart.scss";
import { useDispatch, useSelector } from "react-redux";
import axios, { ImagePath } from "../axios";
import { addToCart, changeProductQuantity } from "../features/user";

function ProductCart({ product }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.user.userInfo?.cart);

  const productIns = () => cart.find((item) => item._id === product._id);
  const productIn = productIns();

  const changeQuantity = (quantity, id, price) => {
    try {
      dispatch(changeProductQuantity({ id, quantity, price }));
      const { data } = axios.put(`cart/change-product-quantity/${id}`, { quantity });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCarts = async () => {
    try {
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

      {productIn ? (
        <div className="aq-op change-quantity">
          <button onClick={() => changeQuantity(-0.5, product._id, product.price / 2)}>
            -
          </button>
          <span>{productIn.quantity} kg</span>
          <button onClick={() => changeQuantity(0.5, product._id, product.price / 2)}>
            +
          </button>
       
        </div>
      ) : (
        <div className="aq-op addtocart">
          <button className="addtocart-btn" onClick={addToCarts}>
            Add To Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCart;
