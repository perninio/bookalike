import React, { useState, useEffect } from "react";
import axios from "axios";
import { webserverAPIUserEndpoint } from "../../../constants/serverEndpoint";

export const ManageUsers = () => {
  const [data, setData] = useState({});

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(webserverAPIUserEndpoint)
        .then(result => {
          setData(result.data.data);
        })
        .catch(err => console.log("XD"));
    };
    fetchData();
  }, []);

  return <div>XD</div>;
};
