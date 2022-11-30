
import React from "react";
import "../styles/confirmation.scss";
function Confirmation({ message, setTrigger, confirmed, btnText }) {
  return (
    <div className="confirmation-container" onClick={() => setTrigger(false)}>
      <div className="cf-con">
        <div className="cf-top">
          <span className="cf-message">{message} </span>
        </div>
        <div className="cf-bottom">
          <button className="cf-btn" onClick={() => setTrigger(false)}>
            Cancel
          </button>
          <button className="cf-btn cf-continue-btn" onClick={confirmed}>
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
