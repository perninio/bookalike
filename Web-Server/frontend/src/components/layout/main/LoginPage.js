import React, { useState } from "react";
import { useDispatch } from "react-redux";

import md5 from "md5";
import { loginUser } from "../../../actions/authAction";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: md5(password)
    };

    dispatch(loginUser(userData));
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <form className="ba-form">
        <div className="form-group">
          <label htmlFor="inputEmail">Adres email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="Wpisz e-mail"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword">Hasło</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Hasło"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="btn btn-primary float-right"
          onClick={e => onSubmit(e)}
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
};
