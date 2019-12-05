import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { dataserverAPIUserInteractionEndpoint } from "../../../../../constants/serverEndpoint";

const Book = ({ bookdata, ratingChanged, setShowPopup }) => {
  const [readclicked, setReadClicked] = useState(false);
  const [wantreadclicked, setWantReadClicked] = useState(false);
  const [ownclicked, setOwnClicked] = useState(false);
  const [auth, setAuth] = useState(useSelector(state => state.auth));

  //let auth = useSelector(state => state.auth);
  //console.log(auth)

  console.log("rc", readclicked);
  console.log("wrc", wantreadclicked);
  console.log("oc", ownclicked);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIUserInteractionEndpoint + "/book/" + bookdata.bookid)
        .then(result => {
          const {
            data: { data }
          } = result;
          setReadClicked(data.has_read);
          setWantReadClicked(data.wants_read);
          setOwnClicked(data.has_book);
        })
        .catch(err => console.log("Failed to get book data"));
    };
    fetchData();
  }, [bookdata.bookid]);

  const updateInteraction = () => {
    let updateInteraction = {
      has_read: readclicked,
      wants_read: wantreadclicked,
      has_book: ownclicked,
      bookid: bookdata.bookid
    };

    axios
      .post(dataserverAPIUserInteractionEndpoint, updateInteraction)
      .then(result => {
        const {
          data: { interaction }
        } = result;
        console.log(interaction);
        setReadClicked(interaction.has_read);
        setWantReadClicked(interaction.wants_read);
        setOwnClicked(interaction.has_book);
      });
  };

  const bookread = () => {
    if (auth.isAuthenticated == true) {
      setReadClicked(!readclicked);
    } else {
      setShowPopup(true);
    }
  };

  const bookwantread = () => {
    if (auth.isAuthenticated == true) {
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
    } else {
      setShowPopup(true);
    }
  };

  const ownbook = () => {
    if (auth.isAuthenticated == true) {
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
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className="row info-row">
      <div class="col-sm-12 col-md-2 text-center order-sm-1 book-col">
        <span class="bookcover2">
          <div class="right">
            <div>
              <img
                src={bookdata.graphic}
                alt={bookdata.name}
                width="180px"
              ></img>
            </div>
            <div>
              <button
                className={
                  readclicked
                    ? "float-center btn  w-100 text-white btn-danger clicked-red"
                    : "float-center btn  w-100 text-white btn-danger"
                }
                onClick={() => {
                  updateInteraction();
                }}
              >
                {" "}
                <i
                  class="em em-book"
                  aria-role="presentation"
                  aria-label="OPEN BOOK"
                ></i>{" "}
                Chcę przeczytać
              </button>
              <br />
              <button
                className={
                  wantreadclicked
                    ? "float-center w-100 btn text-white btn-info clicked-blue"
                    : "float-center  w-100 btn text-white btn-info"
                }
                onClick={() => {
                  updateInteraction();
                }}
              >
                {" "}
                <i
                  class="em em-book"
                  aria-role="presentation"
                  aria-label="OPEN BOOK"
                ></i>{" "}
                Przeczytałem
              </button>
              <br />
              <button
                className={
                  ownclicked
                    ? "float-center btn  w-100 text-white btn-success clicked-green"
                    : "float-center btn  w-100 text-white btn-success"
                }
                onClick={() => {
                  updateInteraction();
                }}
              >
                {" "}
                <i
                  class="em em-book"
                  aria-role="presentation"
                  aria-label="OPEN BOOK"
                ></i>{" "}
                Posiadam
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
