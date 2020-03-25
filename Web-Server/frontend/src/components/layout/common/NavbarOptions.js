import React from "react";
import { Link } from "react-router-dom";

export const NavbarOptions = ({ role, id }) => {
  const NAVBAR_OPTIONS = {
    user: <UserOptions id={id} />,
    admin: <AdminOptions id={id} />
  };

  return <React.Fragment>{NAVBAR_OPTIONS[role]}</React.Fragment>;
};

const UserOptions = id => {
  return "";
};

const AdminOptions = ({ id }) => {
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
          className="dropdown-item ba-navbar__menu--options vw-100"
          to={"/user-profile/" + id}
        >
          Mój profil
        </Link>
        <Link
          className="dropdown-item ba-navbar__menu--options vw-100"
          to={"/dashboard"}
        >
          Aktualności
        </Link>
        <Link
          className="dropdown-item ba-navbar__menu--options vw-100"
          to="/recommendations"
        >
          Rekomendacje
        </Link>
        <hr></hr>
        <Link
          className="dropdown-item ba-navbar__menu--options vw-100"
          to="/manage/recommendations"
        >
          Zarządzaj rekomendacjami
        </Link>
        <Link
          className="dropdown-item ba-navbar__menu--options vw-100"
          to="/manage/users"
        >
          Zarządzaj użytkownikami
        </Link>
      </div>
    </li>
  );
};
