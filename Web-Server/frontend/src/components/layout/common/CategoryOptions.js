import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Styles.scss";

import { dataserverAPIBooksEndpoint } from "../../../constants/serverEndpoint";

export const CategoryOptions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIBooksEndpoint + "/categories/all")
        .then(result => {
          setData(result.data.data);
        })
        .catch(err => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <li className="nav-item dropdown pl-3 ">
      <a
        className="nav-link dropdown-toggle ba-navbar__options"
        id="navbarDropdown"
        role="button"
        href="/"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Kategorie
      </a>

      <div
        className="dropdown-menu ba-navbar__menu"
        aria-labelledby="navbarDropdown"
      >
        {data != [] &&
          data.map(category => (
            <Link
              className="dropdown-item ba-navbar__menu--options vw-80"
              to={"/books/" + category}
            >
              {category}
            </Link>
          ))}
      </div>
    </li>
  );
};
