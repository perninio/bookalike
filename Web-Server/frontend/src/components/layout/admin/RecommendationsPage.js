import React, { useState, useEffect } from "react";
import axios from "axios";
import { recommendationserverAPIEndpoint } from "../../../constants/serverEndpoint";

export const RecommendationsPage = () => {
  const [result, setResult] = useState("");

  const CVRecommendations = e => {
    e.preventDefault();
    setResult("");
    axios
      .get(recommendationserverAPIEndpoint + "cv")
      .then(setResult("Pozytywnie zmieniono na CV"))
      .catch(err => {
        console.log(err);
        setResult("Napotkano problemy");
      });
  };

  const TFIDFRecommendations = e => {
    e.preventDefault();
    setResult("");
    axios
      .get(recommendationserverAPIEndpoint + "tfidf")
      .then(setResult("Pozytywnie zmieniono na TFIDF"))
      .catch(err => {
        console.log(err);
        setResult("Napotkano problemy");
      });
  };

  return (
    <div class="container-fluid">
      <div className="row-fluid justify-content-center ml-auto mr-auto">
        <div className="col text-center">
          <button
            className="btn btn-lg btn-secondary mr-3"
            onClick={e => {
              CVRecommendations(e);
            }}
          >
            Zmień na CV
          </button>
          <button
            className="btn btn-lg btn-secondary ml-3"
            onClick={e => {
              TFIDFRecommendations(e);
            }}
          >
            Zmień na TFIDF
          </button>
        </div>
      </div>
      <div className="row-fluid text-center">
        {result != "" && <h1>Rezultat: {result}</h1>}
      </div>
    </div>
  );
};
