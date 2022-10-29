import { useNavigate } from "react-router-dom";
import "../css/home.css";
import { useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import RecomendBar from "../components/RecommendDIv";

function Home() {
  var history = useNavigate();
  const { types } = useSelector((state) => state.products);

  return (
    <div className="home-main">
      <NavBar />
      <div className="home-1-box">
        <img
          src="https://image.freepik.com/free-vector/banner-with-phone-cart-gift-bags-isolated-white-background-vector-illustration_548887-134.jpg"
          alt="loading"
        />
      </div>
      <div className="hom-2-product-types">
        {types.map((type, index) => {
          return (
            <div
              className="product-type-cart"
              key={index}
              onClick={() => history(`/shop/${type.name}`)}
            >
              <img src={type.imageid} alt="loadign" />
              <span className="capitalize">{type.name}</span>
            </div>
          );
        })}
      </div>
      {types.map((type) => (
        <RecomendBar type={type.name} key={type.name} />
      ))}
    </div>
  );
}
export default Home;
