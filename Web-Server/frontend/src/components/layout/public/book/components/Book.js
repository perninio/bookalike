import React, { useState, useEffect , useRef } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import { dataserverAPIUserInteractionEndpoint } from "../../../../../constants/serverEndpoint";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const Book = ({ bookdata, ratingChanged, setShowPopup} ) => {
  const [readclicked, setReadClicked] = useState(false);
  const [wantreadclicked, setWantReadClicked] = useState(false);
  const [ownclicked, setOwnClicked] = useState(false);
  const [auth, setAuth] = useState(useSelector(state => state.auth));
  const [reload,setReload]=useState(0)
  //let auth = useSelector(state => state.auth);
  //console.log(auth)
  const checkbox1 = useRef(null)
  const checkbox2 = useRef(null)
  const checkbox3 = useRef(null)


  console.log("rc", readclicked);
  console.log("wrc", wantreadclicked);
  console.log("oc", ownclicked);

  useEffect(() => {
    const fetchData = async () => {
      axios
        // .get(dataserverAPIUserInteractionEndpoint + "/book/" + bookdata.bookid)
        .get("https://my-json-server.typicode.com/perninio/hello-world/db")
        // my-json-server.typicode.com/perninio/hello-world/book")
        .then(result => {
          // const {
          //   data: { data }
          // } = result;       
          var re=result.data.interaction.has_read;
          var wr=result.data.interaction.wants_read;
          var ow=result.data.interaction.has_book;
          setReadClicked(result.data.interaction.has_read);
          setWantReadClicked(result.data.interaction.wants_read);
          setOwnClicked(result.data.interaction.has_book);
          checkbox1.current.state.checked=re;
          checkbox2.current.state.checked=wr;
          checkbox3.current.state.checked=ow;
          setReload(reload+1)
        })
        .catch(err => console.log("Failed to get interaction data"));       
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
      //setReload(reload+1);
      console.log(ownclicked)
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
              <BootstrapSwitchButton
                ref={checkbox1}
                //id="readbutton"
                checked={readclicked}
                onlabel='Przeczytany'
                onstyle='primary'
                offlabel='Nie przeczytany'
                offstyle='secondary'
                style='w-100 mx-3'
                onChange={() => { setReadClicked(!readclicked) }}
              />

              <BootstrapSwitchButton
                ref={checkbox2}
                checked={wantreadclicked}
                onlabel='Chcę przeczytać'
                onstyle='success'
                offlabel='Nie chcę przczytać'
                offstyle='secondary'
                style='w-100 mx-3'
                onChange={() => { setWantReadClicked(!wantreadclicked) }}
              />

              <BootstrapSwitchButton
                ref={checkbox3}
                checked={ownclicked}
                onlabel='Posiadam'
                onstyle='danger'
                offlabel='Nie posiadam'
                offstyle='secondary'
                style='w-100 mx-3'
                onChange={(checked) => { setOwnClicked(checked) }}
              />
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
