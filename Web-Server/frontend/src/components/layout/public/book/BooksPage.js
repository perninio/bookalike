import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksPageStyle.css";
import ReactPaginate from 'react-paginate';

import { serverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

function printRowsBooks() {
  var items = [
    {
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
    {
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
    {
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
    {
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
    {
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
	{
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
	{
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
	{
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    },
	{
      Link: "https://skupszop.pl/images/books/9788392579601.jpg",
      Title: "Gildia Magów. Księga I Trylogii Czarnego Maga"
    }
	
  ];
  var keys = Object.keys(items[0]);
  console.log(keys);
  return items.map((row, index) => {
    console.log(row);
    return (
      <tr key={index}>
        <RenderBook data={row} keys={keys} />
      </tr>
    );
  });
}

export const BooksPage = props => {
  const bookCategory = props.match.params.category
    ? props.match.params.category
    : "";

  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          serverAPIBooksEndpoint +
            (bookCategory !== "" ? "/category/" + bookCategory : "")
        )
        .then(result => {
          setData(result.data.data);
        })
        .catch(err =>
          console.log(
            serverAPIBooksEndpoint +
              (bookCategory !== "" ? "/category/" + bookCategory : "")
          )
        );
    };
    fetchData();
  }, [bookCategory]);

  return (
    <React.Fragment>
      <div class="container">
        <div class="row my-row-books">{printRowsBooks()}</div>
      </div>	  
    </React.Fragment>
  );
};

const RenderBook = function(book) {
  return (
    <div class="col-md my-col-books ">
      <div class="zoom">
        <img src={book.data[book.keys[0]]} width="129" height="190"></img>
	  </div>
      <div class="bookstitle"><h6>{book.data[book.keys[1]]}</h6></div>
	</div>

  );
};
