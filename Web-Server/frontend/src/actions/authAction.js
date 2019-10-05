import { LOGIN_USER } from "./types";

export const loginUser = userData => {
  // TODO: wyślij zapytanie axiosem - Endpoint: /user, Type: GET

  // axios.get("http://localhost:XXXX/user", userData).then(localStorage.setItem("jwtToken", token) ...   return {type: LOGIN_USER, payload: userData};)
  // Jeśli nie - np. usera nie ma, albo hasło się nie zgadza... no to wysyłamy Errory

  console.log("userData", userData);

  window.location.href = "/";

  return {
    type: LOGIN_USER,
    payload: userData
  };
};
