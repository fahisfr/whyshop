import React from 'react';
import '../css/loading.css';
function Loading(props) {

    return (props.trigger) ? (
        <div className="loadingc">
            <div class="loader"></div>
        </div>
    ) : "";
}



export default Loading;
