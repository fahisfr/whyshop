/** @format */
import "../styles/home.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import RecommentProducts from "../components/RecommentProducts";
import NavBar from "../components/Navbar";

import { fetchBanners, fetchRecommendations } from "../features/home";
function Home() {
  const history = useNavigate();

  const dispatch = useDispatch();
  const { catgorys, banners, recommendations } = useSelector(
    (state) => state.home
  );


  useEffect(() => {
    const fetch = async () => {
      try {
        if (!recommendations.fetched && !banners.loading) {
          dispatch(fetchRecommendations());
        }
        if (!banners.fetched && !banners.loading) {
          dispatch(fetchBanners());
        }
      } catch (error) {}
    };
    fetch();
  });

  const sliderRef = useRef(null);

  return (
    <div className="home-container">
      <NavBar />

      <section className="slider-wrapper">
        {banners.loading ? (
          <div className="wh-full skeleton border-white"></div>
        ) : (
          <div className="slider" ref={sliderRef}>
            {banners.result.map((banner, index) => {
              return (
                <img
                  id={`slider-${index}`}
                  src={banner.imageName}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </section>
      <section className="category">
        {catgorys.loading ? (
          <div className="wh-full skeleton border-white"></div>
        ) : (
          catgorys?.result?.map((catgory, index) => {
            return (
              <div
                className="category-card"
                id={`item-${index}`}
                key={index}
                onClick={() => history(`/shop/${catgory.name}`)}
              >
                <div className="category-img">
                  <img src={catgory.imageName} alt="" />
                </div>
              </div>
            );
          })
        )}
      </section>
      <section className="he-recomment">
        {recommendations.loading ? (
          <RecommentProducts loading={true} />
        ) : (
          recommendations?.result?.map((item, index) => {
            return (
              <RecommentProducts
                key={index}
                title={item.title.split(/(?=[A-Z])/).join(" ")}
                products={item.products}
              />
            );
          })
        )}
      </section>
    </div>
  );
}
export default Home;
