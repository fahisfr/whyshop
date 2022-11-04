import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/shop.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Axios, { ImagePath } from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { changeProductQuantity, addToCart, removeFromCart } from "../features/user";
import ProductCart from "../components/ProductCart";

function Products() {
  const { id } = useParams();
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();
  const { cartInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    Axios.get("/shop/" + id).then((result) => {
      if (result.data.product) {
        setproducts(result.data.product);
      }
    });
  }, [id]);

  const changeQuantity = (quantity, id) => {
    dispatch(changeProductQuantity({ id, quantity }));
    Axios.put(`cart/change-product-quantity/${id}`, { quantity });
  };
  function AddTOCart(id, product) {
    const { name, price, imageId, type } = product;
    dispatch(addToCart({ _id: id, name, type, price, imageId, id, quantity: 1 }));
    Axios.put(`cart/add-to-cart/${id}`);
  }
  const removeCartProduct = (id) => {
    dispatch(removeFromCart(id));
    Axios.put("cart/remove-product/" + id, { id: id });
  };

  return (
    <div className="shop-main">

      <div className="shop-container">
        <div className="shop-2-products">
          {[...products,...products].map((product, index) => {
            return <ProductCart product={product} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
