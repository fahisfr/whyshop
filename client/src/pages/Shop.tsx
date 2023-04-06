import "../styles/shop.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "../helper/axios";
import { SkeletonProductCart } from "../components/product/Product";
import ProductCart from "../components/product/Product";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../helper/interfaces";
export default function Products() {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: products,
  } = useQuery<IProduct[]>({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data } = await axios.get(`/products/category/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="shop-container">
        <div className="shop-2-products-ld">
          {new Array(30).fill(1).map((product, index) => {
            return <SkeletonProductCart key={index} />;
          })}
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="felx items-center justify-center h-full w-full">
        <span>Faild to </span>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <div className="shop-2-products-ld">
        {products.map((product, index) => {
          return <ProductCart product={product} key={index} />;
        })}
      </div>
    </div>
  );
}


