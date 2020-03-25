import React from "react";
import { webserverAPIBookEndpoint } from "../../../../../constants/serverEndpoint";

const Books = ({ booksdata, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="row my-row-books">
      {booksdata.map(book => (
        <div class="col-md-auto my-col-books ">
          <div class="zoom">
            {console.log(webserverAPIBookEndpoint + book.bookid)}
            <a href={webserverAPIBookEndpoint + book.bookid}>
              <img
                src={book.graphic}
                href={webserverAPIBookEndpoint + book.bookid}
                alt={book.name}
                width="129"
                height="190"
              ></img>
            </a>
          </div>
          <div class="bookstitle">
            <h6>
              <a
                href={webserverAPIBookEndpoint + book.bookid}
                style={{ color: "#022b5f" }}
              >
                {book.name}
              </a>
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
