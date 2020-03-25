import React from "react";

export const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="d-none d-xs-block d-sm-inline col-sm-2">
          <Sidebar />
        </div>
        <div className="col-xs-12 col" style={{ backgroundColor: "grey" }}>
          content
        </div>
        <div
          className="d-none d-xs-block d-sm-inline col-sm-2 col-md-4"
          style={{ backgroundColor: "red" }}
        >
          znajomi
        </div>
      </div>
    </div>
  );
};
