import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BooksPageStyle.css";
import Books from "./components/Books";
import Pagination from "./components/Pagination";
import { dataserverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

export const BooksPage = props => {
  const bookCategory = props.match.params.category
    ? props.match.params.category
    : "";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [bookpages, setBookPages] = useState();

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          dataserverAPIBooksEndpoint +
            (bookCategory !== "" ? "/category/" + bookCategory : "")
        )
        .then(result => {
          setData(result.data.data);
          setBookPages(result.data.data.length / booksPerPage);
        })
        .catch(err =>
          console.log(
            dataserverAPIBooksEndpoint +
              (bookCategory !== "" ? "/category/" + bookCategory : "")
          )
        );
    };
    fetchData();
  }, [bookCategory]);

  /*Test*/
  /*
    useEffect(() => {
    const fetchData = async () => {
      axios
        .get('https://my-json-server.typicode.com/perninio/hello-world/db')
        .then(result => {
          setData(result.data.data);
		  setBookPages(result.data.data.length/booksPerPage)		  
		    console.log(result.data.data[0].name);
			console.log(result.data.data.length);
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
*/

  const indexOfLastPost = currentPage * booksPerPage;
  const indexOfFirstPost = indexOfLastPost - booksPerPage;
  const currentBooks = data.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageClick = data => {
    let selected = data.selected;
    setCurrentPage(selected + 1);
  };
  const handleChange = e => {
    setBooksPerPage(e.target.value);
    setBookPages(data.length / e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="container">
        <Books booksdata={currentBooks} loading={loading} />
      </div>
      <Pagination bookpages={bookpages} handlePageClick={handlePageClick} />
      <select onChange={handleChange.bind(this)} value={booksPerPage}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};
