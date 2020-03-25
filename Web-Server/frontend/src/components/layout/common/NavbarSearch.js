import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const NavbarSearch = () => {
  const history = useHistory();
  const [text, setText] = useState("");

  return (
    <form className="form-inline my-lg-0  ba-navbar__search">
      <input
        className="form-control mr-sm-2 ba-navbar__search--input"
        placeholder="Wyszukaj"
        aria-label="Search"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
      <button
        className="btn btn-outline-light my-2 my-sm-0 "
        onClick={e => {
          e.preventDefault();
          history.push("/search/" + text);
        }}
      >
        Wyszukaj
      </button>
    </form>
  );
};
