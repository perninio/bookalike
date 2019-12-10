import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  dataserverAPIUserEndpoint,
  webserverAPIUserEndpoint,
  authorizationAPITokenEndpoint
} from "../../../constants/serverEndpoint";
import { setAuthorizationToken } from "../../../utils/jwtUtils";
import { formatDate } from "../../../utils/dateUtils";

export const EditUserProfile = props => {
  const id = props.match.params.id;
  let auth = useSelector(state => state.auth);
  const history = useHistory();

  // account data
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(webserverAPIUserEndpoint + "/" + id)
        .then(result => {
          setUserid(result.data.data.userid);
          setEmail(result.data.data.email);
          setRole(result.data.data.role);
          setAccountCode(result.data.data.account_code);
          setStatus(result.data.data.status);
        })
        .catch(err => {
          const { error } = err.response.data;
          if (error == "TokenExpiredError" || error == "JsonWebTokenError") {
            axios
              .post(authorizationAPITokenEndpoint, auth.user)
              .then(data => {
                const { token } = data.data;

                setAuthorizationToken(token);
                axios
                  .get(webserverAPIUserEndpoint + "/" + id)
                  .then(result => {
                    setUserid(result.data.data.userid);
                    setEmail(result.data.data.email);
                    setRole(result.data.data.role);
                    setAccountCode(result.data.data.account_code);
                    setStatus(result.data.data.status);
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          }
        });
    };
    fetchData();
  }, [userid]);

  // profile data

  const [profileStatus, setProfileStatus] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [description, setDescription] = useState("");
  const [graphic, setGraphic] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(dataserverAPIUserEndpoint + "/" + id)
        .then(result => {
          setProfileStatus(result.data.data.status);
          setFirstName(result.data.data.firstname);
          setLastname(result.data.data.lastname);
          setBirthdate(formatDate(result.data.data.birthdate));
          setDescription(result.data.data.description);
          setGraphic(result.data.data.graphic);
        })
        .catch(err => {
          const { error } = err.response.data;
          console.log(error);
          if (error == "TokenExpiredError" || error == "JsonWebTokenError") {
            axios
              .post(authorizationAPITokenEndpoint, auth.user)
              .then(data => {
                const { token } = data.data;
                setAuthorizationToken(token);
                axios
                  .get(dataserverAPIUserEndpoint + "/" + id)
                  .then(result => {
                    setProfileStatus(result.data.data.status);
                    setFirstName(result.data.data.firstname);
                    setLastname(result.data.data.lastname);
                    setBirthdate(result.data.data.birthdate);
                    setDescription(result.data.data.description);
                    setGraphic(result.data.data.graphic);
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          }
        });
    };
    fetchData();
  }, [userid]);

  const onSubmit = e => {
    e.preventDefault();

    const updatedProfile = {
      status: profileStatus,
      firstname: firstname,
      lastname: lastname,
      birthdate: birthdate,
      description: description,
      graphic: graphic
    };

    axios
      .put(dataserverAPIUserEndpoint + "/" + id, updatedProfile)
      .then()
      .catch(err => {
        const { error } = err.response.data;
        console.log(error);
        if (error == "TokenExpiredError" || error == "JsonWebTokenError") {
          axios
            .post(authorizationAPITokenEndpoint, auth.user)
            .then(data => {
              const { token } = data.data;
              setAuthorizationToken(token);
              axios
                .put(dataserverAPIUserEndpoint + "/" + id, {
                  data: updatedProfile
                })
                .then()
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
      });

    const updatedAccount = {
      userid: userid,
      email: email,
      role: role,
      account_code: accountCode,
      status: status
    };

    axios
      .put(webserverAPIUserEndpoint + "/" + id, {
        data: updatedAccount
      })
      .then(() => {
        history.push("/manage/users");
      })
      .catch(err => {
        const { error } = err.response.data;
        console.log(error);
        if (error == "TokenExpiredError" || error == "JsonWebTokenError") {
          axios
            .post(authorizationAPITokenEndpoint, auth.user)
            .then(data => {
              const { token } = data.data;
              setAuthorizationToken(token);
              axios
                .put(webserverAPIUserEndpoint + "/" + id, {
                  data: updatedAccount
                })
                .then(() => {
                  history.push("/manage/users");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 pl-5 pr-5">
          <h1 className="text-center">Dane konta</h1>
          <form>
            <div className="form-group">
              <label htmlFor="inputId">ID</label>
              <input
                disabled
                className="form-control"
                id="inputId"
                value={userid}
                onChange={e => {
                  setUserid(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input
                required
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label for="selectRole"> Wybierz rolę</label>
              <select
                value={role}
                class="form-control"
                id="selectRole"
                onChange={e => {
                  setRole(e.target.value);
                }}
              >
                <option value="user">Użytkownik</option>
                <option value="verified">Konto zweryfikowane</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="inputAccountCode">Kod konta</label>
              <input
                required
                className="form-control"
                id="inputAccountCode"
                value={accountCode}
                onChange={e => {
                  setAccountCode(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label for="selectStatus"> Wybierz status konta</label>
              <select
                value={status}
                class="form-control"
                id="selectStatus"
                onChange={e => {
                  setStatus(e.target.value);
                }}
              >
                <option value="activated">Aktywne</option>
                <option value="nonactivated">Nieaktywne</option>
                <option value="banned">Zablokowane</option>
              </select>
            </div>
          </form>
        </div>
        <div className="col-6 pl-5 pr-5">
          <h1 className="text-center">Dane profilu</h1>
          <form>
            <div className="form-group">
              <label for="selectProfileStatus"> Wybierz status profilu</label>
              <select
                value={profileStatus}
                class="form-control"
                id="selectProfileStatus"
                onChange={e => {
                  setProfileStatus(e.target.value);
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
                required
                className="form-control"
                id="inputFirstName"
                aria-describedby="firstNameHelp"
                placeholder="Twoje imie"
                value={firstname}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputLastName">Nazwisko</label>
              <input
                required
                className="form-control"
                id="inputLastName"
                aria-describedby="lastNameHelp"
                placeholder="Twoje nazwisko"
                value={lastname}
                onChange={e => {
                  setLastname(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputBirthdate">Data urodzenia</label>
              <input
                required
                type="date"
                className="form-control"
                id="inputBirthdate"
                aria-describedby="birthdateHelp"
                value={birthdate}
                onChange={e => {
                  setBirthdate(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputDescription">Opis</label>
              <input
                required
                className="form-control"
                id="inputDescription"
                aria-describedby="descriptionhelp"
                value={description}
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputGraphic">Podaj link do zdjęcia</label>
              <input
                required
                className="form-control"
                id="inputGraphic"
                aria-describedby="graphicHelp"
                value={graphic}
                onChange={e => {
                  setGraphic(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row justify-content-center pr-3 pl-3">
        <button
          className="btn btn-primary float-right"
          onClick={e => {
            onSubmit(e);
          }}
        >
          Zapisz zmiany
        </button>

        <button
          className="btn btn-outline-danger float-right"
          onClick={e => console.log(e)}
        >
          Usuń użytkownika
        </button>
        <Link className="btn btn-secondary float-right" to={"/manage/users"}>
          Wróć
        </Link>
      </div>
    </div>
  );
};
