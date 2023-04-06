import axios from "../../helper/axios";
import React, { useState } from "react";
import "./sideBar.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiCart, BiCategoryAlt } from "react-icons/bi";
import { FiArchive } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import Confirmation from "../confirmation/Confirmation";
import { logout } from "../../features/user";

export default function SideNav({ trigger, setTrigger }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState({
    trigger: false,
    message: "",
    btnText: "",
  });

  const logoutNow = async () => {
    try {
      const { data } = await axios.delete("/logout");
      localStorage.removeItem("accesstoken");
      dispatch(logout());
      navigate("/login");
    } catch (error) {}
  };

  const onClick = (path) => {
    navigate(path);
    setTrigger(false);
  };

  return (
    <div className="sidenav-container">
      {confirmation.trigger && (
        <Confirmation
          {...confirmation}
          setTrigger={setConfirmation}
          confirmed={logoutNow}
        />
      )}

      <div
        className="sidenav-close-overlay"
        onClick={() => setTrigger(false)}
      ></div>
      <div className="sidenav-wrap ">
        <div className="sidenav-body">
          <div className="sidenav-item" onClick={() => setTrigger(false)}>
            <AiOutlineHome className="sidenav-item-icon" />
            <span className="sidenav-item-text">Home</span>
          </div>

          <div className="sidenav-item">
            <BiCart
              className="sidenav-item-icon"
              onClick={() => onClick("/cart")}
            />
            <span className="sidenav-item-text">Cart</span>
          </div>

          <div className="sidenav-item" onClick={() => onClick("/orders")}>
            <FiArchive className="sidenav-item-icon" />
            <span className="sidenav-item-text">Orders</span>
          </div>

          <div className="sidenav-item">
            <BiCategoryAlt
              className="sidenav-item-icon"
              onClick={() => onClick("/")}
            />
            <span className="sidenav-item-text">Category</span>
          </div>

          <div
            className="sidenav-item"
            onClick={() =>
              setConfirmation({
                trigger: true,
                message: "Are you sure you want to logout",
                btnText: "Logout",
              })
            }
          >
            <MdLogout className="sidenav-item-icon color-red" />
            <button className="sidenav-logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
