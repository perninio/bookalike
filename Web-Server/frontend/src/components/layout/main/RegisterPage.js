import React, { useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

import "./Styles.scss";

export const RegisterPage = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { errors } = useSelector(state => state.error);

  const onSubmit = e => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password
    };

    // TODO: dodaj nowy actionCreator registerUser | dodaj przechwytywanie błędów
    // dispatch(registerUser());
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <form className="ba-form">
        <div novalidate className="form-group">
          <label htmlFor="inputEmail">Adres email</label>
          <input
            type="email"
            className={classnames("form-control", {
              "is-invalid": errors.email
            })}
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="Wpisz e-mail"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <div class="invalid-feedback">{errors.email}</div>}
          <small id="emailHelp" className="form-text text-muted">
            Nigdy nie udostępnimy Twojego adresu e-mail nigdzie! Jest z nami
            bezpieczny <i className="far fa-smile-wink"></i>
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Hasło</label>
          <input
            type="password"
            className={classnames("form-control", {
              "is-invalid": errors.password
            })}
            id="inputPassword"
            placeholder="Hasło"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <div class="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="inputPasswordConfirm">Potwierdź hasło</label>
          <input
            type="password"
            className={classnames("form-control", {
              "is-invalid": errors.password2
            })}
            id="inputPasswordConfirm"
            placeholder="Potwierdź hasło"
            value={passwordConfirmation}
            onChange={e => {
              setPasswordConfirmation(e.target.value);
            }}
          />
          {errors.password2 && (
            <div class="invalid-feedback">{errors.password2}</div>
          )}
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
