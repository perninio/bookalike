import React, { useState, useEffect } from "react";
import axios from "axios";

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

  console.log(data);

  return <React.Fragment></React.Fragment>;
};
