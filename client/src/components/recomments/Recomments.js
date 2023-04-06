import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../helper/axios";
import "./recommentProducts.css";
import { SkeletonProductCart } from "../product/Product";
import ProductCart from "../product/Product";

export default function Recomments() {
  const productsContainerRef = useRef(null);

  const handleScroll = (arg) => {
    const containerWidth = productsContainerRef.current.offsetWidth;
    const scrollWidth = arg ? containerWidth : -containerWidth;
    productsContainerRef.current.scrollLeft += scrollWidth;
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["home-page-recomments"],
    queryFn: async () => {
      const { data } = await axios.get("/home/recommendations");
      return data;
    },
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <div></div>;
  }

  return (
    <div className="w-full h-full">
      {data.map((recom) => (
        <div className="recomments" key={recom.title}>
          <div className="recomment-title">
            <span className="recomment-title-text">{recom.title}</span>
          </div>

          <div className="recomment-products-list">
            <div className="scroll-right" onClick={() => handleScroll(true)}>
              <button className="scroll-button"> {">"} </button>
            </div>
            <div className="recomment-products" ref={productsContainerRef}>
              {recom.products?.map((product, index) => (
                <ProductCart key={index} product={product} />
              ))}
            </div>

            <div className="scroll-left" onClick={() => handleScroll(false)}>
              <button className="scroll-button">{"<"}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="w-full h-full">
      <div className="recomments">
        <div className="recomment-title">
          <div className="h-8  w-36 skeleton "></div>
        </div>
        <div className="recomment-products-list">
          <div className="recomment-products">
            {new Array(10).fill(0).map((value, index) => {
              return <SkeletonProductCart key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
