import React, { useState, useEffect } from "react";
import axios from "axios";
import UserContent from "./components/UserContent";

import "./components/userpage.css";
import { postserverAPIEndpoint } from "../../../constants/serverEndpoint";
import { Sidebar } from "../common/Sidebar";

export const UserPage = props => {
  const [posts, setPosts] = useState([]);
  const id = props.match.params.id;
  console.log(posts);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(postserverAPIEndpoint + "/user/" + id)
        .then(result => {
          setPosts(result.data.posts);
        })
        .catch(err => console.log("Failed to get post data"));
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="d-none d-xs-block d-sm-inline col-sm-2">
          <Sidebar />
        </div>
        <div
          className="col-xs-12 col-sm-8 content-col"
          style={{ backgroundColor: "grey", marginLeft: 0 }}
        >
          <UserContent></UserContent>
        </div>
        <div
          className="d-none d-xs-block d-sm-inline col-sm-2"
          style={{ backgroundColor: "red" }}
        >
          znajomi
        </div>
      </div>
    </div>
  );
};
