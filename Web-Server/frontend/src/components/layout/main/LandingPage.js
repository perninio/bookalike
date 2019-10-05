import React from "react";
import { Link } from "react-router-dom";
import "./Styles.scss";

export const LandingPage = () => {
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
      <div className="card-deck pt-4 ml-0 mr-0">
        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1548809988-619418ad859c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Społeczność</h5>
            <p className="card-text text-white">
              Dodaj swoich znajomych, wymieniajcie się opiniami o książkach oraz
              wymieniajcie się ze sobą - nasz serwis społecznościowy to wszystko
              usprawni.
            </p>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Wydarzenia</h5>
            <p className="card-text text-white">
              Wśród użytkowników naszego serwisu spotkasz swoich ulubionych
              autorów książek, np. J.K. Rowling, A. Sapkowski - dowiedz się o
              wydarzeniach w pobliżu Twojego miejsca zamieszkania
            </p>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">System rekomendacji</h5>
            <p className="card-text text-white">
              Dzięki naszemu autorskiemu narzędziu, uzyskasz rekomendacje
              bazujące na ocenach Twoich oraz Twoich przyjaciół. System ten jest
              w pełni darmowy!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
