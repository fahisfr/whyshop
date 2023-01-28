import React from "react";
import "../styles/loading.css";
function Loading(props) {
  return props.trigger ? (
    <div className="loadingc">
      <div class="loader"></div>
    </div>
  ) : (
    ""
  );
}

export default Loading;
