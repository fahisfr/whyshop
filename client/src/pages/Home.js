/** @format */

import { useNavigate } from "react-router-dom";
import "../styles/home.scss";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import PopUp from "../components/PopUp";
import RecommentProducts from "../components/RecommentProducts";
function Home() {
  var history = useNavigate();
  const { types } = useSelector((state) => state.products);
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.user);
  const sliderRef = useRef(null);

  const [popUpMessage, setPopUpMessage] = useState({
    trigger: false,
    error: false,
    message: "",
  });

  const array = [
    "https://image.freepik.com/free-vector/banner-with-phone-cart-gift-bags-isolated-white-background-vector-illustration_548887-134.jpg",
    "https://img.global.news.samsung.com/in/wp-content/uploads/2020/10/Master-banner-Horizontal.jpg",
  ];

  setInterval(() => {});

  if (loading) {
    return <div></div>;
  }
  return (
    <div className="home-container">

      <PopUp {...popUpMessage} setTrigger={setPopUpMessage} />

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
              {/* <div className="category-info">
                <span>{type.name}</span>
              </div> */}
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
