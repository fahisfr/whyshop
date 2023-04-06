import "./sidePopUpMessage.css";
import React, { useEffect } from "react";
import { BiError } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { closeSidePopUp } from "../../features/popUpMessage";
import { AiOutlineClose } from "react-icons/ai";
import { RootState } from "../../features/store";

const TIMEOUT_DURATION = 3500;

let timeoutId: NodeJS.Timeout;

export default function Pop(): JSX.Element {
  const dispatch = useDispatch();
  const { trigger, isError, message } = useSelector(
    (state: RootState) => state.popUpMessage
  );

  useEffect(() => {
    if (trigger) {
      timeoutId = setTimeout(() => {
        dispatch(closeSidePopUp());
      }, TIMEOUT_DURATION);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, trigger]);

  return (
    <div className={`popup-message ${trigger ? "mount" : "un-mount"}`}>
      <div className="pm-content">
        {isError ? (
          <BiError className="pm-icon-error" />
        ) : (
          <BsCheckCircle className="pm-icon-success" />
        )}
        <span className="pm-message">{message}</span>
        <AiOutlineClose
          className="pm-close"
          onClick={() => {
            clearTimeout(timeoutId);
            dispatch(closeSidePopUp());
          }}
        />
      </div>
    </div>
  );
}
