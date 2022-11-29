/** @format */

import "../styles/recommentProducts.scss";
import { SkeletonProductCart } from "./ProductCart";
import React, { useRef } from "react";
import ProductCart from "./ProductCart";
function RecommentProducts({ title, products, loading }) {
  const conRef = useRef(null);
  const scroll = (e) => {
    const v = conRef.current.offsetWidth;
    const width = e === true ? v : -v;
    conRef.current.scrollLeft += width;
  };

  if (loading) {
    return (
      <div className="recomment-products">
        <div onClick={() => scroll(100)} className="recomment-type">
          <div className="type-ld skeleton"></div>
        </div>
        <div className="recomment-products-list">
          <div className="scroll-right">
            <button className="scroll-button"> {">"} </button>
          </div>
          <div className="products-s" ref={conRef}>
            {new Array(51).fill(0).map((product) => {
              return <SkeletonProductCart />;
            })}
          </div>
          <div className="scroll-left" onClick={() => scroll(false)}>
            <button className="scroll-button">{"<"}</button>
          </div>
        </div>
      </div>
    );
  }

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
