import "../styles/cart.css";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImagePath } from "../helper/axios";
import {
  useChangeProductQuantity,
  useRemoveAllProductsFromCart,
  useRemoveProductFromCart,
} from "../hooks/useCartActions";

import { RootState } from "../features/store";
import { BiCart } from "react-icons/bi";
import ErrorHandler from "../components/ErrorHandler";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, isLoading, isError, error } = useSelector(
    (state: RootState) => state.user
  );
  const total = cart.reduce(
    (prev, cur) => prev + cur.price * cur.selectedQuantity,
    0
  );

  const { removeAllProductsFromCart } = useRemoveAllProductsFromCart();
  const { changeProductQuantity } = useChangeProductQuantity();
  const { removeProductFromCart } = useRemoveProductFromCart();

  if (isLoading) {
    return <CartSkeletonLoading />;
  }

  if (isError) {
    return <ErrorHandler error={error} />;
  }
  return (
    <div className="cart-container">
      <div className="cart sb-padding-border">
        <div className="cart-header sb-bottom-pb">
          <div className="cart-title">
            <span className="title-text">Shopping Cart</span>
          </div>
          <div className="cart-header-right">
            <button
              className="remove-all-btn"
              onClick={removeAllProductsFromCart}
            >
              Remove All
            </button>
          </div>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <BiCart className="ct-icon" />
              <span className="ct-text">Cart Is Empty</span>
            </div>
          ) : (
            cart.map((product, index: number) => {
              return (
                <div className="cart-product" key={index}>
                  <div className="product-image-wrapper">
                    <img
                      src={ImagePath + product.imageName}
                      className="product-image"
                      alt="loading"
                    />
                  </div>
                  <div className="product-name ">
                    <span>{product.name}</span>
                  </div>
                  <div className="product-quantity-controls">
                    <button
                      className="product-quantity-button"
                      onClick={() => {
                        changeProductQuantity({
                          productId: product._id,
                          quantity: -0.5,
                          price: product.price / 2,
                        });
                      }}
                    >
                      -
                    </button>
                    <span className="product-quantity-display">
                      {product.selectedQuantity}
                    </span>
                    <button
                      className="product-quantity-button"
                      onClick={() =>
                        changeProductQuantity({
                          productId: product._id,
                          quantity: 0.5,
                          price: product.price / 2,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="product-total-wrapper">
                    <span>₹{product.price * product.selectedQuantity}</span>
                  </div>
                  <div className="product-remove">
                    <button
                      className="product-remove-btn"
                      onClick={() => removeProductFromCart(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="billing">
        <div className="billing-wrapper sb-padding-border">
          <div className="billing-header sb-bottom-pb title-text">Billing</div>
          <div className="billing-body">
            <div className="billing-group">
              <span>Products Total </span>
              <span>₹{total}</span>
            </div>
            <div className="billing-group">
              <span>Delivery Fee</span>
              <span className="free">Free</span>
            </div>{" "}
            <div className="billing-group">
              <span>Total Price</span>
              <span>₹{total}</span>
            </div>
          </div>
          <div>
            <div className="place-order-wrapper">
              <button
                className="place-order-btn"
                onClick={() => navigate("/checkout")}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartSkeletonLoading() {
  return (
    <div className="cart-container">
      <div className="cart sb-padding-border">
        <div className="cart-header sb-bottom-pb">
          <div className=" w-36 h-8 skeleton"></div>
          <div className="w-24 rounded h-8 skeleton"></div>
        </div>
        <div className="flex h-full overflow-auto flex-col gap-4 pt-4">
          {new Array(5).fill(1).map((value, index) => {
            return <div key={index} className="w-full  h-20 skeleton"></div>;
          })}
        </div>
      </div>

      <div className="billing">
        <div className="billing-wrapper sb-padding-border">
          <div className="billing-header sb-bottom-pb ">
            <div className=" w-36 h-8 skeleton"></div>
          </div>
          <div className="billing-body">
            {new Array(3).fill(1).map((value, index) => {
              return <div key={index} className="h-10 w-full skeleton"></div>;
            })}
          </div>
          <div>
            <div className="h-10 w-full skeleton  rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
