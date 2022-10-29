import React, { useState } from "react";
import "../css/checkout.css";
import Axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { removeAllProducts } from "../features/cart";
import Loading from "../components/Loading";
import Pop from "../components/PopUp";

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
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
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
      <Loading trigger={loading} />
      <Pop Pop={pop} setPop={setpop} />
      <div className="checkout-form">
        <h1 className="checkout-from-tital">Checkout</h1>
        <form onSubmit={OrderNow}>
          <div className="checkout-form-input">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setname(e.target.value)}></input>
          </div>
          <div className="checkout-form-input">
            <label>Number</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
            ></input>
          </div>
          <div className="checkout-form-input">
            <label>City</label>
            <select
              name="selectList"
              id="selectList"
              value={city}
              onChange={(e) => setcity(e.target.value)}
            >
              <option value="">Select City</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
              <option value="city3">City 3</option>
            </select>
          </div>
          <div className="checkout-form-input">
            <label>Landmark</label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setlademark(e.target.value)}
            ></input>
          </div>

          <label>Paymen Type</label>
          <div className="order-billinginfo">
            <input
              type="radio"
              name="paymentType"
              value="Online"
              checked={paymentType === "Online"}
              onChange={(e) => setpaymentType(e.target.value)}
            />
            <label>Online</label>
            <input
              type="radio"
              name="paymentType"
              value="COD"
              checked={paymentType === "COD"}
              onChange={(e) => setpaymentType(e.target.value)}
            />
            <label>Cash On Delivery</label>
          </div>
          <div className="checkout-form-button">
            <button onClick={OrderNow} className="order-button">
              Order Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Order;
