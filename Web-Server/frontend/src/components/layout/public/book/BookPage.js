import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import ReactStars from "react-stars";

import AliceCarousel from "react-alice-carousel";
import "./alice-carousel.css";

import { serverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

export const BookPage = props => {
  const idBook = props.match.params.id;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(serverAPIBooksEndpoint + "/" + idBook)
        .then(result => {
          setData(result.data.data);
        })
        .catch(err => console.log("XD"));
    };
    fetchData();
  }, [idBook]);

  //const galleryItems=[1,2,3,4,5,6]
  const stagePadding = {
    paddingLeft: 170, // in pixels 170 najlepiej
    paddingRight: 0
  };

  const responsive = {
    0: { items: 1 },
    1024: { items: 3 }
  };

  function onSlideChange(e) {
    console.debug("Item`s position during a change: ", e.item);
    console.debug("Slide`s position during a change: ", e.slide);
  }

  function onSlideChanged(e) {
    console.debug("Item`s position after changes: ", e.item);
    console.debug("Slide`s position after changes: ", e.slide);
  }

  const ratingChanged = newRating => {
    console.log(newRating);
  };

  return (
    <React.Fragment>
      <div class="container">
        <div class="row my-row">
          <div class="col-md=auto my-col order-sm-1">
            <span class="bookcover2">
			<div class="right">
			<div>
              <img
                src="https://skupszop.pl/images/books/9788375745368.jpg"
                alt="Pan lodowego ogrodu"
              ></img>
			  </div>
			  <div>
              <a class="float-center btn text-white btn-danger">
                {" "}
               <i class="em em-book" aria-role="presentation" aria-label="OPEN BOOK"></i> Przeczytana				
              </a>
			  </div>
			  </div>
            </span>
          </div>

          <div class="col-md my-col  order-sm-2">
            <span class="bookinfo">
              <h2>Pan lodowego ogrodu</h2>
              <div>Ocena: 4,79/5</div>
              <div>autor: Grzędowicz</div>
              Opis: Dawno dawno temu, za siedmioma górami ....
            </span>
          </div>
          <div class="col-md my-col order-md-3 order-sm-4">
            reklamy kiedyś może google albo/rtbkit
          </div>

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

        <div class="row my-row">
          <div class="col-md-auto col-md-12 my-col">
            <div class="carousel-div">
              <AliceCarousel
                class="alice-carousel__prev-btn"
                //items={galleryItems}https://skupszop.pl/images/books/9788362170555.jpg
                responsive={responsive}
                stagePadding={stagePadding}
                fadeOutAnimation={true}
                mouseDragEnabled={true}
                onSlideChange={onSlideChange}
                onSlideChanged={onSlideChanged}
                style="color:white"
              >
                <img
                  src="https://skupszop.pl/images/books/9788375780284.jpg"
                  height="208"
                  width="136"
                />
                <img
                  src="https://skupszop.pl/images/books/9788375680966.jpg"
                  height="208"
                  width="136"
                />
                <img
                  src=" https://skupszop.pl/images/books/9788362170555.jpg"
                  height="208"
                  width="136"
                />
              </AliceCarousel>
            </div>
          </div>
        </div>

        <div class="row my-row-comment">
          <div class="col-md-12 my-col text-center">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-2">
                    <img
                      src="https://image.ibb.co/jw55Ex/def_face.jpg" height='100' width='100' 
                      class="img rounded-circle img-fluid"
                    />
                    <p class="text-secondary text-center">15 Minutes Ago</p>
                  </div>
                  <div class="col-md-10">
                    <p>
                      <a class="float-left">
                        <strong>Przemek Pernak</strong>
                      </a>
                      <span class="float-right">
                        <i class="text-warning fa fa-star"></i>
                      </span>
                      <span class="float-right">
                        <i class="text-warning fa fa-star"></i>
                      </span>
                      <span class="float-right">
                        <i class="text-warning fa fa-star"></i>
                      </span>
                      <span class="float-right">
                        <i class="text-warning fa fa-star"></i>
                      </span>
                    </p>
                    <div class="clearfix"></div>
                    <p align="left">Świetna książka. Bardzo mi się podobała</p>
                    <p>
                      <a class="float-right btn text-white btn-danger">
                        {" "}
                        <i class="fa fa-thumbs-down"></i> DisLike
                      </a>
                      <a class="float-right btn text-white btn-danger">
                        {" "}
                        <i class="fa fa-thumbs-up"></i> Like
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};



