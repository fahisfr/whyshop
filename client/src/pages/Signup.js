
import "../styles/ls.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { login } from "../features/user";
import { triggerSidePopUp } from "../features/popUpMessage";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const [focus, setFocus] = useState({
    name: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });

  const onBlur = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  const submitNow = async (e) => {
    try {
      setBtnLoading(true);
      e.preventDefault();
      const { data } = await axios.post("/signup", {
        name,
        password,
        number,
        confirmPassword,
      });
      if (data.status === "ok") {
        dispatch(
          login({
            name: data.name,
            cart: [],
            number: data.number,
            isAuth: true,
          })
        );
        localStorage.setItem("accesstoken", data.accesstoken);
        dispatch(triggerSidePopUp({ message: "Logged in successfully" }));
        navigate("/");
      } else {
        dispatch(triggerSidePopUp({ error: data.error }));
      }
    } catch (error) {
      dispatch(triggerSidePopUp({ error: error.message }));
    } finally {
      setBtnLoading(false);
    }
  };
  return (
    <div className="ls-container">
      <div className="ls-box-wrappe">
        <form className="ls-form" onSubmit={submitNow}>
          <div className="title">
            <h1>Create a new account</h1>
          </div>

          <div className="ls-group">
            <label className="ls-label" for="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="ls-input"
              pattern="[a-zA-Z0-9]{3,13}"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              onBlur={onBlur}
              focus={focus.name.toString()}
              required
            />
            <span className="invalid">
              User name must be at least 4 characters
            </span>
          </div>
          <div className="ls-group">
            <label for="phone_number">Phone Number</label>
            <input
              type="text"
              maxlength="10"
              id="phone_number"
              name="phoneNumber"
              max="10"
              pattern=".{10,10}"
              placeholder="Enter phone number"
              className="ls-input"
              value={number}
              onBlur={onBlur}
              onChange={(e) => setnumber(e.target.value)}
              focus={focus.phoneNumber.toString()}
              required
            />{" "}
            <span className="invalid">Please enter vaild phone number</span>
          </div>

          <div className="ls-group">
            <label className="ls-label" for="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              pattern="[a-zA-Z0-9]{6,20}"
              placeholder="Enter your password"
              className="ls-input"
              value={password}
              onBlur={onBlur}
              onChange={(e) => setpassword(e.target.value)}
              focus={focus.password.toString()}
              required
            />
            <span className="invalid">Password should be 6-20 characters</span>
          </div>
          <div className="ls-group">
            <label className="ls-label" for="confirm_password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirmPassword"
              className="ls-input"
              placeholder="Enter you confirm password"
              value={confirmPassword}
              pattern={password}
              onBlur={onBlur}
              onChange={(e) => setconfirmPassword(e.target.value)}
              focus={focus.confirmPassword.toString()}
              required
            />
            <span className="invalid">Password not matching</span>
          </div>

          <Link className="link" to="/login">
            <span>Already have an account?</span>
          </Link>
          <div className={`ls-btn-wrappe ${btnLoading && "btn-loading"}`}>
            <button className="btn ld-btn" type="submit">
              <span className="btn-text ld-text">Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
