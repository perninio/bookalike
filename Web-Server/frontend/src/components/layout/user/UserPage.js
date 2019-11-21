import React from "react";
import UserContent from "./components/UserContent"
import "./components/userpage.css"

export const UserPage = () => {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div
          className="d-none d-xs-block d-sm-inline col-sm-2"
          style={{ backgroundColor: "red" }}
        >
          sidebar
        </div>
        <div className="col-xs-12 col-sm-8 content-col" style={{ backgroundColor: "grey", marginLeft:0}}>
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