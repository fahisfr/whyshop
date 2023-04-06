import "../styles/orders.css";
import { ImagePath } from "../helper/axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

import axios from "../helper/axios";
import { useQuery } from "@tanstack/react-query";
import { IOrder } from "../helper/interfaces";
import ErrorHandler from "../components/ErrorHandler";

export default function Order() {
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: orders,
    error,
  } = useQuery<IOrder[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await axios.get("/user/orders");
      return data;
    },
  });

  if (isLoading) {
    return <SkeletonLoading />;
  }
  if (isError) {
    return <ErrorHandler error={error} />;
  }

  return (
    <div className="orders-container">
      <div className="os  sb-padding-border">
        <div className=" sb-bottom-pb">
          <h1 className="os-title">Orders</h1>
        </div>
        <div className="os-body ">
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
              {orders.length === 0 ? (
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
                        {order?.products?.map((product) => {
                          return (
                            <img
                              className="products-img"
                              src={`${ImagePath + product?.imageName}`}
                              alt=""
                            />
                          );
                        })}
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
                      </td>
                      <td className="os-td ">
                        <div className="os-status">
                          <div className="icon-red"></div>
                          <span className="os-status-text">
                            {order.orderStatus}
                          </span>
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

function SkeletonLoading() {
  return (
    <div className="orders-container">
      <div className="os sb-padding-border">
        <div className=" sb-bottom-pb">
          <h1 className="os-title">Orders</h1>
        </div>
        <div className="os-body ">
          <table className="os-table">
            <thead className="os-thead">
              <tr>
                <th className="os-dtps  os-products  skeleton   w-10 h-10"></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="os-tbody">
              {new Array(5).fill(0).map((item, index) => {
                return (
                  <tr className="os-tr h-14" key={index}>
                    <td className=" os-products">
                      <div className=" skeleton w-full h-10"></div>
                    </td>
                    <td>
                      <div className=" skeleton w-full h-10"></div>
                    </td>
                    <td className="os-td ">
                      {" "}
                      <div className=" skeleton w-full h-10"></div>
                    </td>
                    <td className="os-td">
                      {" "}
                      <div className=" skeleton w-full h-10"></div>
                    </td>
                    <td className="os-td ">
                      {" "}
                      <div className=" skeleton w-full h-10"></div>
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
