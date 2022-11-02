import React, { useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import "../styles/ls.scss";
import { useDispatch } from "react-redux";
import { login } from "../features/user";
import PopUp from "../components/PopUp";
import Loading from "../components/Loading";

function Login() {
  const dispatch = useDispatch();
  const [number, setnumber] = useState("1111111111");
  const [password, setpassword] = useState("fahis123");
  const [Pop, setPop] = useState({ trigger: false, success: false, message: "" });
  const [loading, setloading] = useState(false);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setloading(!loading);

      const { data } = await axios.post("/login", { number, password });

      if (data.success) {
        dispatch(
          login({
            name: data.name,
            roel: data.roel,
            number: data.number,
            isAuth: true,
          })
        );
        localStorage.setItem("accesstoken", data.accesstoken);
      }
    } catch (error) {
      alert(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="ls-container">
      <div className="ls-box">
        <div className="ls-box-1">
          <img
            className="ls-1-image"
            src={process.env.PUBLIC_URL + "/frshopLS.jpg"}
            alt="logo"
          />
        </div>
        <div className="ls-box-2">
          <form className="ls-2-form" onSubmit={onSubmit}>
            <h1 className="title">Login</h1>
            <div className="ls-group">
              <label>Phone Number</label>
              <input
                type="number"
                value={number}
                placeholder="Enter your phone number"
                onChange={(e) => setnumber(e.target.value)}
              />
            </div>

            <div className="ls-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enther your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <Link className="link" to="/signup">
              <span>Create a new account</span>
            </Link>
            <div className={`ls-form-bt ${loading && "btn-loading"}`}>
              <button className="btn" type="submit">
                <span className="btn-text">Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
