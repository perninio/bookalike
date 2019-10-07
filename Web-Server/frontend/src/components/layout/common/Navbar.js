import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Styles.scss";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarOptions } from "./NavbarOptions";

export const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { role } = useSelector(state => state.auth.user);

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

      <div className="collapse navbar-collapse" id="navbarToggle">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link ba-navbar__options" to="/">
              Strona Główna <span className="sr-only"></span>
            </Link>
          </li>
          <NavbarOptions role={role} />
        </ul>
        <NavbarLinks isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
};
