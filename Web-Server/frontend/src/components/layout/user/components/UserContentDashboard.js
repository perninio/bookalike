import React, { useEffect, useState, forceUpdate } from "react";
import Popup from "./Popup";
import "./usercontentdashboard.css";
import UserInformation from "./UserInformation.js";
import Post from "./Post.js";
//import postsjson from "./posts.json";
import { Button, ButtonGroup } from "reactstrap";
import Axios from "axios";
import { postserverAPIEndpoint } from "../../../../constants/serverEndpoint";

const UserContentDashboard = ({ data, posts, setReload }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [barAniamtion, setBarAnimation] = useState(false);
  const [activeTag, setActiveTag] = useState(1);
  const [posttext, setPostText] = useState("");
  const [eventText, seteventText] = useState(0);
  const [editindex, setIndex] = useState(0);
  const [status, setStatus] = useState("public");
  const [inpurbookid, setInputbookid] = useState(-1);

  const closePopup = () => {
    setShowPopup(!showPopup);
    setisActive(!isActive);
  };

  const switchContentComments = () => {
    setActiveTag(2);
  };

  const switchContentAll = () => {
    setActiveTag(1);
  };

  const switchContentPosts = () => {
    setActiveTag(3);
  };

  const sendpost = bookid => {
    const newPost = {
      bookid: bookid == -1 ? null : parseInt(bookid),
      description: posttext,
      scope: status
    };
    Axios.post(postserverAPIEndpoint, newPost)
      .then(comm => {
        console.log(comm);
        window.location.reload(true);
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
      <div class="container">
        <div className="stickbar-dashboard">
          <img
            className="post-photo"
            src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
            height="40px"
          />
          <textarea
            onChange={event => {
              setPostText(event.target.value);
              seteventText(event.target);
            }}
            name="message"
            resize="both"
            rows="5"
            cols="150"
            overflow="auto"
            placeholder="Co słychać?"
          />
          <div className="float-left">
            <select
              value={status}
              class="form-control"
              id="selectStatus"
              onChange={e => {
                setStatus(e.target.value);
              }}
            >
              <option value="public">Publiczny</option>
              <option value="friends">Przyjaciele</option>
              <option value="private">Prywatny</option>
            </select>
          </div>
          <div className="float-left">
            <input
              type="text"
              name="bookid"
              onChange={e => {
                setInputbookid(e.target.value);
              }}
              placeholder="id książki (opcjonalnie)"
            />
          </div>
          <button
            className="float-right"
            onClick={() => {
              sendpost(inpurbookid);
            }}
          >
            Opublikuj
          </button>
        </div>
      </div>
      {<div></div>}
      <div className={isActive ? "stickbar" : "stickbar-inactive"}>
        <div className="tag-bar-posts">
          <button onClick={switchContentAll.bind(this)}>Wszystkie</button>
          <button onClick={switchContentPosts.bind(this)}>Posty</button>
          <button onClick={switchContentComments.bind(this)}>Komentarze</button>
        </div>
      </div>
      <div className="profile-content">
        {activeTag == 3 ? (
          <div>Posty</div>
        ) : activeTag == 2 ? (
          <div>Komentarze</div>
        ) : activeTag == 1 ? (
          <div>
            {data &&
              data.map((item, index) => {
                return (
                  <Post
                    postingusername={
                      item.user.firstname + " " + item.user.lastname
                    }
                    userid={item.user.userid}
                    bookid={item.bookid}
                    rate={item.rate}
                    postid={item._id}
                    index={index}
                    posttext={item.description}
                    graphic={item.user.graphic}
                    show={setShowPopup}
                    setIndex={setIndex}
                  />
                );
              })}
          </div>
        ) : null}
      </div>
      {showPopup ? (
        <Popup
          className="image-upload-popup"
          closePopup={closePopup.bind(this)}
          content={
            <div class="container">
              <div className="stickbar-dashboard">
                <textarea
                  onChange={event => {
                    setPostText(event.target.value);
                    seteventText(event.target);
                  }}
                  name="message"
                  resize="both"
                  rows="5"
                  cols="150"
                  overflow="auto"
                  placeholder="Co słychać?"
                />
                <div className="float-right">
                  <div className="float-left">
                    <select
                      value={status}
                      class="form-control"
                      id="selectStatus"
                      onChange={e => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="public">Publiczny</option>
                      <option value="friends">Przyjaciele</option>
                      <option value="private">Prywatny</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      sendpost(data[editindex].bookid);
                    }}
                  >
                    Edytuj
                  </button>
                </div>
              </div>
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default UserContentDashboard;
