/** @format */

import { useNavigate } from "react-router-dom";
import "../styles/home.scss";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import RecommentProducts from "../components/RecommentProducts";
import NavBar from "../components/Navbar";
import axios from "../axios";

function Home() {
  const history = useNavigate();
  const navigate = useNavigate();

  const [reco, setReco] = useState({
    loading: false,
    fetched: false,
    data: [],
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!reco.fetched && !reco.loading) {
          setReco({ ...reco, loading: true });
          const { data } = await axios.get("/recommendations");
          if (data.status === "ok") {
            console.log(data);
            setReco({
              loading: false,
              fetched: true,
              data: data.recommendations,
            });
          }
        }
      } catch (error) {}
    };
    fetch();
  });

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
      </div>
    );
  }
  return (
    <div className="home-container">
      <NavBar />
      <section className="slider-wrapper">
        <div className="slider" ref={sliderRef}>
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
              id={`item-${index}`}
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
        {reco.loading ? (
          <RecommentProducts loading={true} />
        ) : (
          reco.fetched &&
          reco?.data?.map((item, index) => {
            return (
              <RecommentProducts title={item.title} products={item.products} />
            );
          })
        )}
      </section>
    </div>
  );
}
export default Home;
