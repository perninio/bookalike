import React from "react";
import { Link } from "react-router-dom";

export const NavbarOptions = ({ role }) => {
  const NAVBAR_OPTIONS = {
    user: <UserOptions />,
    admin: <AdminOptions />
  };

  return <React.Fragment>{NAVBAR_OPTIONS[role]}</React.Fragment>;
};

const UserOptions = () => {
  return "";
};

const AdminOptions = () => {
  return (
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
        <Link
          className="dropdown-item ba-navbar__menu--options"
          to="/manage/recommendations"
        >
          Rekomendacje
        </Link>
        <Link
          className="dropdown-item ba-navbar__menu--options"
          to="/manage/users"
        >
          Zarządzaj użytkownikami
        </Link>
        <Link className="dropdown-item ba-navbar__menu--options" to="/">
          Sprawdź zgłoszenia
        </Link>
      </div>
    </li>
  );
};
