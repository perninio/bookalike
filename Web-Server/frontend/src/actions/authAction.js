import { SET_CURRENT_USER, SET_ERRORS } from "./types";
import { setErrors } from "./errorAction";
import {
  serverAPIUserEndpoint,
  authorizationAPITokenEndpoint
} from "../constants/serverEndpoint";
import { setAuthorizationToken } from "../utils/jwtUtils";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  // TODO: wyślij zapytanie axiosem - Endpoint: /user, Type: GET

  // axios.post("http://localhost:XXXX/user", userData).then(localStorage.setItem("jwtToken", token) ...   return {type: LOGIN_USER, payload: userData};)
  // Jeśli nie - np. usera nie ma, albo hasło się nie zgadza... no to wysyłamy Errory
  axios
    .post(serverAPIUserEndpoint + "/login", userData)
    .then(respond => {
      const user = respond.data.data;
      if (user.status == "unactivated") {
        history.push("/potwierdz-kod", { user: user });
      } else {
        axios
          .post(authorizationAPITokenEndpoint, user)
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
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const activateCode = (codeData, userData, history) => dispatch => {
  axios
    .post(serverAPIUserEndpoint + "/activate/" + codeData, userData)
    .then(user => {
      axios
        .post(authorizationAPITokenEndpoint, user.data.data)
        .then(data => {
          const { token } = data.data;
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          const decoded_data = jwt_decode(token);
          dispatch(setCurrentUser(decoded_data));
          history.push("/");
        })
        .catch(err => console.log(err));
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

export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthorizationToken(null);
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};
