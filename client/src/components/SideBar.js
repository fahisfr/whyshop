/** @format */

import axios from "../axios";
import React from "react";
import "../styles/sideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai";
import { BiCart, BiCategoryAlt } from "react-icons/bi";
import { FiActivity, FiArchive } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
function SIdeBar({ trigger, setTrigger }) {
  const { name, number, isAuth } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const logoutNow = () => {
  //   axios.delete("logout").then((response) => {
  //     localStorage.removeItem("accesstoken");
  //     dispatch(logout());
  //     setTrigger(false);
  //   });
  // };

  const onClick = (path) => {
    navigate(path);
    setTrigger(false);
  };

  return trigger ? (
    <div className="sidebar-container">
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
          <div className="sr-group">
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
