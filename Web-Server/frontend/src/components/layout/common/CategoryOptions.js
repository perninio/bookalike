import React from "react";
import { Link } from "react-router-dom";

export const CategoryOptions = () => {
  return (
    <li className="nav-item dropdown pl-3">
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
        <Link
          className="dropdown-item ba-navbar__menu--options"
          to="/books/biografie"
        >
          Biografie
        </Link>
        <Link
          className="dropdown-item ba-navbar__menu--options"
          to="/books/poradniki"
        >
          Poradniki
        </Link>
      </div>
    </li>
  );
};
