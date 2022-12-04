
import "../styles/sidePopUpMessage.scss";
import React, { useEffect } from "react";
import { BiError } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { closeSidePopUp } from "../features/popUpMessage";
function Pop() {
  const dispatch = useDispatch();
  const { trigger, error, message } = useSelector(
    (state) => state.popUpMessage.sidePopUp
  );

  useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        dispatch(closeSidePopUp());
      },3500);
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
