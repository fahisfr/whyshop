import { useNavigate } from "react-router-dom";
import "../styles/home.scss";
import { useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import RecomendBar from "../components/RecommendDIv";
import ProductCart from "../components/ProductCart";
function Home() {
  var history = useNavigate();
  const { types } = useSelector((state) => state.products);
  const { products } = useSelector((state) => state.products);
  return (
    <div className="home-main">
      <section className="home-1-box">
        <img
          src="https://image.freepik.com/free-vector/banner-with-phone-cart-gift-bags-isolated-white-background-vector-illustration_548887-134.jpg"
          alt="loading"
        />
      </section>
      <section className="hom-2-product-types">
        {types.map((type, index) => {
          return (
            <div
              className="product-type-cart"
              key={index}
              onClick={() => history(`/shop/${type.name}`)}
            >
              <img src={type.imageid} alt="loadign" />
              <span>{type.name}</span>
            </div>
          );
        })}
      </section>
      <section className="recomment-products">
        <div className="recomment-type">
          <span>People buying</span>
        </div>
        <div className="recomment-products-list">
          {products.map((product) => {
            return <ProductCart product={product} />;
          })}
        </div>
      </section>

      <section className="recomment-products">
        <div className="recomment-type">
          <span>New Products</span>
        </div>
        <div className="recomment-products-list">
          {products.map((product) => {
            return <ProductCart product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}
export default Home;
