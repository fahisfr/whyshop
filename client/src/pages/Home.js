/** @format */

import { useNavigate } from "react-router-dom";
import "../styles/home.scss";
import { useSelector } from "react-redux";
import { useRef } from "react";
import RecommentProducts from "../components/RecommentProducts";
import Confirmation from "../components/Confirmation";

function Home() {
  const history = useNavigate();

  const { types, products, loading } = useSelector((state) => state.products);
  const sliderRef = useRef(null);

  const array = [
    "https://image.freepik.com/free-vector/banner-with-phone-cart-gift-bags-isolated-white-background-vector-illustration_548887-134.jpg",
    "https://img.global.news.samsung.com/in/wp-content/uploads/2020/10/Master-banner-Horizontal.jpg",
  ];

  if (loading) {
    return (
      <div className="home-container">
        <section className="slider-wrapper border-white">
          <div className="wh-full skeleton"></div>
        </section>
        <section className="category">
          <div className="wh-full skeleton border-white"></div>
        </section>
        <section className="he-recomment">
          <RecommentProducts loading={loading} />
          <RecommentProducts loading={loading} />
        </section>
      </div>
    );
  }
  return (
    <div className="home-container">
      <section className="slider-wrapper">
        <div className="slider">
          {array.map((img, index) => {
            return <img id={`slider-${index}`} src={img} key={index} />;
          })}
        </div>
      </section>
      <section className="category">
        {types.map((type, index) => {
          return (
            <div
              className="category-card"
              key={index}
              onClick={() => history(`/shop/${type.name}`)}
            >
              <div className="category-img">
                <img src={type.imageid} alt="loadign" />
              </div>
            </div>
          );
        })}
      </section>
      <section className="he-recomment">
        <RecommentProducts title="Pepole buying" products={products} />
        <RecommentProducts title="New Products" products={products} />
      </section>
    </div>
  );
}
export default Home;
