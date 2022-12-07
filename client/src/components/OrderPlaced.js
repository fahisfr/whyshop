
import "../styles/orderPlaced.scss";
import React from "react";
import { Link } from "react-router-dom";

function OrderPlaced() {
  return (
    <div className="op-container">
      <div className="op-close" onClick={() => alert("hello")}></div>
      <div className="op-body">
        <div className="op-image-wrappe">
          <img
            alt=""
            src="https://img.freepik.com/free-vector/express-courier-scooter-shipping-order_74855-6447.jpg?w=900&t=st=1670391421~exp=1670392021~hmac=eb3c07a0c80f55857367eeedc2ebe22b02085d6ebaa412e5072390fb7fe839a2"
          />
        </div>
        <div className="op-bottom">
          <div>
            <h3 className="op-pt-text">Your order has been placed</h3>
          </div>
          <div className="op-message">
            <span className="op-message-text">
              Thank you for shopping with us!
            </span>
          </div>
        </div>
        <div>
          <Link to="/">
            <button className="op-button">Go back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;
