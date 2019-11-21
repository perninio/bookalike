import "./post.css";
import React, { useState, useEffect} from 'react'

export const Post = (props) => {
  useEffect(() => {
    // Zaktualizuj tytuł dokumentu korzystając z interfejsu API przeglądarki
    console.log(props);
  });	
    return (
      <div className="container">
	  <div className="row">
	    <div className="col-md-2 book my-col d-flex justify-content-center">
			<img src="https://skupszop.pl/images/books/9788377589915.jpg" width="120px"/>
		</div>
		<div className="col-md-10 my-col">
		<div className="float-left ">
			<img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" height="60px"/>
        </div>
		<div className="username-post float-left">{props.myprops1}</div>
		<div className="username-post float-right">ble</div>
		<div className="clearfix"/>
		<div className="description">	
			props.description		
        </div>
		</div>

		</div>
		 <div className="row">
		 <div className="offset-md-2 my-col col-md-10">
		 skomentuj ten post
		 </div>
		 </div>
      </div>
    ); 
}

export default Post;







