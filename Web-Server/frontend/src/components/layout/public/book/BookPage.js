import React, { useState, useEffect } from "react";
import axios from "axios";

export const BookPage = props => {
  const idBook = props.match.params.id;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("localhost:5000/api/books/" + idBook)
        .then(result => {
          setData(result.data);
        })
        .catch(err => console.log("XD"));
    };
    fetchData();
  }, [idBook]);

  return (
    <React.Fragment>
      <div>{data}</div>
    </React.Fragment>
  );
};
