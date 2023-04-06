import React from "react";
import { Link } from "react-router-dom";
import "./product.scss";
import { useSelector } from "react-redux";
import { ImagePath } from "../../helper/axios";
import { IProduct } from "../../helper/interfaces";
import { RootState } from "../../features/store";
import {
  useAddToCart,
  useChangeProductQuantity,
} from "../../hooks/useCartActions";

export default function ProductCart({ product }: { product: IProduct }) {
  const { isLoading, addToCart } = useAddToCart();
  const { changeProductQuantity } = useChangeProductQuantity();
  const cart = useSelector((state: RootState) => state.user.cart);
  const productIn = cart.find((item) => product._id === item._id);

  return (
    <div className="product-cart">
      <div className="product-img">
        <Link to={`/product/${product.name}`}>
          <img src={`${ImagePath + product?.imageName}`} alt="" />
        </Link>
      </div>

      <div className=" relative ">
        <div className="product-details">
          <span className="product-price">${product.price}</span>
          <span className="product-name">{product.name} </span>
        </div>
        {productIn ? (
          <div className="change-quantity aq-op">
            <button
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
            <span>{productIn.selectedQuantity}</span>
            <button
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
        ) : (
          <div className={`aq-op ${isLoading ? "btn-loading" : ""}`}>
            <button
              className="add-to-cart-btn btn"
              onClick={() => {
                addToCart(product);
              }}
            >
              <span className="btn-text">Add To Cart</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function SkeletonProductCart() {
  return (
    <div className="product-ld ">
      <div className="product-top-ld skeleton"></div>
      <div className="product-bottom-ld  skeleton"></div>
    </div>
  );
}
