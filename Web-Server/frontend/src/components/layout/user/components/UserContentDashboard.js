import React, { useEffect, useState, forceUpdate } from "react";
import Popup from "./Popup";
import "./usercontentdashboard.css";
import UserInformation from "./UserInformation.js"
import Post from "./Post.js"
import postsjson from "./posts.json"

const UserContentDashboard = ({ data, fun, posts, setReload }) => {
	const [showPopup, setShowPopup] = useState(false)
	const [isActive, setisActive] = useState(true)
	const [barAniamtion, setBarAnimation] = useState(false)
	const [activeTag, setActiveTag] = useState(1)
	const [posttext, setPostText] = useState("")
	const [eventText, seteventText] = useState(0)
	const [editindex,setIndex]=useState(0)

	const closePopup = () => {
		setShowPopup(!showPopup)
		setisActive(!isActive)
	}
	
	const switchContentComments = () => {
		setActiveTag(2)
	}

	const switchContentAll = () => {
		setActiveTag(1)
	}

	const switchContentPosts = () => {
		setActiveTag(3)
	}

	const sendpost = () => {
		if (posttext != "") {
			console.log(posttext);
			posts.unshift({
				imie: "Czarek",
				id: "1",
				nazwisko: "Pernak",
				text: posttext,
				graphic: "https://skupszop.pl/images/books/9788377589915.jpg"
			})
			setPostText("");
			eventText.value = ""
			setReload(posts.length)
		}

	}

	const updatepost = () => {
		if (posttext != "") {
			console.log(posttext);
			posts[editindex]={
				imie: "Czarek",
				id: "1",
				nazwisko: "Pernak",
				text: posttext,
				graphic: "https://skupszop.pl/images/books/9788377589915.jpg"
			}
			setPostText("");
			eventText.value = ""
			setReload(posts.length)
			setShowPopup(false)
			console.log(showPopup)
		}

	}

	useEffect(() => {
		document.addEventListener('scroll', () => {
			const isTop = window.scrollY;
			if (isTop > 120) {
				setBarAnimation(true);
			} else {
				setBarAnimation(false);
			}
		})
	})

	return (
		<div>
			<div class="container">
				<div className='stickbar-dashboard'>
					<img className="post-photo" src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" height="40px" />
					<textarea onChange={(event) => { setPostText(event.target.value); seteventText(event.target); }} name="message" resize="both" rows="5" cols="150" overflow="auto" placeholder="Co słychać?" />
					<button className="float-right" onClick={sendpost}>Opublikuj</button>
				</div>
			</div>
			{<div>
			</div>}
			<div className={isActive ? 'stickbar' : 'stickbar-inactive'}>
				<div className="tag-bar-posts">
					<button onClick={switchContentAll.bind(this)}>Wszystkie</button>
					<button onClick={switchContentPosts.bind(this)}>Posty</button>
					<button onClick={switchContentComments.bind(this)}>Komentarze</button>
				</div>
			</div>
			<div className="profile-content">
				{
					activeTag == 3 ? (
						<div>Posty</div>
					) :
						activeTag == 2 ? (
							<div>Komentarze</div>
						) :
							activeTag == 1 ? (
								<div>
									{data && data.map((item, index) => { return <Post postingusername={item.user.firstname + " " + item.user.lastname} id={item.user.userid} index={index} posttext={item.text} graphic={item.user.graphic} fun={fun} show={setShowPopup} setIndex={setIndex} /> })}
								</div>
							) :
								null
				}
			</div>
			{showPopup ? (
					<Popup className="image-upload-popup"
						closePopup={closePopup.bind(this)}
						content={<div class="container">
							<div className='stickbar-dashboard'>
								<textarea onChange={(event) => { setPostText(event.target.value); seteventText(event.target); }} name="message" resize="both" rows="5" cols="150" overflow="auto" placeholder="Co słychać?" />
								<div><button className="float-right" onClick={updatepost}>Edytuj</button></div>
							</div>
						</div>}
					/>
				) : null}
		</div>
	);
}


export default UserContentDashboard;
