import React from "react";
export const Card = props => {
  const { imgSrc, cardTitle, cardText } = props.data;

  return (
    <div className="card">
      <img src={imgSrc} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text text-white">{cardText}</p>
      </div>
    </div>
  );
};
