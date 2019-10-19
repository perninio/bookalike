import React, { useState, useEffect } from "react";
import axios from "axios";

import { serverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

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
              (bookCategory !== "" ? "category/" + bookCategory : "")
          )
        );
    };
    fetchData();
  }, [bookCategory]);

  return <React.Fragment></React.Fragment>;
};
