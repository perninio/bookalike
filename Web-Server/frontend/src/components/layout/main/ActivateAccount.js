import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loginUser, activateCode } from "../../../actions/authAction";

import classnames from "classnames";
import "./Styles.scss";

export const ActivateAccount = props => {
  const user = props.location.state.user ? props.location.state.user : {};
  const dispatch = useDispatch();
  const history = useHistory();

  const { errors } = useSelector(state => state.error);

  const [accountCode, setAccountCode] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    dispatch(activateCode(accountCode, user, history));
  };

  useEffect(() => {
    if (user == {}) {
      history.push("/login");
    }
  }, [user]);

  return (
    <div className="jumbotron jumbotron-fluid">
      <form className="ba-form">
        <div className="form-group">
          <label htmlFor="inputCode">Kod aktywacyjny</label>
          <input
            className={classnames("form-control", {
              "is-invalid": errors.activateCode
            })}
            id="inputCode"
            aria-describedby="inputHelp"
            placeholder="Wpisz kod"
            value={accountCode}
            onChange={e => {
              setAccountCode(e.target.value);
            }}
          />
          {errors.activateCode && (
            <div class="invalid-feedback">{errors.activateCode}</div>
          )}
        </div>

        <button
          className="btn btn-primary float-right"
          onClick={e => onSubmit(e)}
        >
          Wyślij kod
        </button>
      </form>
    </div>
  );
};
