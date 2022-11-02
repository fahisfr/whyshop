import React from "react";
import "../styles/popUp.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineInfoCircle } from "react-icons/ai";

function Pop(props) {
  const navigate = useNavigate();
  const PopOff = () => {
    if (props.Pop.success) {
      props.setPop(false);
      navigate("/");
    } else {
      props.setPop(false);
    }
  };
  return props.Pop.trigger ? (
    <div onClick={() => PopOff()} className="pop-up">
      {props.Pop.success ? (
        <div className="pop-up-content">
          <div className="pop-up-content-header">
            <AiOutlineCheckCircle color="green" size={57} />
          </div>
          <div className="pop-up-content-body">
            <span className="pop-up-message">{props.Pop.message}</span>
          </div>

          <div className="pop-up-content-button">
            <button onClick={() => PopOff()} className="pop-up-button">
              Ok
            </button>
          </div>
        </div>
      ) : (
        <div className="pop-up-content">
          <div className="pop-up-content-header">
            <AiOutlineInfoCircle color="red" size={57} />
          </div>
          <div className="pop-up-content-body">
            <span className="pop-up-message" style={{ color: "red" }}>
              {props.Pop.message}
            </span>
          </div>

          <div className="pop-up-content-button">
            <button
              onClick={() => PopOff()}
              className="pop-up-button"
              style={{ backgroundColor: "red" }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}
export default Pop;
