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
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);
  const { orders } = useSelector((state) => state.orders);

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
            </thead>
            <tbody className="os-tbody">
              {orders.map((order, index) => {
                return (
                  <tr
                    onClick={() => navigate(`/order/${order._id}`)}
                    key={index}
                    className="lss"
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
                    <td className="os-price">₹{order.totalPrice}</td>
                    <td>
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
                    <td>
                      <div className="os-status">
                        <div className="icon-red"></div>
                        {order.orderStatus}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Order;
