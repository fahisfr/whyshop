/** @format */
import "../styles/popUp.scss";
import React, { useEffect } from "react";
import { BiError } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
function Pop({ trigger, setTrigger, error, message }) {
  useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        setTrigger({
          trigger: false,
          error: false,
          message
        });
      }, 5000);
    }
  }, [trigger]);
  return (
    <div className={`popup-message ${trigger ? "mount" : "un-mount"}`}>
      <div className="pm-content">
        {error ? (
          <BiError className="pm-icon-error" />
        ) : (
          <BsCheckCircle className="pm-icon-success" />
        )}
        <span className="pm-message">{message}</span>
      </div>
    </div>
  );
}
export default Pop;
