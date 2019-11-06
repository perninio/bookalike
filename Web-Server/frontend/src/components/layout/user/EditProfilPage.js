import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  dataserverAPIUserEndpoint,
  authorizationAPITokenEndpoint
} from "../../../constants/serverEndpoint";

import { setAuthorizationToken } from "../../../utils/jwtUtils";
import { setCurrentUser } from "../../../actions/authAction";
import jwt_decode from "jwt-decode";

export const EditProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let auth = useSelector(state => state.auth);
  console.log("auth: ", auth);
  const {
    status,
    firstname,
    lastname,
    birthdate,
    description,
    graphic
  } = auth.user.profile;
  const { id } = auth.user;

  const [_status, set_Status] = useState(status);
  const [_firstName, set_FirstName] = useState(firstname);
  const [_lastName, set_LastName] = useState(lastname);
  const [_birthdate, set_Birtdate] = useState(birthdate);
  const [_description, set_Description] = useState(description);
  const [_graphic, set_Graphic] = useState(graphic);

  const onSubmit = e => {
    e.preventDefault();

    const updatedProfile = {
      status: _status,
      firstname: _firstName,
      lastname: _lastName,
      birthdate: _birthdate,
      description: _description,
      graphic: _graphic
    };

    axios
      .put(dataserverAPIUserEndpoint + "/" + id, { data: updatedProfile })
      .then(resp => {
        auth.user.profile = resp.data.data;
        axios
          .post(authorizationAPITokenEndpoint, auth.user)
          .then(data => {
            const { token } = data.data;
            localStorage.setItem("jwtToken", token);
            setAuthorizationToken(token);
            const decoded_data = jwt_decode(token);
            dispatch(setCurrentUser(decoded_data));
            history.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  return (
    <form className="ba-form">
      <div className="form-group">
        <label for="selectStatus"> Wybierz status profilu</label>
        <select
          defaultValue={_status}
          class="form-control"
          id="selectStatus"
          onChange={e => {
            set_Status(e.target.value);
          }}
        >
          <option value="public">Publiczny</option>
          <option value="friends">Przyjaciele</option>
          <option value="private">Prywatny</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="inputFirstName">Imię</label>
        <input
          className="form-control"
          id="inputFirstName"
          aria-describedby="firstNameHelp"
          placeholder="Twoje imie"
          value={_firstName}
          onChange={e => {
            set_FirstName(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="inputLastName">Nazwisko</label>
        <input
          className="form-control"
          id="inputLastName"
          aria-describedby="lastNameHelp"
          placeholder="Twoje nazwisko"
          value={_lastName}
          onChange={e => {
            set_LastName(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="inputBirthdate">Data urodzenia</label>
        <input
          type="date"
          className="form-control"
          id="inputBirthdate"
          aria-describedby="birthdateHelp"
          value={_birthdate}
          onChange={e => {
            set_Birtdate(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="inputDescription">Opis</label>
        <input
          className="form-control"
          id="inputDescription"
          aria-describedby="descriptionhelp"
          value={_description}
          onChange={e => {
            set_Description(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="inputGraphic">Podaj link do zdjęcia</label>
        <input
          className="form-control"
          id="inputGraphic"
          aria-describedby="graphicHelp"
          value={_graphic}
          onChange={e => {
            set_Graphic(e.target.value);
          }}
        />
      </div>

      <button
        className="btn btn-primary float-right"
        onClick={e => onSubmit(e)}
      >
        Zapisz zmiany
      </button>
    </form>
  );
};
