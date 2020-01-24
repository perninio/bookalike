import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import ImageUploader from "./ImageUploader";
import "./usercontent.css";
import UserInformation from "./UserInformation.js";
import Post from "./Post.js";
import Library from "./Library.js";
import { useSelector } from "react-redux";
import Axios from "axios";
import {
  webserverAPIUserEndpoint,
  postserverAPIEndpoint
} from "../../../../constants/serverEndpoint";
import { Link } from "react-router-dom";

const x = React.createContext({ myprops1: "prop1", myProp2: "prop2" });

const UserContent = ({ posts, profile, userid }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [barAniamtion, setBarAnimation] = useState(false);
  const [activeTag, setActiveTag] = useState(1);
  const [relation, setRelation] = useState("");
  console.log(relation);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      Axios.get(webserverAPIUserEndpoint + "/" + userid + "/relationship")
        .then(result => {
          setRelation(result.data.relation_type);
        })
        .catch(err => console.log("Failed to get book data"));
    };
    fetchData();
  }, [userid]);

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

  const deleteButton = (
    <div className="float-right">
      <button
        className="btn btn-danger"
        onClick={() => {
          deleteFriend();
        }}
      >
        Usuń znajomego
      </button>
    </div>
  );
  const deleteFriend = () => {
    Axios.delete(webserverAPIUserEndpoint + "/" + userid + "/relationship")
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const acceptButton = (
    <div className="float-right">
      <button
        className="btn btn-primary"
        onClick={() => {
          acceptInvitation();
        }}
      >
        Zaakceptuj zaproszenie
      </button>
    </div>
  );
  const acceptInvitation = () => {
    const payload = {
      relation_type: "accepted_request"
    };
    Axios.put(
      webserverAPIUserEndpoint + "/" + userid + "/relationship",
      payload
    )
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cancelButton = (
    <div className="float-right">
      <button
        className="btn btn-danger"
        onClick={() => {
          cancelInvitation();
        }}
      >
        Anuluj zaproszenie
      </button>
    </div>
  );

  const cancelInvitation = () => {
    Axios.delete(webserverAPIUserEndpoint + "/" + userid + "/relationship")
      .then(res => {
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addButton = (
    <div className="float-right">
      <button
        className="btn btn-success"
        onClick={() => {
          addToFriend();
        }}
      >
        Dodaj znajomego
      </button>
    </div>
  );
  const addToFriend = () => {
    Axios.post(webserverAPIUserEndpoint + "/" + userid + "/relationship")
      .then(res => {
        window.location.reload(false);
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
        <div class="user-container">
          <div class={"userpanel"}>
            <div className="user-image float-left">
              <img
                className="user-profile-img"
                src={profile.graphic}
                height="100px"
                width="100px"
              />
              {user.id == profile.id && (
                <div>
                  <Link className="btn btn-secondary" to={"/profile/edit"}>
                    Aktualizuj profil
                  </Link>
                </div>
              )}
            </div>
            <div className="float-left">
              <h4>{profile.firstname + " " + profile.lastname} </h4>
            </div>
            {user.id != undefined &&
              user.id != profile.id &&
              relation == "no_relation" &&
              addButton}
            {user.id != undefined &&
              user.id != profile.id &&
              relation == "uid1_send_request" &&
              cancelButton}
            {user.id != undefined &&
              user.id != profile.id &&
              relation == "uid1_got_request" &&
              acceptButton}
            {user.id != undefined &&
              user.id != profile.id &&
              relation == "friends" &&
              deleteButton}
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
                width="30px"
              />
              <div
                className={barAniamtion ? "tag-bar-name-phone" : "tag-bar-name"}
              >
                {" "}
                <h5>{profile.firstname + " " + profile.lastname}</h5>
              </div>
              <div className="buttons">
                <button onClick={switchContentPosts.bind(this)}>
                  <i class="fas fa-sticky-note"></i> Posty
                </button>
                <button
                  id="biblioteczka"
                  onClick={switchContentLibrary.bind(this)}
                >
                  <i class="fas fa-book"></i>
                </button>
                <button onClick={switchContentInfo.bind(this)}>
                  <i class="far fa-address-book"></i> Informacje
                </button>
              </div>
            </div>
          </div>
          <div className="profile-content">
            {activeTag == 3 ? (
              <UserInformation />
            ) : activeTag == 2 ? (
              <Library />
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
                        posttext={item.description}
                        userid={item.user.userid}
                        bookid={item.bookid}
                        rate={item.rate}
                        graphic={item.user.graphic}
                        postid={item._id}
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
    </div>
  );
};

export default UserContent;
