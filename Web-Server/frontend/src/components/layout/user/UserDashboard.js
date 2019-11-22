import React, { useState } from "react";
import UserContentDashboard from "./components/UserContentDashboard"
import SideCarousel from "./components/SideCarousel"

const items = [
  {
    src: 'https://skupszop.pl/images/books/9788377589915.jpg',
  }, {
    src: 'https://skupszop.pl/images/books/9788377589915.jpg',
  }, {
    src: 'https://skupszop.pl/images/books/9788377589915.jpg',
  },
];

export const UserDashboard = () => {

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div
          className="d-none d-xs-block d-sm-inline col-sm-2"
          style={{ backgroundColor: "red" }}
        >
          sidebar
      </div>

        <div className="col-xs-12 col-sm-8 content-col" style={{ backgroundColor: "white", marginLeft: 0 }}>
          <UserContentDashboard />
          content
        </div>
        <div
          className="d-none d-xs-block d-sm-inline col-sm-2"
          style={{ backgroundColor: "red" }}
        >
          <div className="stickbar">
            Rekomendacje:
          <div className="side-carousel">
              <SideCarousel items={items} />
            </div>
            <div className="side-carousel">
              <SideCarousel items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
