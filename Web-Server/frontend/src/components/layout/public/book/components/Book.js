import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import "./book.css";
import { useSelector, useDispatch } from "react-redux";
import {
  dataserverAPIUserInteractionEndpoint,
  postserverAPIEndpoint
} from "../../../../../constants/serverEndpoint";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const Book = ({ bookdata, ratingChanged, setShowPopup }) => {
  const [auth, setAuth] = useState(useSelector(state => state.auth));
  const [reload, setReload] = useState(0);
  const [averageRate, setAverageRate] = useState(0);

  const checkbox1 = useRef(null);
  const checkbox2 = useRef(null);
  const checkbox3 = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIUserInteractionEndpoint + "/book/" + bookdata.bookid)
        .then(result => {
          const {
            data: { interaction }
          } = result;
          var re = interaction.has_read;
          var wr = interaction.wants_read;
          var ow = interaction.has_book;
          checkbox1.current.state.checked = re;
          checkbox2.current.state.checked = wr;
          checkbox3.current.state.checked = ow;
          setReload(reload + 1);
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, [bookdata.bookid]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          postserverAPIEndpoint + "/book/" + bookdata.bookid + "/average-rate"
        )
        .then(result => {
          setAverageRate(result.data.rate);
        })
        .catch(err => console.log("Failed to get book data"));
    };
    fetchData();
  }, [bookdata.bookid]);

  const updateInteraction = () => {
    let updateInteraction = {
      has_read: checkbox1.current.state.checked,
      wants_read: checkbox2.current.state.checked,
      has_book: checkbox3.current.state.checked,
      bookid: bookdata.bookid
    };

    axios
      .post(dataserverAPIUserInteractionEndpoint, updateInteraction)
      .then(result => {
        const {
          data: { interaction }
        } = result;
        var re = interaction.has_read;
        var wr = interaction.wants_read;
        var ow = interaction.has_book;
        checkbox1.current.state.checked = re;
        checkbox2.current.state.checked = wr;
        checkbox3.current.state.checked = ow;
        setReload(reload + 1);
      });
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
                onlabel="Przeczytany"
                onstyle="primary"
                offlabel="Nie przeczytany"
                offstyle="secondary"
                style="w-100 mx-3"
                onChange={() => {
                  checkbox1.current.state.checked = !checkbox1.current.state
                    .checked;
                  updateInteraction();
                }}
              />

              <BootstrapSwitchButton
                ref={checkbox2}
                onlabel="Chcę przeczytać"
                onstyle="success"
                offlabel="Nie chcę przczytać"
                offstyle="secondary"
                style="w-100 mx-3"
                onChange={() => {
                  checkbox2.current.state.checked = !checkbox2.current.state
                    .checked;
                  updateInteraction();
                }}
              />

              <BootstrapSwitchButton
                ref={checkbox3}
                onlabel="Posiadam"
                onstyle="danger"
                offlabel="Nie posiadam"
                offstyle="secondary"
                style="w-100 mx-3"
                onChange={() => {
                  checkbox3.current.state.checked = !checkbox3.current.state
                    .checked;
                  updateInteraction();
                }}
              />
            </div>
          </div>
        </span>
      </div>

      <div class="col-md my-col  order-sm-2">
        <span class="bookinfo">
          <h2>{bookdata.name}</h2>
          <div className="float-md-left">Ocena: {averageRate}</div>
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
