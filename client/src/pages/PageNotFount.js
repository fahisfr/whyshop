import React, { useEffect } from "react";
import "../styles/pageNotFount.css";
import Axios from "../axios";

function PageNotFount() {
  useEffect(() => {
    Axios.get("cliend/orders").then((res) => {
      console.log(res);
    });
  });
  return (
    <div className="notfount">
      <span style={{ fontSize: "2rem" }}>404 - Page Not Found</span>
    </div>
  );
}

export default PageNotFount;
