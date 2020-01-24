import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import axios from "axios";
import {
  dataserverAPIUserEndpoint,
  dataserverAPIBooksEndpoint
} from "../../../../constants/serverEndpoint";
import { Sidebar } from "../../common/Sidebar";

export const SearchPage = props => {
  const [activeKey, setActiveKey] = useState(2);
  const width = 128,
    height = 128;

  const text = props.match.params.text ? props.match.params.text : "";

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  console.log(users);

  let booksAccordion = books.map(book => {
    return (
      <Panel header={book.name}>
        <p>Autor: {book.author}</p>
        <p>Kategoria: {book.booktype}</p>
        <p>Rok pierwszej publikacji: {book.year}</p>
        <img src={book.graphic} width={width} height={height}></img>
        <Link to={"/book/" + book.bookid} className="btn btn-primary">
          Przejdź do książki
        </Link>
      </Panel>
    );
  });

  let userAccordion = users.map(user => {
    return (
      <Panel header={user.firstname + " " + user.lastname}>
        {user.birthdate && <p>Data urodzenia: {user.birthdate}</p>}
        {user.description && <p>Opis: {user.description}</p>}
        <img src={user.graphic} width={width} height={height}></img>
        <Link to={"/user-page/" + user.id} className="btn btn-primary">
          Przejdź do profilu użytkownika
        </Link>
      </Panel>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      if (text != "") {
        axios
          .get(dataserverAPIBooksEndpoint + "/name/" + text)
          .then(result => {
            setBooks(result.data.data);
          })
          .catch(err => console.log(err));
      }
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    const fetchData = async () => {
      if (text != "") {
        axios
          .get(dataserverAPIUserEndpoint + "/name/" + text)
          .then(result => {
            setUsers(result.data.data);
          })
          .catch(err => console.log(err));
      }
    };
    fetchData();
  }, [text]);

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="d-none d-xs-block d-sm-inline col-sm-2">
          <Sidebar />
        </div>
        <div
          className="col-xs-12 col-sm-8 content-col"
          style={{ backgroundColor: "white", marginLeft: 0 }}
        >
          <Collapse activeKey={activeKey} onChange={setActiveKey}>
            <Panel
              header={
                users.length > 0
                  ? "Użytkownicy: " + users.length
                  : "Użytkownicy: brak"
              }
              key={1}
              disabled={users.length == 0 ? true : false}
            >
              <Collapse>{users != [] && userAccordion}</Collapse>
            </Panel>
            <Panel
              header={
                books.length > 0 ? "Książki: " + books.length : "Książki: brak"
              }
              key={2}
              disabled={books.length == 0 ? true : false}
            >
              <Collapse>{books != [] && booksAccordion}</Collapse>
            </Panel>
          </Collapse>
        </div>
        <div className="d-none d-xs-block d-sm-inline col-sm-2"></div>
      </div>
    </div>
  );
};
