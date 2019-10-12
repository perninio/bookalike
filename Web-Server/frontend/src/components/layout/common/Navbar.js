import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Styles.scss";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarSearch } from "./NavbarSearch";

export const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ba-navbar sticky-top">
      <Link className="navbar-brand" to="/">
        <i className="fas fa-book-open ba-navbar__logo"> Book Alike</i>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggle"
        aria-controls="navbarToggle"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse row" id="navbarToggle">
        <ul className="navbar-nav mr-5 mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link ba-navbar__options" to="/">
              Strona Główna <span className="sr-only"></span>
            </Link>
          </li>
        </ul>
        <NavbarSearch />
        <NavbarLinks isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
};
