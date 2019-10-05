import React, { useState } from "react";

import "./Styles.scss";

export const RegisterPage = props => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      login: login,
      email: email,
      password: password
    };

    console.log(newUser);
    // TODO: dodaj nowy actionCreator registerUser | dodaj przechwytywanie błędów
    // dispatch(registerUser());
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <form className="ba-form">
        <div className="form-group">
          <label htmlFor="inputLogin">Login</label>
          <input
            className="form-control"
            id="inputLogin"
            placeholder="Login"
            value={login}
            onChange={e => {
              setLogin(e.target.value);
            }}
          />
        </div>
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
          <small id="emailHelp" className="form-text text-muted">
            Nigdy nie udostępnimy Twojego adresu e-mail nigdzie! Jest z nami
            bezpieczny <i className="far fa-smile-wink"></i>
          </small>
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

        <div className="form-group">
          <label htmlFor="inputPasswordConfirm">Potwierdź hasło</label>
          <input
            type="password"
            className="form-control"
            id="inputPasswordConfirm"
            placeholder="Potwierdź hasło"
            value={passwordConfirmation}
            onChange={e => {
              setPasswordConfirmation(e.target.value);
            }}
          />
        </div>

        <button
          className="btn btn-primary float-right"
          onClick={e => onSubmit(e)}
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};
