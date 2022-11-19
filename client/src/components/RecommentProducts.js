import "../styles/recommentProducts.scss";

import React, { useRef } from "react";
import ProductCart from "./ProductCart";
function RecommentProducts({ title, products }) {
  const conRef = useRef(null);
  const scroll = (e) => {
    const v = conRef.current.offsetWidth;
    const width = e === true ? v : -v;
    conRef.current.scrollLeft += width;
  };
  return (
    <div className="recomment-products">
      <div onClick={() => scroll(100)} className="recomment-type">
        <span>{title}</span>
      </div>

      <div className="recomment-products-list">
        <div className="scroll-right" onClick={() => scroll(true)}>
          <button className="scroll-button"> {">"} </button>
        </div>
        <div className="products-s" ref={conRef}>
          {products.map((product) => {
            return <ProductCart product={product} />;
          })}
        </div>

        <div className="scroll-left" onClick={() => scroll(false)}>
          <button className="scroll-button">{"<"}</button>
        </div>
      </div>
    </div>
  );
}

export default RecommentProducts;
