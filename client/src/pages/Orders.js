/** @format */

import "../styles/orders.scss";
import { useSelector, useDispatch } from "react-redux";

import { ImagePath } from "../axios";
import { useEffect } from "react";
import  { fetchOrders } from "../features/orders";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, orders, fetched } = useSelector((state) => state.orders);
  useEffect(() => {
    const getOrders = async () => {
      if (!fetched && !loading) {
        dispatch(fetchOrders());
      }
    };
    getOrders();
  }, []);

  return (
    <div className="orders-container">
      <Navbar />
      <div className="os sb-padding-border">
        <div className="os-top sb-bottom-pb">
          <h1 className="os-title">Orders</h1>
        </div>

        <div className="os-body overflow-scroll-dh">
          <table className="os-table">
            <thead className="os-thead">
              <tr>
                <th className="os-dtps  os-products">Products</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>{" "}
            <tbody className="os-tbody">
              {loading ? (
                new Array(15).fill(1).map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="os-td-skeleton skeleton"></div>
                      </td>
                      <td>
                        <div className="os-td-skeleton skeleton"></div>
                      </td>
                      <td>
                        <div className="os-td-skeleton skeleton"></div>
                      </td>{" "}
                      <td>
                        <div className="os-td-skeleton skeleton"></div>
                      </td>{" "}
                      <td>
                        <div className="os-td-skeleton skeleton"></div>
                      </td>
                    </tr>
                  );
                })
              ) : orders.length === 0 ? (
                <div className="no-orders">
                  <span className="os-text">No orders found</span>
                </div>
              ) : (
                orders.map((order, index) => {
                  return (
                    <tr
                      onClick={() => navigate(`/order/${order._id}`)}
                      key={index}
                      className="os-tr"
                    >
                      <td className=" os-products">
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
                      </td>
                      <td>
                        <span className="os-cm">
                          {format(
                            zonedTimeToUtc(
                              order.orderAt,
                              Intl.DateTimeFormat().resolvedOptions().timeZone
                            ),
                            "d/M/yyy"
                          )}
                        </span>
                      </td>
                      <td className="os-td os-price">₹{order.totalPrice}</td>
                      <td className="os-td">
                        {order.paymentType === "online" ? (
                          <div className="paid">
                            <span>Paid</span>
                          </div>
                        ) : (
                          <div className="cod">
                            <span>Cash On Delivery</span>
                          </div>
                        )}
                      </td>{" "}
                      <td className="os-td ">
                        <div className="os-status">
                          <div className="icon-red"></div>
                          {order.orderStatus}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Order;
