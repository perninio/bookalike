import "./post.css";
import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export const Post = (props) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const toggle = () => setDropdownOpen(prevState => !prevState);
	const editpost = () => { console.log("edit post") };
	const deletepost = () => { console.log("delete post") };

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-2 book my-col d-flex justify-content-center">
					<img src={props.graphic} width="120px" alt="postbookimage" />
					
				</div>
				<div className="col-md-10 my-col">
					<div className="float-left ">
						<a href={"user-page/" + props.id}>
							<img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" alt="userimage" height="55px" />
						</a>
					</div>
					<a href={"user-page/" + props.id} >
						<div className="username-post float-left">{props.postingusername}</div>
					</a>
					<div className="username-post float-right">
						<Dropdown isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle caret>
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem onClick={editpost}>Edytuj post</DropdownItem>
								<DropdownItem onClick={deletepost}>Usuń post</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className="clearfix" />
					<div className="description">
						{props.posttext}
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







