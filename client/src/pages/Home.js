/** @format */

import { useNavigate } from "react-router-dom";
import "../styles/home.scss";
import { useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import RecomendBar from "../components/RecommendDIv";
import ProductCart from "../components/ProductCart";
import { createRef, useRef } from "react";
import RecommentProducts from "../components/RecommentProducts";
function Home() {
  var history = useNavigate();
  const { types } = useSelector((state) => state.products);
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.user);
  const sliderRef = useRef(null);

  const array = [
    "https://image.freepik.com/free-vector/banner-with-phone-cart-gift-bags-isolated-white-background-vector-illustration_548887-134.jpg",
    "https://img.global.news.samsung.com/in/wp-content/uploads/2020/10/Master-banner-Horizontal.jpg",
  ];

  setInterval(() => {});

  if (loading) {
    return <div></div>;
  }
  return (
    <div className="home-main">
      <section className="slider-wrapper">
        <div className="slider">
          {array.map((img, index) => {
            return <img id={`slider-${index}`} src={img} key={index} />;
          })}
        </div>
      </section>

        <RecommentProducts title="Pepole buying" products={products} />
        <RecommentProducts title="New Products" products={products} />
      
    </div>
  );
}
export default Home;
