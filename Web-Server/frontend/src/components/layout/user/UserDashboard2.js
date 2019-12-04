import React, { useState, useEffect } from "react";
import axios from "axios";
import UserContentDashboard from "./components/UserContentDashboard";
import SideCarousel from "./components/SideCarousel";
import { postserverAPIEndpoint } from "../../../constants/serverEndpoint";

const items = [
  {
    src: "https://skupszop.pl/images/books/9788377589915.jpg"
  },
  {
    src: "https://skupszop.pl/images/books/9788377589915.jpg"
  },
  {
    src: "https://skupszop.pl/images/books/9788377589915.jpg"
  }
];

export const UserDashboard2 = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(0);

  const deletepost = index => {
    var tab = posts;
    tab.splice(index, 1);
    setPosts(tab);
    setReload(posts.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(postserverAPIEndpoint + "/")
        .then(result => {
          setPosts(result.data.posts);
          console.log(result.data);
        })
        .catch(err => console.log("Failed to get post data"));
    };
    fetchData();
  }, []);

  /*Test Data*/

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div
          className="d-none d-xs-block d-sm-inline col-sm-2"
          style={{ backgroundColor: "red" }}
        >
          sidebar
        </div>

        <div
          className="col-xs-12 col-sm-8 content-col"
          style={{ backgroundColor: "white", marginLeft: 0 }}
        >
          {posts && (
            <UserContentDashboard
              data={posts}
              fun={deletepost}
              posts={posts}
              setReload={setReload}
            />
          )}
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
