import React from "react";
import { Link } from "react-router-dom";
import { cardsData } from "./staticData";
import "./Styles.scss";
import { Card } from "./Card";

export const LandingPage = () => {
  const cards = cardsData.map((cardData, index) => (
    <Card data={cardData} key={index} />
  ));

  return (
    <div className="">
      <div className="row-fluid">
        <div className="jumbotron jumbotron-fluid">
          <h1 className="display-4">Witaj czytelniku!</h1>
          <p className="lead">
            Nasz serwis społecznościowy poświęcony jest tematyce książek. Oprócz
            typowych czynności jak: dyskusje z znajomymi, znajdywanie
            najbliższych imprez książkowych, <br />
            oddajemy w Waszą dyspozycję system rekomendacyjny, który wspomoże
            Was w wyborze następnej książki.
          </p>
          <hr className="my-4" />
          <p>
            Zarejestruj się jeszcze dziś, oceń parę książek - a już jutro,
            będziesz mógł przeglądać propozycje książek dla Ciebie
            indywidualnie!
          </p>
          <Link className="btn btn-primary btn-lg" to="/register">
            Dołącz do nas
          </Link>
        </div>
      </div>
      <div className="card-deck pt-4 ml-0 mr-0">{cards}</div>
    </div>
  );
};
