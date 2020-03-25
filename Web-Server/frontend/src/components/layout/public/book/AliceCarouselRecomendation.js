import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import React from "react";
import "./alice-carousel.css";

const AliceCarouselRecomendation = ({ books }) => {
  //const galleryItems=[1,2,3,4,5,6]
  const stagePadding = {
    paddingLeft: 160, // in pixels 170 najlepiej
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

  return (
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
      {books.map(res => {
        return (
          <div className="col-md-8">
            <div>
              <Link to={"/book/" + res.bookid}>
                <img src={res.graphic} height="208" width="136" />
              </Link>
            </div>
            <div>
              <Link to={"/book/" + res.bookid}>{res.name}</Link>
            </div>
          </div>
        );
      })}
      {/* <div className="col-md-8">
                <div>
                    <img
                        src="https://skupszop.pl/images/books/9788375680966.jpg"
                        height="208"
                        width="136"
                    />
                </div>
                <div>
                    <a>Mroczny Rycerz</a>
                </div>
            </div>
            <div className="col-md-8">
                <div>
                    <img
                        src=" https://skupszop.pl/images/books/9788362170555.jpg"
                        height="208"
                        width="136"
                    />
                </div>
                <div>
                    <a>Wielki Mistrz</a>
                </div>
            </div>
            <div className="col-md-8">
                <div>
                    <img
                        src="https://skupszop.pl/images/books/9788362170210.jpg"
                        height="208"
                        width="136"
                    />
                </div>
                <div>
                    <a>Gildia magów</a>
                </div>
            </div>*/}
    </AliceCarousel>
  );
};
export default AliceCarouselRecomendation;
