import { Link } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"


const Carousel = ({ data, numberofrows, numberofbookstoview }) => {  

  const settings = {
    className: "center",
    infinite: true,
    //slidesToShow: numberofbookstoview,
    speed: 300,
    rows: numberofrows,
    slidesPerRow: 1,
    slidesToShow: 4,
    dots: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel">
      <Slider
        {...settings}
      >
        {data.map(res => {
          return (
            <div className="carouselbook">
              <div className="carouselbook">
                
                { res.graphic!="" ?
                <Link to={"/book/" + res.bookid}>                  
                    <img src={res.graphic} height="208" width="136" />                   
                </Link>
                 : null
                }
              </div>
              { res.graphic!=""?
              <div>            
                <Link to={"/book/" + res.bookid}>{res.name}</Link>
              </div>
                 : null
                }
            </div>
          );
        })}

      </Slider>
    </div>
  );
};
export default Carousel;
