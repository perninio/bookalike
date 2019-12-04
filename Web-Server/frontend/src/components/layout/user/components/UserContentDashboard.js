import React, { useEffect, useState , forceUpdate } from "react";
import Popup from "./Popup";
import "./usercontentdashboard.css";
import UserInformation from "./UserInformation.js"
import Post from "./Post.js"
import postsjson from "./posts.json"

const UserContentDashboard = ({data,fun}) => {
	const [showPopup, setShowPopup] = useState(false)
	const [isActive, setisActive] = useState(true)
	const [barAniamtion, setBarAnimation] = useState(false)
	const [activeTag, setActiveTag] = useState(1)
	const [posttext,setPostText]=useState("")
	const [posts,setPosts]=useState(data)
	const [newposts,setNewPosts]=useState([])
	const [eventText,seteventText]=useState(0)

console.log(data)


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
		if(posttext!=""){
		console.log(posttext);
		newposts.unshift({
            imie: "Czarek",
            id: "1",
            nazwisko:"Pernak",
            text:posttext,
            graphic:"https://skupszop.pl/images/books/9788377589915.jpg"
		})
		setPostText("");
		eventText.value=""
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

					<textarea onChange={(event) => { setPostText(event.target.value);seteventText(event.target); }} name="message" resize="both" rows="5" cols="150" overflow="auto" placeholder="Co słychać?" />
					<button className="float-right" onClick={sendpost}>Opublikuj</button>
				</div>
			</div>
			{/*<div>
				{showPopup ? (
					<Popup className="image-upload-popup"
						closePopup={closePopup.bind(this)}
						content={<ImageUploader />}
					/>
				) : null}
				</div>*/}
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
							<div>Komentarze </div>
						) :
							activeTag == 1 ? (
								<div>wszystkie
								{/* {posts.posts.map((item) => { return <Post postingusername={item.imie + " " + item.nazwisko} id={item.id} posttext={item.text} graphic={item.graphic} /> })} */}
								{/* mocup */}
								{/*newposts.map((item) => { return <Post postingusername={item.imie + " " + item.nazwisko} id={item.id} posttext={item.text} graphic={item.graphic}  fun={fun}/> })*/} 
								{data.map((item) => console.log(item))}
								{/*{ return <Post postingusername={item.imie + " " + item.nazwisko} id={item.id} posttext={item.text} graphic={item.graphic} fun={fun}/> })}*/}
								</div>
							) :
								null
				}
			</div>
		</div>
	);
}


export default UserContentDashboard;
