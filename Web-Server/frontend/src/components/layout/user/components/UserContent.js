import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import ImageUploader from "./ImageUploader";
import "./usercontent.css";
import UserInformation from "./UserInformation.js";
import Post from "./Post.js";
import { useSelector } from "react-redux";
import Axios from "axios";
import { webserverAPIUserEndpoint } from "../../../../constants/serverEndpoint";

const x = React.createContext({ myprops1: "prop1", myProp2: "prop2" });

const UserContent = ({ posts, profile }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [barAniamtion, setBarAnimation] = useState(false);
  const [activeTag, setActiveTag] = useState(1);
  const user = useSelector(state => state.auth.user);

  const closePopup = () => {
    setShowPopup(!showPopup);
    setisActive(!isActive);
  };

  const switchContentInfo = () => {
    setActiveTag(3);
  };

  const switchContentLibrary = () => {
    setActiveTag(2);
  };

  const switchContentPosts = () => {
    setActiveTag(1);
  };

  const addToFriend = () => {
    Axios.post(webserverAPIUserEndpoint + "/" + profile.id + "/relationship")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const isTop = window.scrollY;
      if (isTop > 120) {
        setBarAnimation(true);
      } else {
        setBarAnimation(false);
      }
    });
  });

  return (
    <div>
      <div class="container user-container">
        <div class={barAniamtion ? "userpanel-inactive" : "userpanel"}>
          <div className="user-image float-left">
            <img
              className="user-profile-img"
              src={profile.graphic}
              height="100px"
            />
            {user.id == profile.id && (
              <div>
                <button onClick={closePopup.bind(this)}>
                  Aktualizuj zdjęcie
                </button>
              </div>
            )}
          </div>
          <div className="float-left">
            <h4>{profile.firstname + " " + profile.lastname} </h4>
          </div>
          {user.id != undefined && user.id != profile.id && (
            <div className="float-right">
              <button onClick={addToFriend()}>Dodaj znajomego</button>
            </div>
          )}
        </div>

        <div class="clearfix" />
        <div>
          {showPopup ? (
            <Popup
              className="image-upload-popup"
              closePopup={closePopup.bind(this)}
              content={<ImageUploader />}
            />
          ) : null}
        </div>
        <div className={isActive ? "stickbar" : "stickbar-inactive"}>
          <div className={barAniamtion ? " tag-bar-move" : "tag-bar"}>
            <img
              className={barAniamtion ? "tag-bar-name-phone" : "tag-bar-name"}
              src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
              height="30px"
            />
            <div
              className={barAniamtion ? "tag-bar-name-phone" : "tag-bar-name"}
            >
              {" "}
              <h5>{profile.firstname + " " + profile.lastname}</h5>
            </div>
            <button onClick={switchContentPosts.bind(this)}>Posty</button>
            <button onClick={switchContentLibrary.bind(this)}>
              Biblioteczka
            </button>
            <button onClick={switchContentInfo.bind(this)}>Informacje</button>
          </div>
        </div>
        <div className="profile-content">
          {activeTag == 3 ? (
            <UserInformation />
          ) : activeTag == 2 ? (
            <div>Biblioteka </div>
          ) : activeTag == 1 ? (
            <div>
              {posts &&
                posts.map((item, index) => {
                  return (
                    <Post
                      postingusername={
                        item.user.firstname + " " + item.user.lastname
                      }
                      id={item.user.userid}
                      index={index}
                      posttext={item.text}
                      graphic={item.user.graphic}
                      fun={() => {}}
                      show={setShowPopup}
                      setIndex={() => {}}
                    />
                  );
                })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserContent;
