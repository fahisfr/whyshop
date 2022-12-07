/** @format */

import "../styles/product.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { ImagePath } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { triggerSidePopUp } from "../features/popUpMessage";
import ProductCart from "../components/ProductCart";
import NavBar from "../components/Navbar";
import { addToCart, changeProductQuantity } from "../features/user";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { id: productName } = useParams();
  const [productFetching, setProductFetching] = useState(true);
  const { recommendations } = useSelector((state) => state.home);

  const changeQuantity = async (quantity, id, price) => {
    try {
      const { data } = await axios.put(`cart/change-quantity`, {
        quantity,
        productId: id,
      });
      if (data.status === "ok") {
        dispatch(changeProductQuantity({ id, quantity, price }));
      } else {
        dispatch(triggerSidePopUp({ error: data.error }));
      }
    } catch (error) {
      dispatch(triggerSidePopUp({ error: error.message }));
    }
  };

  const addToCarts = async () => {
    try {
      const { _id: id, name, price, imageId, type } = product;

      const { data } = await axios.put(`cart/add-to-cart/${id}`);

      if (data.status === "ok") {
        dispatch(
          addToCart({ _id: id, name, type, price, imageId, id, quantity: 1 })
        );
      } else {
        dispatch(triggerSidePopUp({ error: data.error }));
      }
    } catch (error) {
      dispatch(triggerSidePopUp({ error: error.message }));
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/product/${productName}`);
      if (data.status === "ok") {
        setProduct(data.product);
        setProductFetching(false);
      }
    };
    getProduct();
    return {};
  }, [productName]);

  const { cart, isAuth } = useSelector((state) => state.user.userInfo);
  const inCart = cart?.find((item) => item._id === product?._id);

  return (
    <div className="product-container">
      <NavBar />
      {productFetching ? (
        <div className="pt">
          <div className="pt-image-wrapper ">
            <div className="pt-img-lt wh-full skeleton"></div>
          </div>
          <div className="pt-details-wrapper">
            <div className="pt-name-ld skeleton"></div>
            <div className="pt-price-ld skeleton"></div>
            <div className="pt-addtocart-ld skeleton"></div>
          </div>
        </div>
      ) : (
        <div className="pt">
          <div className="pt-image-wrapper">
            <img
              className="pt-img"
              src={`${ImagePath + product.imageId}.jpg`}
              alt=""
            />
          </div>

          <div className="pt-details-wrapper">
            <span className="pt-name capitalize">{product.name}</span>
            <span className="pt-price">₹{product.price} </span>
            {isAuth ? (
              inCart ? (
                <div className="pt-quantity">
                  <button
                    onClick={() => {
                      changeQuantity(-0.5, product._id, product.price / 2);
                    }}
                    className="pt-button"
                  >
                    -
                  </button>
                  <span className="pt-quantity">{inCart.quantity}</span>
                  <button
                    onClick={() =>
                      changeQuantity(0.5, product._id, product.price / 2)
                    }
                    className="pt-button"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCarts(product)}
                  className="pt-addtocart"
                >
                  Add to cart
                </button>
              )
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="pt-addtocart"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      )}

      <div className="pt-recommends">
        <div className="pt-title">
          <span>Recommends</span>
        </div>
        <div className="pt-products">
          <div className="pt-products-wrappr">
            {recommendations.result[0]?.products?.map((product) => {
              return <ProductCart product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
