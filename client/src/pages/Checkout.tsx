import "../styles/checkout.scss";
import React, { useState, useMemo } from "react";
import axios from "../helper/axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/user";
import {
  BsFillCreditCard2FrontFill as CardIcon,
  BsCashStack,
} from "react-icons/bs";
import OrderPlaced from "../components/orderPaced/OrderPlaced";
import { showErrorMessage, showSuccessMessage } from "../features/popUpMessage";
import { RootState } from "../features/store";
import { IAddress } from "../helper/interfaces";
import { errorHandler } from "../helper/errorHandler";

const loadRazorpay = (src: string) => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function Order() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.user);
  const [btnLoading, setBtnloading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [paymentType, setPaymentType] = useState<"cod" | "online">();
  const [address, setAddress] = useState<IAddress>({
    name: "",
    number: "",
    secondaryNumber: "",
    city: "",
    landMark: "",
  });

  const handleOrderFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddress({ ...address, [name]: value });
  };

  const total = useMemo(() => {
    return cart.reduce((prev, cur) => {
      return prev + cur.price * cur.quantity;
    }, 0);
  }, [cart]);

  // const triggerOrderPlaced = () => {
  //   dispatch(clearCart());
  //   setOrderPlaced(true);
  // };

  const displayRazor = async (order: { amount: number; id: string }) => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      dispatch(showErrorMessage("Razorpay is not loaded. Are you offline?"));
      return;
    }

    // const options = {
    //   key: "rzp_test_lFLdi5y9B4LWvU",
    //   amount: order.amount,
    //   currency: "INR",
    //   name: "whyshop",
    //   order_id: order.id,
    //   handler: async (response: any) => {
    //     triggerOrderPlaced();
    //   },
    //   callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
    //   prefill: {
    //     email: "fahiscodes@gmail.com",
    //     contact: address.number,
    //   },
    // };

    // const paymentObject = new window.Razorpay(options);
    setBtnloading(false);
    // paymentObject.open();
  };

  const orderNow = async () => {
    setBtnloading(true);

    try {
      const { data } = await axios.post("/place-order", {
        address,
        paymentType,
      });
      if (data.loadRazorPay) {
        displayRazor(data.order);
        return;
      }
      dispatch(showSuccessMessage(data.message));
    } catch (error) {
      dispatch(showErrorMessage(errorHandler(error).message));
    }

    setBtnloading(false);
  };

  return (
    <div className="checkout-container">
      {orderPlaced && <OrderPlaced />}
      <div className="ct-address sb-padding-border ">
        <div className="as-header sb-bottom-pb">
          <span className="title-text">Address</span>
        </div>
        <div className="as-body">
          <form className="as-form">
            <div className="as-group">
              <label className="as-lable" htmlFor="name">
                Name
              </label>
              <input
                name="name"
                className="as-input"
                placeholder="Enter your Name"
                value={address.name}
                onChange={handleOrderFormChange}
              />
            </div>
            <div className="as-group">
              <label className="as-lable" htmlFor="number">
                Phone Number
              </label>
              <input
                className="as-input"
                name="number"
                placeholder="Enter your phone number"
                value={address.number}
                onChange={handleOrderFormChange}
              />
            </div>
            <div className="as-group">
              <label className="as-lable" htmlFor="secondaryNumber">
                Secondary Phone Number
              </label>
              <input
                className="as-input"
                name="secondaryNumber"
                placeholder="Enter your secondary phone number "
                value={address.secondaryNumber}
                onChange={handleOrderFormChange}
              />
            </div>
            <div className="as-group ">
              <label className="as-lable">City</label>
              <div>
                <select
                  name="city"
                  className="as-input as-select"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                >
                  <option value="">Select City</option>
                  <option value="city2">City 2</option>
                  <option value="city3">City 3</option>
                </select>
              </div>
            </div>
            <div className="as-group">
              <label className="as-lable font-size-14" htmlFor="landMark">
                Landmark
              </label>
              <input
                name="landMark"
                className="as-input"
                value={address.landMark}
                onChange={handleOrderFormChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="ct-billing sb-padding-border">
        <div className="sb-bottom-pb">
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
            </div>{" "}
            <div className="pt-group">
              <span>Total Price</span>
              <span className="total-price">₹{total}</span>
            </div>{" "}
          </div>

          <div className="payment-types">
            <div
              className="payment-card"
              onClick={(e) => {
                setPaymentType("online");
              }}
            >
              <input
                type="radio"
                name="paymentType"
                value="online"
                className="payment-card-input"
                id="card1"
              />
              <label htmlFor="card1" className="payment-card-label">
                <span> Pay Online </span>
                <CardIcon className="payment-card-icon" />
              </label>
            </div>
            <div
              className="payment-card"
              onClick={(e) => {
                setPaymentType("cod");
              }}
            >
              <input
                type="radio"
                name="paymentType"
                value="cod"
                id="card2"
                className="payment-card-input"
              />
              <label htmlFor="card2" className="payment-card-label">
                <span>Cash On Delivery</span>
                <BsCashStack className="payment-card-icon" />
              </label>
            </div>
          </div>
          <div className={`${btnLoading ? "btn-loading" : ""}`}>
            <button className="order-btn btn" onClick={() => orderNow()}>
              <span className="btn-text">Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
