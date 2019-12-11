import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  dataserverAPIUserEndpoint,
  webserverAPIUserEndpoint
} from "../../../../constants/serverEndpoint";

export const Invite = ({ id }) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIUserEndpoint + "/" + id)
        .then(result => {
          setUserProfile(result.data.data);
        })
        .catch(err => console.log("Failed to get book data"));
    };
    fetchData();
  }, [id]);

  const acceptInvite = () => {
    const payload = {
      relation_type: "accepted_request"
    };
    axios
      .put(webserverAPIUserEndpoint + "/" + id + "/relationship", payload)
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const rejectInvite = () => {
    const payload = {
      relation_type: "rejected_request"
    };
    axios
      .put(webserverAPIUserEndpoint + "/" + id + "/relationship", payload)
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div
      className="row float-left rounded mt-2 ml-auto mr-auto"
      style={{ backgroundColor: "white", width: "100%", height: "100px" }}
    >
      <div className="col mb-auto mt-auto">
        <Link to={"/user-page/" + id}>
          <img src={userProfile.graphic} width={120} height={90}></img>
        </Link>
      </div>
      <div className="col mb-auto mt-auto">
        <Link to={"/user-page/" + id} className="text-primary">
          <strong>{userProfile.firstname + " " + userProfile.lastname}</strong>
        </Link>
      </div>
      <div className="col">
        <button
          className="btn btn-primary mt-2"
          style={{ width: "100%" }}
          onClick={() => {
            acceptInvite();
          }}
        >
          Zaakceptuj
        </button>
        <button
          className="btn btn-danger mt-2"
          style={{ width: "100%" }}
          onClick={() => {
            rejectInvite();
          }}
        >
          Usuń zaproszenie
        </button>
      </div>
    </div>
  );
};
