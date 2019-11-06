import React from "react";
import "./popup.css";

export const Popup = props => {
    return (
      <div className="popup">
        <div className="popup_inner">
		 <button className="closebtn" onClick={props.closePopup}>x</button>		
			  {props.content}  
        </div>
      </div>
    ); 
}

export default Popup;
