import React, { useState, useEffect } from "react";
import axios from "axios";

import { serverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

export const BooksPage = props => {
  const bookCategory = props.match.params.category
    ? props.match.params.category
    : "";

  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          serverAPIBooksEndpoint +
            (bookCategory !== "" ? "/" + bookCategory : "")
        )
        .then(result => {
          setData(result.data);
        })
        .catch(err => console.log("XD"));
    };
    fetchData();
  }, [bookCategory]);

  return <React.Fragment>{console.log(data)}</React.Fragment>;
};
