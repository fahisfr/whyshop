/** @format */

import React, { useEffect } from "react";
import "../styles/pageNotFount.css";
import Axios from "../axios";
import NavBar from "../components/Navbar";

function PageNotFount() {
  useEffect(() => {
    Axios.get("cliend/orders").then((res) => {
      console.log(res);
    });
  });
  return (
    <div className="notfount">
      <NavBar />
      <span style={{ fontSize: "2rem" }}>404 - Page Not Found</span>
    </div>
  );
}

export default PageNotFount;
