import React from "react";
import "./Cards.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { cardsData } from "../../Data/Data";

import Card from "../Card/Card";

const Cards = ({setHideCards}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [colis, setColis] = useState([])
  var data =[]

  useEffect(() => { axios.get(`${baseUrl}/colis`).then(({ data }) => setColis(data)).catch((err) => console.log(err)) }, [])
  data = colis
  if(localStorage.getItem('user')){
    if(JSON.parse(localStorage.getItem('user')).role === "fournisseur"){
      data = (colis.filter((e) => e.id_fournisseur === JSON.parse(localStorage.getItem('user')).id))
    }
    if(JSON.parse(localStorage.getItem('user')).role === "livreur"){
      data = (colis.filter((e) => e.id_livreur === JSON.parse(localStorage.getItem('user')).id))
    }
    if(JSON.parse(localStorage.getItem('user')).role === "ouvrier"){
      data = []
    }
  }
  
  const modifiedCardsData = cardsData.map((card) => {
    const matchingData = data.filter((item) => item.status.toLowerCase() === card.status.toLowerCase());
    const number = matchingData.length;
    const money = matchingData.reduce((sum, item) => sum + item.prix, 0);
    const modifiedCard = {
      title: card.title,
      color: card.color,
      barValue: card.barValue,
      value: card.value,
      png: card.png,
      status: card.status,
      number,
      money,
    };
  
    return modifiedCard;
  });
  
  return (
    <div className="Cards">
      {modifiedCardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              status={card.status}
              number={card.number}
              money={card.money}
              setHideCards={setHideCards}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
