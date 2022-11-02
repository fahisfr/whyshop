import React, { useEffect } from "react";
import "../styles/cart.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart, changeProductQuantity } from "../features/cart";
import Axios, { ImagePath } from "../axios";
import { BiCart } from "react-icons/bi";
import Navbar from "../components/NavBar";

function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  const { cartInfo, total } = useSelector((state) => state.cart);
  const changeQuantity = (quantity, id, price) => {
    try {
      dispatch(changeProductQuantity({ id, quantity, price }));
      Axios.put(`cart/change-product-quantity/${id}`, { quantity }).then((res) => {
        if (res.data.status) {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartProduct = (id) => {
    dispatch(removeFromCart(id));
    Axios.put("cart/remove-product/" + id, { id: id });
  };

  if (!cartInfo?.length > 0) {
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
            <span>Shopping Cart</span>
          </div>
          <div className="cart-top-right">
            <span>Remove All</span>
          </div>
        </div>
        <div className="cart-body">
          {cartInfo.map((product) => {
            return (
              <div className="cart-product">
                <div className="product-image">
                  <img src={ImagePath + product.imageId + ".jpg"} alt="loading" />
                </div>
                <div className="product-name capitalize">
                  <span>{product.name}</span>
                </div>
                <div className="product-quantity">
                  <button onClick={() => changeQuantity(-0.5, product._id, product.price / 2)}>
                    -
                  </button>
                  <span>
                    {product.quantity} <small>kg</small>
                  </span>
                  <button onClick={() => changeQuantity(0.5, product._id, product.price / 2)}>
                    +
                  </button>
                </div>
                <div className="product-total-r">
                  <span>₹{product.total}</span>
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
      <div className="billing sb-padding-border">
        <div className="billing-top sb-bottom-pb">Billing</div>
        <div className="billing-body">
          <div className="billing-group">
            <span>Products Total </span>
            <span>₹{total}</span>
          </div>{" "}
          <div className="billing-group">
            <span>Delivery Fee</span>
            <span className="free">Free</span>
          </div>
        </div>
        <div className="billing-bottom">
          <div className="billing-group">
            <span>Total Price</span>
            <span>₹{total}</span>
          </div>
          <div className="btn-de">
            <button>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
