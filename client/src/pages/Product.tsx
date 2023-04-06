import "../styles/product.css";
import React from "react";
import { useParams } from "react-router-dom";
import axios, { ImagePath } from "../helper/axios";
import { useSelector } from "react-redux";
import ProductCart, {
  SkeletonProductCart,
} from "../components/product/Product";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../helper/interfaces";
import { RootState } from "../features/store";
import {
  useAddToCart,
  useChangeProductQuantity,
} from "../hooks/useCartActions";
import ErrorHandler from "../components/ErrorHandler";

interface ProductType extends IProduct {
  recommends: IProduct[];
}

export default function Page() {
  const { addToCart, isLoading: addToCartIsLoading } = useAddToCart();
  const { changeProductQuantity } = useChangeProductQuantity();
  const { cart } = useSelector((state: RootState) => state.user);
  const { id: productName } = useParams();
  const {
    isLoading,
    isError,
    data: product,
    error,
  } = useQuery<ProductType>({
    queryKey: ["product", productName],
    queryFn: async () => {
      const { data } = await axios.get(`/product/${productName}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorHandler error={error} />;
  }

  const inCart = cart?.find((item) => item._id === product?._id);

  return (
    <div className="product-container">
      {
        <div className="pt">
          <div className="pt-image-wrapper">
            <img
              className="pt-img"
              src={`${ImagePath + product.imageName}`}
              alt=""
            />
          </div>

          <div
            className={`pt-details-wrapper ${
              addToCartIsLoading ? "btn-loading" : ""
            }`}
          >
            <span className="pt-name capitalize">{product.name}</span>
            <span className="pt-price">₹{product.price} </span>
            {inCart ? (
              <div className="pt-quantity">
                <button
                  onClick={() => {
                    changeProductQuantity({
                      quantity: -0.5,
                      productId: product._id,
                      price: product.price,
                    });
                  }}
          
                  className="pt-button"
                >
                  -
                </button>
                <span className="pt-quantity">{inCart.quantity}</span>
                <button
                  onClick={() => {
                    changeProductQuantity({
                      quantity: 0.5,
                      productId: product._id,
                      price: product.price,
                    });
                  }}
                  className="pt-button"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="pt-addtocart btn"
                onClick={() => addToCart(product)}
              >
                <span className="btn-text">Add to cart</span>
              </button>
            )}
          </div>
        </div>
      }

      <div className="pt-recommends">
        <div className="pt-title">
          <span>Recommends</span>
        </div>
        <div className="pt-products">
          <div className="pt-products-wrappr">
            {product?.recommends?.map((product, index: number) => {
              return <ProductCart key={index} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="product-container">
      <div className="pt">
        <div className="pt-image-wrapper ">
          <div className="w-full  h-[20rem]  skeleton"></div>
        </div>
        <div className="pt-details-wrapper">
          <div className=" w-full h-8 skeleton"></div>
          <div className="h-8 max-w-[7rem] skeleton"></div>
          <div className="w-full h-12 skeleton"></div>
        </div>
      </div>
      <div className="pt-recommends">
        <div className="pt-title">
          <div className="  w-24 h-8 skelton "></div>
        </div>
        <div className="pt-products">
          <div className="pt-products-wrappr">
            {new Array(3).fill(1).map((value, index) => {
              return <SkeletonProductCart key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
