import React from "react";
import { Link } from "react-router-dom";

export const NavbarOptions = ({ role }) => {
  const NAVBAR_OPTIONS = {
    user: <UserOptions />,
    admin: <AdminOptions />,
    moderator: <ModeratorOptions />,
    guest: <GuestOptions />
  };

  return <div>{NAVBAR_OPTIONS[role]}</div>;
};

const UserOptions = () => {
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
};

const AdminOptions = () => {
  return "XD";
};

const ModeratorOptions = () => {
  return "";
};

const GuestOptions = () => {
  return "";
};
