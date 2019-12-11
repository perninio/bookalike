import "./post.css";
import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  dataserverAPIBooksEndpoint,
  webserverAPIBookEndpoint,
  postserverAPIEndpoint
} from "../../../../constants/serverEndpoint";
import { templateLiteral } from "@babel/types";

export const Post = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const auth = useSelector(state => state.auth);
  const [postcomment, setPostComment] = useState("");
  const [textarearef, setTextAreaRef] = useState(0);
  const [bookdata, setBookData] = useState({});
  const [rate, setRate] = useState(props.rate);

  const sendcomment = () => {
    console.log(postcomment);
  };

  const returnColor = perc => {
    var r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (props.bookid) {
        axios
          .get(dataserverAPIBooksEndpoint + "/" + props.bookid)
          .then(result => {
            setBookData(result.data.data);
          })
          .catch(err => console.log("Failed to get book data"));
      }
    };
    fetchData();
  }, []);

  const deletePost = postid => {
    console.log(postid);
    axios
      .delete(postserverAPIEndpoint + "/" + postid)
      .then(window.location.reload(false))
      .catch(err => console.log(err));
  };

  return (
    <div id={props.index} className="container postscontainer">
      <div className="row">
        {bookdata.book && props.bookid && (
          <div className="col-md-2 book d-flex justify-content-center">
            <a href={webserverAPIBookEndpoint + props.bookid}>
              <img
                src={bookdata.book.graphic}
                width="120px"
                height="130px"
                alt="postbookimage"
              />
            </a>
            <div
              className="percentagevalue"
              style={{
                backgroundColor: returnColor(rate * 20),
                color: "white"
              }}
            >
              {rate}
            </div>
          </div>
        )}
        <div className={bookdata.bookid == null ? "col-md-10" : "col-md-12"}>
          <div className="float-left ">
            <a href={"user-page/" + props.userid}>
              <img className="user-profile-img" src={props.graphic} alt="userimage" height="55px" width="55" />
            </a>
          </div>
          <a href={"user-page/" + props.userid}>
            <div className="username-post float-left">
              {props.postingusername}
            </div>
          </a>
          {props.userid ==
            (auth.isAuthenticated == true ? auth.user.id : -1) ? (
              <div className="username-post float-right">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret></DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      id={props.index}
                      onClick={() => {
                        props.show(true);
                        props.setIndex(props.index);
                      }}
                    >
                      Edytuj post
                  </DropdownItem>
                    <DropdownItem
                      id={props.index}
                      onClick={() => {
                        deletePost(props.postid);
                      }}
                    >
                      Usuń post
                  </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            ) : null}
          <div className="clearfix" />
          <div className="description">{props.posttext}</div>
        </div>
      </div>
      <div className="row">
        <div
          className={
            props.bookid != ""
              ? "offset-md-2 my-col col-md-10 float-left"
              : "my-col col-md-12 float-left"
          }
        >
          <div>
            {props.comments.map(item => {
              return <div className="comment row pb-2 ml-2 mr-1"><div className="col-sm-12">
                <a>
                  <img className="comment-image float-left user-profile-img" width="30px" height="30px" />
                  {item.user.firstname} {item.user.lastname}
                </a>
              </div>
                <div className="postcomments col-sm-11 ml-3">{item.text}
                </div>
              </div>
            })}
          </div>
          {
            auth.isAuthenticated == true && (
              <React.Fragment>
                <div className="col-sm-11 pl=0 pr-0 ml-0">
                <textarea
                  className="commentbox"
                  onChange={event => {
                    setPostComment(event.target.value);
                    setTextAreaRef(event.target);
                  }}
                  name="message"
                  resize="both"
                  rows="1"
                  cols="140"
                  placeholder="Tutaj wpisz treść komentarza..."
                />
                <button
                  onClick={() => {
                    sendcomment();
                    textarearef.value = "";
                  }}
                >
                  Skomentuj
              </button>
              </div>
              </React.Fragment>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Post;
