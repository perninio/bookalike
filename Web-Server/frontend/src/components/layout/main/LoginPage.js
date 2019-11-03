import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginUser } from "../../../actions/authAction";

import classnames from "classnames";
import "./Styles.scss";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors } = useSelector(state => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    dispatch(loginUser(userData, history));
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <form className="ba-form">
        <div className="form-group">
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
