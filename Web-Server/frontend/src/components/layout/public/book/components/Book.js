import React from "react";
import ReactStars from "react-stars";

const Book = ({ bookdata }) => {
  const ratingChanged = newRating => {
    console.log(newRating);
  };
  return (
    <div className="row my-row">
		 <div class="col-sm-12 col-md-auto text-center order-sm-1 my-col">
            <span class="bookcover2">
			<div class="right">
			<div>
              <img
                src={bookdata.graphic}
                alt={bookdata.name}
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
              <h2>{bookdata.name}</h2>
              <div className="float-md-left">Ocena: 4,79/5</div>
              <div className="float-md-right">Autor: {bookdata.author}</div>
              <br/>
			  <div> Opis: {bookdata.description} </div>
            </span>
          </div>
		  
          <div class="col-md-3 my-col order-md-3 order-sm-4">
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
  );
};

export default Book;
