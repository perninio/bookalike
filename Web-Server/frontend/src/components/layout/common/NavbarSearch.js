import React, { useState } from "react";

export const NavbarSearch = () => {
  const [text, setText] = useState("");

  const search = e => {
    e.preventDefault();
    console.log("Tutaj będzie wysyłany request oraz przeniesienie do searcha");
  };

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
          search(e);
        }}
      >
        Wyszukaj
      </button>
    </form>
  );
};
