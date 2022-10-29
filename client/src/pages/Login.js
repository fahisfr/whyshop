import React, { useState } from "react";
import Axios from "../axios";
import { Link } from "react-router-dom";
import "../css/login.css";
import { useDispatch } from "react-redux";
import { login } from "../features/user";
import PopUp from "../components/PopUp";
import Loading from "../components/Loading";

function Login() {
  const dispatch = useDispatch();
  const [number, setnumber] = useState();
  const [password, setpassword] = useState("");
  const [Pop, setPop] = useState({ trigger: false, success: false, message: "" });
  const [loading, setloading] = useState(false);
  function loginform(e) {
    e.preventDefault();
    setloading(true);
    Axios.post("/login", { number, password })
      .then((result) => {
        setloading(false);
        if (result.data.success) {
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
          setPop({ trigger: true, success: false, message: result.data.message });
        }
      })
      .catch((res) => setPop({ trigger: true, success: false, message: res.message }));
  }
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
            <h1>Login</h1>
            <label>Phone</label>
            <input
              type="number"
              value={number}
              placeholder="Phone Number"
              onChange={(e) => setnumber(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enther Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Link className="remove-line" to="/signup">
              <span>Create a new account</span>
            </Link>
            <button onClick={loginform}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
