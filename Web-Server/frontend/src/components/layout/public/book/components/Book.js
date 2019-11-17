import React, { useState } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import "./book.css"

const Book = ({ bookdata }) => {
  const [readclicked, setReadClicked] = useState(false);
  const [wantreadclicked, setWantReadClicked] = useState(false);
  const [ownclicked, setOwnClicked] = useState(false);
  const ratingChanged = newRating => {
    console.log(newRating);
  };

  const bookread = () => {

    setReadClicked(!readclicked);

    /*
    axios.post('/', {
      userID: '1' ,     
      info:"przeczytane"    
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
      */
  };

  const bookwantread = () => {
    setWantReadClicked(!wantreadclicked);
    /*   
     axios.post('/', {
      userID: '1',
      info:"chce przeczytać"      
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
      */
  };

  const ownbook = () => {
    setOwnClicked(!ownclicked);
    /*
    axios.post('/', {
      userID: '1',
      info: "posiadam ksiazke"      
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
    */
  };

  return (
    <div className="row info-row">
      <div class="col-sm-12 col-md-3 text-center order-sm-1 book-col">
        <span class="bookcover2">
          <div class="right">
            <div>
              <img
                src={bookdata.graphic}
                alt={bookdata.name}
                width="150px"
              ></img>
            </div>
            <div>
              <button className={readclicked ? "float-center btn text-white btn-danger clicked-red" : "float-center btn text-white btn-danger"} onClick={bookread}>
                {" "}
                <i class="em em-book" aria-role="presentation" aria-label="OPEN BOOK"></i> Chcę przeczytać
              </button>
              <br />
              <button className={wantreadclicked ? "float-center btn text-white btn-info clicked-blue" : "float-center btn text-white btn-info"} onClick={bookwantread}>
                {" "}
                <i class="em em-book" aria-role="presentation" aria-label="OPEN BOOK"></i> Przeczytałem
              </button>
              <br />
              <button className={ownclicked ? "float-center btn text-white btn-success clicked-green" : "float-center btn text-white btn-success"} onClick={ownbook}>
                {" "}
                <i class="em em-book" aria-role="presentation" aria-label="OPEN BOOK"></i> Posiadam
              </button>
            </div>
          </div>
        </span>
      </div>

      <div class="col-md my-col  order-sm-2">
        <span class="bookinfo">
          <h2>{bookdata.name}</h2>
          <div className="float-md-left">Ocena: 4,79/5</div>
          <div className="float-md-right">Autor: {bookdata.author}</div>
          <br />
          <div> Opis: {bookdata.description} </div>
        </span>
      </div>

      {/*<div class="col-md-3 my-col order-md-3 order-sm-4">
        reklamy kiedyś może google albo/rtbkit
  </div>*/}

      <div class="col-md-12 my-col order-md-4 order-sm-3">
        <span class="stars">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            color2={"#ffd700"}
          />
        </span>
      </div>
    </div>
  );
};

export default Book;
