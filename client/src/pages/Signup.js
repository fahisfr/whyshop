import "../styles/ls.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { login } from "../features/user";
import PopUp from "../components/PopUp";
import Loading from "../components/Loading";

function Signup() {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [Pop, setPop] = useState({ trigger: false, message: "" });
  const [loading, setloading] = useState(false);
  const submitNow = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/signup", {
        name,
        password,
        number,
        confirmPassword,
      });
      console.log(data)
      if (data.status) {
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
    } catch (error) {}
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
          <form className="ls-2-form" onSubmit={submitNow}>
            <h1>Create a new account</h1>
            <div className="ls-group">
              <label>User Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="User Name"
              />
            </div>
            <div className="ls-group">
              <label>Phone</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setnumber(e.target.value)}
                placeholder="Phone Number"
              />
            </div>
            <div className="ls-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enther Password"
              />
            </div>
            <div className="ls-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enther password"
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>

            <Link className="link" to="/login">
              <span>Already have an account?</span>
            </Link>
            <div className="ls-form-bt">
              <button className="btn" type="submit">
                <span className="btn-text">Sign Up</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
