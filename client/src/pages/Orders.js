/** @format */

import "../styles/orders.css";
import { useSelector, useDispatch } from "react-redux";

import { ImagePath } from "../axios";
import { useEffect } from "react";
import { fetchOrder } from "../features/order";
import { Link } from "react-router-dom";
import { FiArchive } from "react-icons/fi";

import NavBar from "../components/NavBar";

function Order() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);
  const { OrderInfo } = useSelector((state) => state.order);

  if (OrderInfo.length > 0) {
    return (
      <div className="no-orders">
        <FiArchive size={40} />
        <sapn>Orders Not Available At This Time</sapn>
      </div>
    );
  }

  return (
    <div>
      {
        <div className="orders-container">
          <div className="ao">
            <div className="ao-a-header">
              <h2 className="ao-myorders">My Orders</h2>
            </div>
            <div className="ao-body">
              {OrderInfo.map((order, index) => {
                return (
                  <div className="order-info" key={index}>
                    <div className="oi-product">
                      {order.products.map((item, index) => {
                        return (
                          <img
                            className="oi-images"
                            src={`${ImagePath + item?.imageId}.jpg`}
                            alt=""
                            key={index}
                          />
                        );
                      })}
                    </div>
                    <div className="oi-price">
                      <span>₹{order.totalPrice}</span>
                    </div>
                    <div className="oi-status">
                      <span>{order.OrderStatus}</span>
                    </div>
                    <div className="oi-paymet-type">
                      <span>{order.paymentType}</span>
                    </div>
                    <div className="oi-md">
                      <Link to={`/order/${order._id}`}>
                        <button className="oi-btn">More Details</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Order;
