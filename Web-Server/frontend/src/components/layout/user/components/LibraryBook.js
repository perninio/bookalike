import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { dataserverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

export const LibraryBook = ({ possesion_info: { bookid } }) => {
  const [bookInfo, setBookInfo] = useState({});
  console.log(bookid);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIBooksEndpoint + "/" + bookid)
        .then(result => {
          setBookInfo(result.data.data);
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, [bookid]);

  return (
    <React.Fragment>
      {bookInfo.book && (
        <div className="carouselbook">
          <div className="carouselbook">
            {bookInfo.book.graphic != "" ? (
              <Link to={"/book/" + bookid}>
                <img src={bookInfo.book.graphic} height="208" width="136" />
              </Link>
            ) : null}
          </div>
          {bookInfo.book.graphic != "" ? (
            <div>
              <Link to={"/book/" + bookid}>{bookInfo.book.name}</Link>
            </div>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};
