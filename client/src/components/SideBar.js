/** @format */

import axios from "../axios";
import React from "react";
import "../styles/sideBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user";
import { Link } from "react-router-dom";

function SIdeBar(props) {
  const { name, number, isAuth } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const logoutNow = () => {
    axios.delete("logout").then((response) => {
      localStorage.removeItem("accesstoken");
      dispatch(logout());
      props.settrigger(false);
    });
  };
  return true ? (
    <div className="sidebar-container">
      {/* <div className="sidebar-wrap">
        <div className="sr-top">
          <div className="sr-top-left">
            <div>
              <img />
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <div className="sr-close"></div> */}
    </div>
  ) : (
    ""
  );
}
export default SIdeBar;
