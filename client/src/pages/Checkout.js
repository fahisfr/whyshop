import "../styles/checkout.scss";
import React, { useState } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/user";
import {
  BsFillCreditCard2FrontFill as CardIcon,
  BsCashStack,
} from "react-icons/bs";
import OrderPlaced from "../components/OrderPlaced";
import { triggerSidePopUp } from "../features/popUpMessage";
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

  const { cart } = useSelector((state) => state.user.userInfo);
  const total = cart.reduce((prev, cur) => {
    return prev + cur.price * cur.quantity;
  }, 0);

  const [name, setName] = useState("name");
  const [number, setNumber] = useState("9999999939");
  const [secondaryNumber, setSecondaryNumber] = useState("999999999");
  const [city, setcity] = useState("cit3");
  const [landmark, setLademark] = useState("asdfasdf");
  const [paymentType, setPaymentType] = useState(null);
  const [btnLoading, setBtnloading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const triggerOrderPlaced = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };
  const displayRazor = async (Order) => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      triggerSidePopUp({
        error: true,
        message: "Razorpay is not loaded are you offline",
      });
    } else {
      var options = {
        key: "rzp_test_lFLdi5y9B4LWvU",
        amount: Order.amount,
        currency: "INR",
        name: "whyshop",
        order_id: Order.id,
        handler: async (response) => {
          triggerOrderPlaced();
        },
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          email: "fahiscodes@gmail.com",
          contact: number,
        },
      };

      const PaymentObject = new window.Razorpay(options);
      setBtnloading(false);
      PaymentObject.open();
    }
  };
  const OrderNow = async (e) => {
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
      triggerOrderPlaced();
    } else if (data.status === "error") {
      dispatch(triggerSidePopUp({ error: data.error }));
    }
    setBtnloading(false);
  };

  return (
    <div className="checkout-container">
      {orderPlaced && <OrderPlaced />}
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
                placeholder="Enter your Name"
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
                placeholder="Enter your phone number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="as-group">
              <label className="as-lable" for="phoneNumber">
                Secondary Phone Number
              </label>
              <input
                className="as-input"
                id="phoneNumber"
                placeholder="Enter your secondary phone number "
                value={secondaryNumber}
                onChange={(e) => setSecondaryNumber(e.target.value)}
              />
            </div>
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
        <div className=" ac-bottom-pb">
          <span className="title-text">Payment</span>
        </div>
        <div>
          <div className="pt-billing">
            <div className="pt-group">
              <span>Products Total </span>
              <span>₹{total}</span>
            </div>
            <div className="pt-group">
              <span>Delivery Fee</span>
              <span className="free">Free</span>
            </div>
          </div>
          <div className="pt-group">
            <span>Total Price</span>
            <span className="total-price">₹{total}</span>
          </div>{" "}
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
