import React, { useState, useEffect } from "react";
import axios from "axios";
import AliceCarouselRecomendation from "./AliceCarouselRecomendation";
import ReactStars from "react-stars";
import "./alice-carousel.css";
import "./bookpage.css";
import Book from "./components/Book";
import Comment from "./components/Comment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "./components/Popup";
import { Badge, Button } from "reactstrap";

import {
  dataserverAPIBooksEndpoint,
  postserverAPIEndpoint
} from "../../../../constants/serverEndpoint";

export const BookPage = props => {
  const idBook = props.match.params.id;
  const [data, setData] = useState({});
  const [auth, setAuth] = useState(useSelector(state => state.auth));
  const [showPopup, setShowPopup] = useState(false);
  const [ratingval, setratingval] = useState(0);
  const [bookcomment, setBookComment] = useState("");
  const [commentData, setCommentData] = useState([]);

  console.log(commentData);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(postserverAPIEndpoint + "/book/" + idBook)
        .then(result => {
          console.log(result.data);
          setCommentData(result.data.posts);
        })
        .catch(err => console.log("Failed to get book data"));
    };
    fetchData();
  }, [idBook]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIBooksEndpoint + "/" + idBook)
        .then(result => {
          setData(result.data.data);
        })
        .catch(err => console.log("Failed to get book data"));
    };
    fetchData();
  }, [idBook]);

  const closebtn = () => {
    setShowPopup(false);
  };

  const ratingChanged = newRating => {
    setShowPopup(true);
    if (!auth.isAuthenticated == true) {
      console.log("User logged");
      setratingval(newRating);
    } else {
      console.log("Not Loggged");
    }
  };

  const ratingpopup = newRating => {
    setratingval(newRating);
  };

  const sendcomment = () => {
    const newComment = {
      bookid: idBook,
      description: bookcomment,
      rate: ratingval,
      scope: "public"
    };

    console.log("nc", newComment);

    axios
      .post(postserverAPIEndpoint, newComment)
      .then(comm => {
        console.log(comm);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const commentpopup = (
    <div className="popup-comment">
      <div>
        <ReactStars
          value={ratingval}
          count={5}
          onChange={ratingpopup}
          size={28}
          color2={"#ffd700"}
        />
        <textarea
          onChange={event => {
            setBookComment(event.target.value);
          }}
          maxLength="800"
          required="required"
          className="comment-textarea"
          resize="both"
          rows="5"
          cols="150"
          overflow="auto"
          placeholder="Podziel się swoją opinią na temata książki"
        />
        <Button className="float-right" onClick={sendcomment} color="primary">
          Opublikuj
        </Button>
      </div>
    </div>
  );

  const redirectpopup = (
    <div>
      {" "}
      <div className="popup-comment">
        Załóż konto lub zaloguj się aby korzystać z pełnych funkcjonalności
        strony
      </div>
      <div>
        <h2>
          <Badge color="primary">
            <Link to="/login"> Zaloguj się </Link>
          </Badge>
        </h2>
        <h2>
          {" "}
          <Badge color="secondary">
            <Link to="/register">Zarejestruj</Link>
          </Badge>
        </h2>
      </div>
    </div>
  );
  return (
    <React.Fragment>
      <div className="container bookpage">
        {data.book && (
          <Book
            bookdata={data.book}
            ratingChanged={ratingChanged}
            setShowPopup={setShowPopup}
          />
        )}
        {/* {data && (
          <Book
            bookdata={data}
            ratingChanged={ratingChanged}
            setShowPopup={setShowPopup}
          />
        )} */}
        <div className="row my-row">
          <div className="col-md-auto col-md-12 my-col">
            <div className="carousel-div">
              {data.similar_books && (
                <AliceCarouselRecomendation
                  books={data.similar_books}
                ></AliceCarouselRecomendation>
              )}
            </div>
          </div>
        </div>

        <div className="row my-row-comment">
          <div className="col-md-12 my-col text-center">
            <Comment comments={commentData} />
          </div>
        </div>

        <div>
          {showPopup ? (
            <Popup
              className="comment-popup"
              closePopup={closebtn.bind(this)}
              content={!auth.isAuthenticated ? redirectpopup : commentpopup}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};
