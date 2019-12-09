import "./popup.css";
import React, { useState, useEffect } from "react";

export const Popup = props => {
  return (
    <div className="popup" style={{ zIndex: "2" }}>
      <div className="popup_inner">
        <button className="closebtn" onClick={props.closePopup}>
          x
        </button>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
