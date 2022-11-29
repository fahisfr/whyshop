/** @format */

import "../styles/orders.scss";
import { useSelector, useDispatch } from "react-redux";

import { ImagePath } from "../axios";
import { useEffect } from "react";
import order, { fetchOrder } from "../features/orders";
import { Link } from "react-router-dom";
import { FiArchive } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);
  const { orders } = useSelector((state) => state.orders);
  console.log(orders);
  if (!orders.length > 0) {
    return (
      <div className="no-orders">
        <FiArchive size={40} />
        <sapn>Orders Not Available At This Time</sapn>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="os sb-padding-border">
        <div className="os-top sb-bottom-pb">
          <h1 className="os-title">Orders</h1>
        </div>

        <div className="os-body">
          <table className="os-table">
            <thead className="os-thead">
              <tr>
                <th className="os-products">Products</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody className="os-tbody">
              {orders.map((order, index) => {
                return (
                  <tr
                    onClick={() => navigate(`/order/${order._id}`)}
                    key={index}
                  >
                    <td className="os-products">
                      <div className="order-products-img">
                        {order?.products?.map((product) => {
                          return (
                            <img
                              className="products-img"
                              src={`${ImagePath + product?.imageId}.jpg`}
                              alt=""
                            />
                          );
                        })}
                      </div>
                    </td>{" "}
                    <td className="os-price">₹{order.totalPrice}</td>
                    <td>
                      <span className="os-cm">12/2/2022</span>
                    </td>
                    <td>
                      <div className="os-status">
                        <div className="icon-red"></div>
                        {order.orderStatus}
                      </div>
                    </td>
                    <td>
                      {order.paymentStatus === "online" ? (
                        <span>Paid</span>
                      ) : (
                        <span>Cash On Delivery</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Order;
