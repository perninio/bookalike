import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SideCarousel from "./components/SideCarousel";
import {
  postserverAPIEndpoint,
  webserverAPIBookEndpoint,
  recommendationserverAPIEndpoint
} from "../../../constants/serverEndpoint";
import { Sidebar } from "../common/Sidebar";
import recodata from "./recommendation.json";
import { Alert } from "reactstrap";

export const Recommendation = () => {
  const [data, setData] = useState({});
  console.log(data);
  const [reload, setReload] = useState(0);

  const returnColor = perc => {
    var r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  };

  //const { profile } = useSelector(state => state.auth.user);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(recommendationserverAPIEndpoint + "ubcf")
        .then(result => {
          setData(result.data);
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
          style={{ marginLeft: 20 }}
        >
          {data && data.type == 0 ? (
            <Alert color="primary">
              Postaraj się wystawić kilka więcej komentarzów pod przeczytanymi
              książkami aby otrzymać lepsze rekomendacje
            </Alert>
          ) : data.type == 1 ? (
            <Alert color="success">
              Widzimy i doceniamy twoją aktwność w ocenianiu książek :).
              Pamiętaj im więcej wystawisz opinii tym lepsze rekomendacje możemy
              tobię przesłać :)
            </Alert>
          ) : null}
          <div className="row">
            {data.predictions != undefined &&
              data.predictions.map(item => {
                console.log(item);
                return (
                  <div class="col-md-auto my-col-books ">
                    <div class="zoom">
                      {/* {console.log(webserverAPIBookEndpoint + item.bookid)} */}
                      <a href={"/book/" + item.bookid}>
                        <img
                          src={item.graphic}
                          href={"/book/" + item.bookid}
                          alt={item.bookname}
                          width="129"
                          height="190"
                        ></img>
                      </a>
                      {item.score != "" ? (
                        <div
                          className="percentagevaluerecommendation"
                          style={{
                            backgroundColor: returnColor(item.percentage),
                            color: "white"
                          }}
                        >
                          {Math.round(item.percentage)}
                        </div>
                      ) : null}
                    </div>
                    <div class="bookstitle zoomtext">
                      <h6>
                        <a
                          href={webserverAPIBookEndpoint + item.bookid}
                          style={{ color: "#022b5f" }}
                        >
                          {item.bookname}
                        </a>
                      </h6>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
