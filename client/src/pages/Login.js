import React, { useState } from "react";
import axios from "../helper/axios";
import { Link } from "react-router-dom";
import "../styles/ls.scss";
import { useDispatch } from "react-redux";
import { login } from "../features/user";
import { triggerSidePopUp } from "../features/popUpMessage";

function Login() {
  const dispatch = useDispatch();
  const [number, setnumber] = useState("1111111111");
  const [password, setpassword] = useState("fahis123");
  const [focus, setFocus] = useState({ phoneNumber: false, password: false });
  const [btnLoading, setBtnLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/user/login", { number, password });

      dispatch(
        login({
          name: data.name,
          cart: [],
          number: data.number,
          isAuth: true,
        })
      );
      localStorage.setItem("auth_token", data.accessToken);
      dispatch(triggerSidePopUp({ message: "Logged in successfully" }));
    } catch (error) {}

    setBtnLoading(false);
  };
  const onBlur = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };
  return (
    <div className="ls-container">
      <div className="ls-box-wrappe">
        <form className="ls-form" onSubmit={onSubmit}>
          <div className="title">
            <h1> Login</h1>
          </div>

          <div className="ls-group">
            <label className="ls-label" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="ls-input"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              pattern=".{10,10}"
              value={number}
              placeholder="Enter your phone number"
              onChange={(e) => setnumber(e.target.value)}
              onBlur={onBlur}
              focus={focus.phoneNumber.toString()}
              required
            />
            <span className="invalid">Please enter vaild phone number</span>
          </div>

          <div className="ls-group">
            <label className="ls-label">Password</label>
            <input
              className="ls-input"
              id="password"
              name="password"
              type="password"
              pattern="[a-zA-Z0-9]{6,20}"
              placeholder="Enther your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              onBlur={onBlur}
              focus={focus.password.toString()}
              required
            />
          </div>
          <span className="invalid"> Password should be 6-20 characters</span>
          <Link className="link" to="/signup">
            <span>Create a new account</span>
          </Link>
          <div className={`ls-btn-wrappe ${btnLoading && "btn-loading"}`}>
            <button className="btn btn" type="submit">
              <span className="btn-text btn-text">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
