/** @format */

import "../styles/checkout.scss";
import React, { useState } from "react";
import Axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { removeAllProducts } from "../features/user";
import {
  BsFillCreditCard2FrontFill as CardIcon,
  BsCashStack,
} from "react-icons/bs";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
function Order() {
  const dispatch = useDispatch();
  const [pop, setpop] = useState({
    trigger: false,
    success: false,
    message: "Order successfully plased",
  });
  const { userInfo } = useSelector((state) => state.user);
  const [name, setname] = useState(userInfo.name);
  const [number, setnumber] = useState(userInfo.number);
  const [city, setcity] = useState("");
  const [landmark, setlademark] = useState("");
  const [paymentType, setpaymentType] = useState("");
  const [loading, setloading] = useState(false);
  const OrderSuccess = (message) => {
    setloading(false);
    dispatch(removeAllProducts());
    setpop({ trigger: true, success: true, message: message });
  };
  async function displayRazor(Order) {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay is not loaded are you offline");
      return;
    } else {
      var options = {
        key: "rzp_test_lFLdi5y9B4LWvU", // Enter the Key ID generated from the Dashboard
        amount: Order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: Order.id,
        handler: function (response) {
          Axios.post("order/verifypayment", { order: response }).then((res) => {
            if (res.data.status) {
              OrderSuccess(res.data.message);
            } else {
              alert("Payment Failed");
            }
          });
        },
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          name: "fahis",
          email: "TestMode.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const PaymentObject = new window.Razorpay(options);
      setloading(false);
      PaymentObject.open();
    }
  }
  function OrderNow(e) {
    e.preventDefault();
    setloading(true);
    Axios.post("cart/place-order", {
      name: name,
      number: number,
      city: city,
      lademark: landmark,
      paymentType: paymentType,
    })
      .then((res) => {
        if (res.data.razorpay) {
          displayRazor(res.data.order);
        } else if (res.data.status) {
          OrderSuccess(res.data.message);
          setpop({ trigger: true, success: true, message: res.data.message });
        } else {
          setloading(false);
          setpop({ trigger: true, message: res.data.message });
        }
      })
      .catch((err) => {
        setloading(false);
        setpop({ trigger: true, message: err.message });
      });
  }

  return (
    <div className="checkout-container">
      <div className="ct-left sb-padding-border ">
        <div className="as-top ac-bottom-pb">
          <span className="title-text">Checkout</span>
        </div>
        <div className="as-body">
          <form className="as-form">
            <div className="as-group">
              <label className="as-lable ">Name</label>
              <input className="as-input" placeholder="" />
            </div>
            <div className="as-group">
              <label className="as-lable ">Phone Number</label>
              <input className="as-input" />
            </div>{" "}
            <div className="as-group ">
              <label className="as-lable ">City</label>
              <div>
                <select
                  name="selectList"
                  id="selectList"
                  className="as-input as-select"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                >
                  <option value="">Select City</option>
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                  <option value="city3">City 3</option>
                </select>
              </div>
            </div>
            <div className="as-group">
              <label className="as-lable font-size-14">Landmark</label>
              <input className="as-input" />
            </div>
          </form>
        </div>
      </div>
      <div className="ct-right sb-padding-border">
        <div className="payment">
          <div className="pt-top ac-bottom-pb">
            <span className="title-text">Payment</span>
          </div>
          <div className="pt-types">
            <div className="pt-card" onClick={(e) => setpaymentType("online")}>
              <input
                type="radio"
                name="paymentType"
                value="online"
                className="pt-input"
                id="card1"
              />
              <label for="card1" className="card-body">
                <span> Pay Online </span>
                <CardIcon className="icon" />
              </label>
            </div>
            <div className="pt-card" onClick={(e) => setpaymentType("cod")}>
              <input
                type="radio"
                name="paymentType"
                value="cod"
                id="card2"
                className="pt-input"
              />
              <label for="card2" className="card-body">
                <span>Cash On Delivery</span>
                <BsCashStack className="icon" />
              </label>
            </div>
          </div>

          <div>
            <button className="order-btn" disabled={!paymentType}>
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default Order;
