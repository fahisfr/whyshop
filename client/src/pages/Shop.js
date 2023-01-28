import "../styles/shop.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../axios";
import { useDispatch } from "react-redux";
import { SkeletonProductCart } from "../components/ProductCart";
import ProductCart from "../components/ProductCart";
import NavBar from "../components/Navbar";

function Products() {
  const { id } = useParams();
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get("/shop/" + id).then((result) => {
      if (result.data.product) {
        setproducts(result.data.product);
      }
    });
  }, [id]);

  return (
    <div className="shop-container">
      <NavBar />
      <div className="shop-2-products-ld">
        {/* {new Array(30).fill(0).map((itme, index) => {
          return <SkeletonProductCart />;
        })} */}
        {products.map((product, index) => {
          return <ProductCart product={product} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Products;
