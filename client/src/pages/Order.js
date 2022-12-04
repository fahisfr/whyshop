/** @format */

import React, { useEffect } from "react";
import NavBar from "../components/Navbar";
import { useParams } from "react-router-dom";
import order, { fetchOrder } from "../features/orders";
import { useSelector, useDispatch } from "react-redux";
import { ImagePath } from "../axios";
import "../styles/order.scss";
import "../styles/cart.scss";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
function Order() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);
  const { orders, loading } = useSelector((state) => state.orders);
  const order = orders?.find((x) => x._id === id);

  // if (loading || !order) {
  //   return (
  //     <div className="order-container">
  //       <div className="order sb-padding-border">
  //         <div className="sb-bottom-pb">
  //           <span className="title-text">Order</span>
  //         </div>
  //         {new Array(6).fill(0).map((item, index) => {
  //           return <div className="skeleton-item skeleton"></div>;
  //         })}
  //       </div>
  //       <div className="order-details">
  //         <div className="od-wrap sb-padding-border">
  //           <div className=" sb-bottom-pb title-text">Order Details</div>
  //           <div className="skeleton-item skeleton"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="order-container">
      <NavBar />
      <div className="order sb-padding-border">
        <div className="sb-bottom-pb">
          <span className="title-text">Order</span>
        </div>
        <div className="order-body overflow-scroll-dh">
          {order.products.map((product) => {
            return (
              <div className="order-product">
                <div className="product-image">
                  <img
                    src={ImagePath + product.imageId + ".jpg"}
                    alt="loading"
                  />
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
                <div className="product-total-r">
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
                {order.paymentType == "online" ? "Paid" : "Cash on delivery"}
              </span>
            </div>
            <div className="od-group">
              <span className="font-size-md">OrderStatus </span>
              <span>{order.orderStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
