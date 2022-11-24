import "../styles/product.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios, { ImagePath } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, changeProductQuantity } from "../features/user";
import { useNavigate } from "react-router-dom";
import RecommentProduct from "../components/RecommentProducts";

function Product() {
  const dispatch = useDispatch();
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

  function AddTOCart(id, product) {
    const { name, price, imageId, type } = product;
    dispatch(
      addToCart({ _id: id, name, price, imageId, id, quantity: 1, type })
    );
    Axios.put(`cart/add-to-cart/${id}`).then((res) => {});
  }
  const changeQuantity = (quantity, id) => {
    dispatch(changeProductQuantity({ id, quantity }));
    Axios.put(`cart/change-product-quantity/${id}`, { quantity }).then(
      (res) => {}
    );
  };
  return (
    <div className="product-main">
      <div className="show-product-info">
        <div className="show-product-images">
          <img
            src={`${ImagePath + SearchProductInfo.imageId}.jpg`}
            alt="product"
          />
        </div>
        <div className="show-product-details">
          <span className="p-title">{SearchProductInfo.name}</span>
          <span className="p-stock"> In stock</span>
          <span className="p-price">₹{SearchProductInfo.price} Kg</span>
          {inCart ? (
            <div className="p-change-quantity">
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => changeQuantity(-0.5, inCart._id)}
              >
                -
              </button>
              <span className="p-quantity">
                {inCart.quantity} <span className="p-kg"> kg</span>
              </span>
              <button onClick={() => changeQuantity(0.5, inCart._id)}>+</button>
            </div>
          ) : (
            <button
              className="p-button"
              onClick={() =>
                isAuth
                  ? AddTOCart(SearchProductInfo._id, SearchProductInfo)
                  : navigate("/signup")
              }
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
      <RecommentProduct title="People bying" products={products} />
    </div>
  );
}

export default Product;
