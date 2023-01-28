import React from "react";
import { Link } from "react-router-dom";
import "../styles/productCart.scss";
import { useDispatch, useSelector } from "react-redux";
import axios, { ImagePath } from "../axios";
import { addToCart, changeProductQuantity } from "../features/user";
import { triggerSidePopUp } from "../features/popUpMessage";

function ProductCart({ product }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.user.userInfo?.cart);

  const productIns = () => cart.find((item) => item._id === product._id);
  const productIn = productIns();

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
    const { _id: id, name, price, imageId, type } = product;

    const { data } = await axios.put(`cart/add-to-cart/${id}`);
    console.log(data);
    if (data.status === "ok") {
      dispatch(
        addToCart({ _id: id, name, type, price, imageId, id, quantity: 1 })
      );
    } else if (data.status === "error") {
      dispatch(triggerSidePopUp({ error: data.error }));
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
          <button
            onClick={() => changeQuantity(-0.5, product._id, product.price / 2)}
          >
            -
          </button>
          <span>{productIn.quantity} kg</span>
          <button
            onClick={() => changeQuantity(0.5, product._id, product.price / 2)}
          >
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

function SkeletonProductCart() {
  return (
    <div className="product-ld ">
      <div className="product-top-ld skeleton"></div>
      <div className="product-bottom-ld  skeleton"></div>
    </div>
  );
}
export default ProductCart;
export { SkeletonProductCart };
