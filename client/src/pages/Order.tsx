import React from "react";
import { ImagePath } from "../helper/axios";
import "../styles/order.css";
import "../styles/cart.css";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { useQuery } from "@tanstack/react-query";
import { IOrder } from "../helper/interfaces";
import axios from "../helper/axios";
import { useParams } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
export default function Order() {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: order,
    error,
  } = useQuery<IOrder>({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await axios.get(`/order/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <SkeletonLoading />;
  } else if (isError) {
    return <ErrorHandler error={error} />;
  } else {
    return (
      <div className="order-container">
        <div className="order sb-padding-border overflow-scroll-dh">
          <div className="sb-bottom-pb">
            <span className="title-text">Order Products</span>
          </div>
          <div className="order-body overflow-scroll-dh">
            {order.products.map((product) => {
              return (
                <div className="order-product">
                  <div className="product-image">
                    <img src={ImagePath + product.imageName} alt="" />
                  </div>
                  <div className="product-name capitalize">
                    <span>{product.name}</span>
                  </div>
                  <div className="product-quantity">
                    <span>
                      {product.quantity}
                      kg
                    </span>
                  </div>
                  <div className="product-total-price">
                    <span>₹{product.price * product.quantity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="order-details">
          <div className="od-wrap sb-padding-border">
            <div className=" sb-bottom-pb title-text">Order Details</div>
            <div className="od-body">
              <div className="od-group">
                <span className="font-size-md">Products Total </span>
                <span>₹{order.totalPrice}</span>
              </div>
              <div className="od-group">
                <span className="font-size-md">OrderAt </span>
                <span>
                  {format(
                    zonedTimeToUtc(
                      order.orderAt,
                      Intl.DateTimeFormat().resolvedOptions().timeZone
                    ),
                    "d/M/yyy hh:mm a"
                  )}
                </span>
              </div>{" "}
              <div className="od-group">
                <span className="font-size-md"> Payment</span>
                <span>
                  {order.paymentType === "online" ? "Paid" : "Cash on delivery"}
                </span>
              </div>
              <div className="od-group">
                <span>OrderStatus </span>
                <span className=" capitalize">{order.orderStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function SkeletonLoading() {
  return (
    <div className="order-container">
      <div className="order sb-padding-border overflow-scroll-dh">
        <div className="sb-bottom-pb">
          <div className=" h-8 w-28 skeleton"></div>
        </div>
        <div className="order-body ">
          <div className=" flex flex-col gap-4">
            {new Array(5).fill(9).map((item, index) => {
              return <div className="w-full h-16 skeleton"></div>;
            })}
          </div>
        </div>
      </div>
      <div className="order-details">
        <div className="od-wrap sb-padding-border">
          <div className=" sb-bottom-pb ">
            <div className=" h-8 w-28 skeleton"></div>
          </div>
          <div className="od-body">
            <div className=" w-full h-10 skeleton"></div>
            <div className=" w-full h-10 skeleton"></div>{" "}
            <div className=" w-full h-10 skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
