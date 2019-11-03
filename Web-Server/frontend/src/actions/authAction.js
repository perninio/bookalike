import { LOGIN_USER, SET_ERRORS } from "./types";
import { setErrors } from "./errorAction";
import { serverAPIUserEndpoint } from "../constants/serverEndpoint";

import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  // TODO: wyślij zapytanie axiosem - Endpoint: /user, Type: GET

  // axios.post("http://localhost:XXXX/user", userData).then(localStorage.setItem("jwtToken", token) ...   return {type: LOGIN_USER, payload: userData};)
  // Jeśli nie - np. usera nie ma, albo hasło się nie zgadza... no to wysyłamy Errory
  axios
    .post(serverAPIUserEndpoint + "/login", userData)
    .then(respond => {
      const user = respond.data.data;
      history.push("/potwierdz-kod", { user: user });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });

  return {
    type: LOGIN_USER,
    payload: userData
  };
};
//TODO: ZRÓB TO
export const activateCode = (codeData, userData, history) => dispatch => {
  axios
    .post(serverAPIUserEndpoint + "/activate/" + codeData, userData)
    .then(user => {
      axios.post("AUTHORIZATIONSERVER", user).then(data => {
        localStorage.setItem("jwtToken", data);
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const registerUser = (userData, history) => dispatch => {
  axios
    .post(serverAPIUserEndpoint + "/register", userData)
    .then(history.push("/aktywuj-konto"))
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
