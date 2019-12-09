import React, { useState, useEffect } from "react";
import axios from "axios";
import { webserverAPIUserEndpoint } from "../../../constants/serverEndpoint";
import { Invite } from "./components/Invite";
import { Sidebar } from "../common/Sidebar";

export const InvitesPage = () => {
  const [invites, setInvites] = useState([]);
  console.log(invites);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(webserverAPIUserEndpoint + "/relationship/invites")
        .then(result => {
          setInvites(result.data.invites);
        })
        .catch(err => {
          console.log(err);
        });
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
          style={{ marginLeft: 0, backgroundColor: "#362d27" }}
        >
          <div className="container-fluid">
            {invites &&
              invites.map(invite => {
                return <Invite id={invite} />;
              })}
          </div>
        </div>
        <div
          className="d-none d-xs-block d-sm-inline col-sm-2"
          style={{ backgroundColor: "red" }}
        >
          <div className="stickbar">Rekomendacje:</div>
        </div>
      </div>
    </div>
  );
};
