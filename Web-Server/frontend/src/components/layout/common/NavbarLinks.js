import React from "react";
import { Link } from "react-router-dom";

export const NavbarLinks = ({ isAuthenticated }) => {
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
  return isAuthenticated ? userOptions : guestOptions;
};
