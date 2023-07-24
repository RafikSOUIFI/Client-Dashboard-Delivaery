import React from "react";
import Cards from "../Cards/Cards";
import "./MainDash.css";
import ShowPackage from "../../Added";
import PrintPckage from "../../Added/PrintPckage";
import AddPickUp from "../AddPickUp";
import AddUser from "../AddUser/AddUser";
import Transactions from "../Transactions/Transactions";
import Paiement from "../Paiement/Paiement";
import Virements from "../Virements/Virements";
const MainDash = ({setHideCards, hideCards, setSuccess}) => {

  return (
    <>
    {!hideCards && <div className="MainDash" >
      <h1>Tableau de bord</h1>
      <Cards setHideCards={setHideCards}/>
    </div>}
    {hideCards && <div className="MainDash">
      {hideCards !== "En attente" && hideCards !== "AddPickUp" && hideCards !== "CréerCompte" && hideCards !== "Transactions" && hideCards !== "Paiement" && hideCards !== "Virements" && <ShowPackage hideCards={hideCards} setSuccess={setSuccess}/>}
      {hideCards === "En attente" && <PrintPckage setSuccess={setSuccess}/>}
      {hideCards === "AddPickUp" && <AddPickUp setSuccess={setSuccess}/>}
      {hideCards === "CréerCompte" && <AddUser setSuccess={setSuccess}/>}
      {hideCards === "Transactions" && <Transactions/>}
      {hideCards === "Paiement" && <Paiement/>}
      {hideCards === "Virements" && <Virements/>}
    </div>}
    </>
  );
};

export default MainDash;
