import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../axios";
import "../css/signup.css";
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
  const sumbitform = (e) => {
    e.preventDefault();
    setloading(true);
    Axios.post("/signup", { name, number, password, confirmPassword })
      .then((result) => {
        setloading(false);
        if (result.data.status) {
          dispatch(
            login({
              name: result.data.name,
              roel: result.data.roel,
              number: result.data.number,
              isAuth: true,
            })
          );
          localStorage.setItem("accesstoken", result.data.accesstoken);
        } else {
          setPop({ trigger: true, message: result.data.message });
        }
      })
      .catch((err) => setPop({ trigger: true, message: err.message }));
  };
  return (
    <div className="signup-container">
      <Loading trigger={loading} />
      <PopUp Pop={Pop} setPop={setPop} />
      <div className="signup-box">
        <div className="signup-box-1">
          <img
            className="signup-1-image"
            src={process.env.PUBLIC_URL + "/frshopLS.jpg"}
            alt="logo"
          />
        </div>
        <div className="signup-box-2">
          <form className="signup-2-from">
            <h1>Create a new account</h1>
            <label>User Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="User Name"
            />
            <label>Phone</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              placeholder="Phone Number"
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enther Password"
            />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enther password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <Link className="remove-line" to="/login">
              <span>Already have an account?</span>
            </Link>
            <button onClick={sumbitform}>Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
