/** @format */

import "../styles/cart.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  changeProductQuantity,
  removeAllProducts,
} from "../features/user";
import axios, { ImagePath } from "../axios";
import { BiCart } from "react-icons/bi";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading } = useSelector((state) => state.user);
  const { cart } = userInfo;
  const total = cart.reduce((prev, cur) => {
    return prev + cur.price;
  }, 0);

  const changeQuantity = (quantity, id, price) => {
    try {
      dispatch(changeProductQuantity({ id, quantity, price }));
      const { data } = axios.put(`cart/change-quantity`, {
        quantity,
        productId: id,
      });
      console.log(quantity, id);
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartProduct = (id) => {
    dispatch(removeFromCart(id));
    axios.put("cart/remove-product/" + id, { id: id });
  };

  const remoeAll = async () => {
    dispatch(removeAllProducts());
    const { data } = await axios.delete("/cart/remove-all-products");
  };

  if (loading) {
    return (
      <div className="cart-container  ">
        <div className="cart  sb-padding-border">
          <div className="cart-top sb-bottom-pb">
            <div className="cart-title">
              <span className="title-text">Shopping Cart</span>
            </div>
          </div>
          <div className="overflow-scroll-d-h">
            {new Array(6).fill(0).map((item, index) => {
              return <div key={index} className="skeleton-item  skeleton"></div>;
            })}
          </div>
        </div>
        <div className="billing">
          <div className="bg-wrap sb-padding-border">
            <div className="bg-top sb-bottom-pb title-text">billing</div>
            <div className="bg-body-ld skeleton "></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart?.length > 0) {
    return (
      <div className="cart-is-empty">
        <BiCart size={48} />
        <span>Cart Is Empty</span>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart sb-padding-border">
        <div className="cart-top sb-bottom-pb">
          <div className="cart-title">
            <span className="title-text">Shopping Cart</span>
          </div>
          <div className="cart-top-right">
            <button onClick={remoeAll}>Remove All</button>
          </div>
        </div>
        <div className="cart-body">
          {cart.map((product) => {
            return (
              <div className="cart-product">
                <div className="product-image">
                  <img
                    src={ImagePath + product.imageId + ".jpg"}
                    alt="loading"
                  />
                </div>
                <div className="product-name capitalize">
                  <span>{product.name}</span>
                </div>
                <div className="product-quantity">
                  <button
                    onClick={() => {
                      changeQuantity(-0.5, product._id, product.price / 2);
                    }}
                  >
                    -
                  </button>
                  <span>
                    {product.quantity} <small>kg</small>
                  </span>
                  <button
                    onClick={() =>
                      changeQuantity(0.5, product._id, product.price / 2)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="product-total-r">
                  <span>₹{product.price * product.quantity}</span>
                  <button
                    onClick={() => {
                      removeCartProduct(product._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="billing">
        <div className="bg-wrap sb-padding-border">
          <div className="bg-top sb-bottom-pb title-text">billing</div>
          <div className="bg-body">
            <div className="bg-group">
              <span className="font-size-md">Products Total </span>
              <span>₹{total}</span>
            </div>
            <div className="bg-group">
              <span className="font-size-md">Delivery Fee</span>
              <span className="free">Free</span>
            </div>
          </div>
          <div className="bg-bottom">
            <div className="bg-group">
              <span className="font-size-md">Total Price</span>
              <span>₹{total}</span>
            </div>
            <div className="btn-de">
              <button onClick={() => navigate("/checkout")}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
