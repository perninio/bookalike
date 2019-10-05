import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Styles.scss";

// <i className="fas fa-book-open"> Book Alike</i>

export const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  const userOptions = (
    <div className="ml-auto">
      <Link className="btn btn-outline-danger my-2 my-sm-0" to="/logout">
        wyloguj
      </Link>
    </div>
  );

  const guestOptions = (
    <div className="ml-auto">
      <Link
        className="btn btn-outline-primary my-2 my-sm-0 mr-5"
        to="/register"
      >
        Zarejestruj
      </Link>
      <Link className="btn btn-outline-success my-2 my-sm-0 " to="/login">
        Zaloguj
      </Link>
    </div>
  );

  const actionOptions = (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle ba-navbar__options"
        id="navbarDropdown"
        role="button"
        href="/"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Czynności
      </a>

      <div
        className="dropdown-menu ba-navbar__menu"
        aria-labelledby="navbarDropdown"
      >
        <Link className="dropdown-item ba-navbar__menu--options" to="/">
          Rekomendacje
        </Link>
        <Link className="dropdown-item ba-navbar__menu--options" to="/">
          Czat
        </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item ba-navbar__menu--options" to="/">
          Wymiany
        </Link>
      </div>
    </li>
  );

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
          {isAuthenticated && actionOptions}
        </ul>
        {/* TO PONIŻEJ -> jak niezalogowany, to wyświetl LOGUJ+REJESTRUJ ||| jak Zalogowany to PROFIL+WYLOGUJ */}
        {isAuthenticated ? userOptions : guestOptions}
      </div>
    </nav>
  );
};
