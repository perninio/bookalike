import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import AliceCarouselRecomendation from "./AliceCarouselRecomendation";
import "./alice-carousel.css";
import "./bookpage.css";
import Book from "./components/Book";
import Comment from "./components/Comment";
import { useSelector, useDispatch } from "react-redux";
import Popup from "./components/Popup"
import { Badge } from 'reactstrap';

import { dataserverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

export const BookPage = props => {
  const idBook = props.match.params.id;
  const [data, setData] = useState({});
  const [auth, setAuth] = useState(useSelector(state => state.auth));
  const [showPopup, setShowPopup] = useState(false)
  const closebtn = () => {
    setShowPopup(false)
  }

  const ratingChanged = newRating => {
    setShowPopup(true)
    if (auth.isAuthenticated == true) {
      console.log("ok")
    }
    else {
      console.log("notok")
    }
    console.log(newRating);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIBooksEndpoint + "/" + idBook)
        .then(result => {
          setData(result.data.data);
        })
        .catch(err => console.log("XD"));
    };
    fetchData();
  }, [idBook]);
  /*Test Data*/

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get('https://my-json-server.typicode.com/perninio/hello-world/data')
        .then(result => {
          setData(result.data[0]);
          console.log(result.data[0]);
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, [idBook]);

  const commentpopup = <div className="popup-comment">"Napisz swój komentarz"</div>

  const redirectpopup = <div> <div className="popup-comment">Załóż konto lub zaloguj się aby korzystać z pełnych funkcjonalności strony</div>
    <div>
      <h2><Badge color="primary"><a href="/"> Zaloguj się </a></Badge></h2>
      <h2> <Badge color="secondary"><a href="/register">Zarejestruj</a></Badge></h2>
    </div>
  </div>

  const comment={
    "desc":"Świetna książka. Bardzo mi się podobała",
    "imie":"Przemysław Pernak",
    "graphic":"https://image.ibb.co/jw55Ex/def_face.jpg"

  }
  
  return (
    <React.Fragment>
      <div class="container bookpage">
        {data.book && <Book bookdata={data.book} ratingChanged={ratingChanged}/>}
        {data && <Book bookdata={data} ratingChanged={ratingChanged} setShowPopup={setShowPopup} />}
        <div class="row my-row">
          <div class="col-md-auto col-md-12 my-col">
            <div class="carousel-div">
              <AliceCarouselRecomendation></AliceCarouselRecomendation>
            </div>
          </div>
        </div>

        <div class="row my-row-comment">
          <div class="col-md-12 my-col text-center">
            <Comment data={comment}/>
          </div>
        </div>

        <div>
          {showPopup ? (
            <Popup className="comment-popup"
              closePopup={closebtn.bind(this)}
              content={auth.isAuthenticated ? { commentpopup } : redirectpopup}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};
