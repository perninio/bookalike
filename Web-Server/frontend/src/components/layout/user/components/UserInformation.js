import "./userinformation.css";
import React, { useState, useEffect} from 'react'

export const UserInformation = props => {	
    return (
      <div className="UserInfo">
		<div className="text-right">
		 <button className="Edit-Info">Aktualizuj Profil</button>
		 <button className="Edit-Info">Stwórz własne tagi opisu</button>		 
			  </div>
			  <span>
			  <ul>
			  <li>
			  Data urodzenia: 
			  </li>
			  <li>
			  O mnie: 
			  </li>
			  </ul>
			  </span>

      </div>
    ); 
}

export default UserInformation;
