import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Axios, { ImagePath } from "../axios";
import { addToCart, changeProductQuantity, removeFromCart } from "../features/user";

import ProductCart from "./ProductCart";

function RecommendBar({ type }) {
  const { isAuth } = useSelector((state) => state.user.userInfo);
  const { products } = useSelector((state) => state.products);
  const [recommend, setRecommend] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterProducts = () => {
      if (type) {
        return products.filter((product) => product.type === type);
      } else {
        let randomProducts = [];

        for (let i = 0; i < 10; i++) {
          randomProducts.push(products[Math.floor(Math.random() * products.length)]);
        }
        return randomProducts;
      }
    };
    setRecommend(filterProducts());
  }, [type, products]);

  const { cartInfo } = useSelector((state) => state.cart);
  const changeQuantity = (quantity, id) => {
    dispatch(changeProductQuantity({ id, quantity }));
    Axios.put(`cart/change-product-quantity/${id}`, { quantity });
  };

  const AddTOCart = (id, product) => {
    const { name, price, imageId, type } = product;
    dispatch(addToCart({ _id: id, name, type, price, imageId, id, quantity: 1 }));
    Axios.put(`cart/add-to-cart/${id}`);
  };

  const removeCartProduct = (id) => {
    dispatch(removeFromCart(id));
    Axios.put("cart/remove-product/" + id, { id: id });
  };

  return (
    <div className="recommend-products">
      {recommend.map((product, index) => {
        return <ProductCart product={product} />;
      })}
    </div>
  );
}

export default RecommendBar;
