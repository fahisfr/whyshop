/** @format */

import "../styles/checkout.scss";
import React, { useState } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/user";
import {
  BsFillCreditCard2FrontFill as CardIcon,
  BsCashStack,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

import { triggerSidePopUp as triggerSidePopUpMesaage } from "../features/popUpMessage";
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
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [name, setName] = useState("fahis");
  const [number, setNumber] = useState(333333333);
  const [city, setcity] = useState("aaaaaaa");
  const [landmark, setLademark] = useState("aaaaa");
  const [paymentType, setPaymentType] = useState("cod");
  const [btnLoading, setBtnloading] = useState(false);

  const triggerSidePopUp = (info) => {
    dispatch(triggerSidePopUpMesaage(info));
  };

  const orderPlaced = () => {
    dispatch(clearCart());
    dispatch(
      triggerSidePopUpMesaage({
        error: false,
        message: "Order Placed Successfully",
      })
    );
    navigate("/");
  };
  async function displayRazor(Order) {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      triggerSidePopUp({
        error: true,
        message: "Razorpay is not loaded are you offline",
      });
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
          axios.post("order/verifypayment", { order: response }).then((res) => {
            if (res.data.status) {
              orderPlaced();
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
      setBtnloading(false);
      PaymentObject.open();
    }
  }
  const OrderNow = async (e) => {
    try {
      e.preventDefault();
      setBtnloading(true);
      const { data } = await axios.post("cart/place-order", {
        name: name,
        number: number,
        city: city,
        lademark: landmark,
        paymentType: paymentType,
      });
      if (data.status === "razorpay") {
        displayRazor(data.order);
      } else if (data.status === "ok") {
        orderPlaced();
      } else if (data.status === "error") {
        dispatch(triggerSidePopUp({ error: true, message: data.message }));
      }
    } catch (error) {
      dispatch(
        triggerSidePopUp({ trigger: true, error: true, message: error.message })
      );
    } finally {
      setBtnloading(false);
    }
  };

  return (
    <div className="checkout-container">
      <NavBar />
      <div className="ct-left sb-padding-border ">
        <div className="as-top ac-bottom-pb">
          <span className="title-text">Checkout</span>
        </div>
        <div className="as-body">
          <form className="as-form">
            <div className="as-group">
              <label className="as-lable" for="name">
                Name
              </label>
              <input
                id="name"
                className="as-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="as-group">
              <label className="as-lable" for="phoneNumber">
                Phone Number
              </label>
              <input
                className="as-input"
                id="phoneNumber"
                value={number}
                onChange={(e) => e.target.value}
              />
            </div>{" "}
            <div className="as-group ">
              <label className="as-lable">City</label>
              <div>
                <select
                  name="selectList"
                  id="selectCity"
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
              <label className="as-lable font-size-14" for="landMark">
                Landmark
              </label>
              <input
                id="landMark"
                className="as-input"
                value={landmark}
                onChange={(e) => setLademark(e.target.value)}
              />
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
            <div className="pt-card" onClick={(e) => setPaymentType("online")}>
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
            <div className="pt-card" onClick={(e) => setPaymentType("cod")}>
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

          <div className={`${btnLoading ? "btn-loading" : ""}`}>
            <button
              className="order-btn ld-btn"
              onClick={OrderNow}
              disabled={!paymentType}
            >
              <span className="ld-text">Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
