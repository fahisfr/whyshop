/** @format */

import axios from "../axios";
import React, { useState } from "react";
import "../styles/sideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai";
import { BiCart, BiCategoryAlt } from "react-icons/bi";
import { FiActivity, FiArchive } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import Confirmation from "./Confirmation";
function SIdeBar({ trigger, setTrigger }) {
  const { name, number, isAuth } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState({
    trigger: false,
    message: "",
    btnText: "",
  });

  const LogoutNow = () => {
    localStorage.removeItem("accesstoken");
    const { data } = axios.delete("/logout");
    navigate("/login");
  };

  const onClick = (path) => {
    navigate(path);
    setTrigger(false);
  };

  return trigger ? (
    <div className="sidebar-container">
      {confirmation.trigger && (
        <Confirmation
          {...confirmation}
          setTrigger={setConfirmation}
          confirmed={LogoutNow}
        />
      )}

      <div className="sr-close" onClick={() => setTrigger(false)}></div>
      <div className="sidebar-wrap slider-on">
        <div className="sr-body">
          <div className="sr-group" onClick={() => onClick("/")}>
            <AiOutlineHome className="sr-icon" />
            <span className="sr-text">Home</span>
          </div>

          <div className="sr-group">
            <BiCart className="sr-icon" onClick={() => onClick("/cart")} />
            <span className="sr-text">Cart</span>
          </div>

          <div className="sr-group" onClick={() => onClick("/orders")}>
            <FiArchive className="sr-icon" />
            <span className="sr-text">Orders</span>
          </div>

          <div className="sr-group">
            <BiCategoryAlt className="sr-icon" onClick={() => onClick("/")} />
            <span className="sr-text">Category</span>
          </div>
          <div className="sr-group" onClick={() => onClick("/feedback")}>
            <VscFeedback className="sr-icon" />
            <span className="sr-text">FeedBack</span>
          </div>
          <div
            className="sr-group"
            onClick={() =>
              setConfirmation({
                trigger: true,
                message: "Are you sure you want to logout",
                btnText: "Logout",
              })
            }
          >
            <MdLogout className="sr-icon color-red" />
            <button className="sr-logout-btn">Logout</button>
          </div>
        </div>
      </div>
      <div className="sr-pd"></div>
    </div>
  ) : (
    ""
  );
}
export default SIdeBar;
