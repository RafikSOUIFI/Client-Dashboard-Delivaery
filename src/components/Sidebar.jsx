import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilCreditCard,
  UilDollarSign,
  UilPackage
} from "@iconscout/react-unicons";

const Sidebar = ({setHideCards, setRender, render }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(false)
  const [role,setRole]=useState("fournisseur")
useEffect(()=>{
  if(JSON.parse(localStorage.getItem('user'))){
    setRole(JSON.parse(localStorage.getItem('user')).role)
  }
},[])

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    setRender(!render)
  };

  
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" style={{ height: '200%' , width: '60%' }}/>
        <span>
        </span>
      </div>

      <div className="menu">

            <div
              className={selected === 0 ? "menuItem active" : "menuItem"}
              onClick={() => {setSelected(0);setHideCards(false); setExpaned(!expanded)}}
            >
              <UilEstate />
              <span>Accueil</span>
            </div>
            {role === "fournisseur" && <div
              className={selected === 1 ? "menuItem active" : "menuItem"}
              onClick={() => {setSelected(1);setHideCards("AddPickUp");setExpaned(!expanded)}}
            >
              <UilClipboardAlt />
              <span>Ajouter colis</span>
            </div>}
            {role === "fournisseur" && <div
              className={selected === 2 ? "menuItem active" : "menuItem"}
              onClick={() => {setSelected(2);setHideCards("Virements"); setExpaned(!expanded)}}
            >
              <UilDollarSign />
              <span>Virements</span>
            </div>}
            {role === "admin" && <div
              className={selected === 3 ? "menuItem active" : "menuItem"}
              onClick={() => {setSelected(3);setHideCards("CréerCompte"); setExpaned(!expanded)}}
            >
              <UilUsersAlt />
              <span>Créer compte</span>
            </div>}
            {role === "admin" && <div
              className={selected === 4 ? "menuItem active" : "menuItem"}
              onClick={() => {setSelected(4);setHideCards("Paiement"); setExpaned(!expanded)}}
            >
              <UilCreditCard />
              <span>Paiement</span>
            </div>}
            {(role === "admin" || role === "ouvrier") &&<div
              className={selected === 5 ? "menuItem active" : "menuItem"}
              onClick={() => {setSelected(5);setHideCards("Transactions"); setExpaned(!expanded)}}
            >
              <UilPackage />
              <span>Transactions</span>
            </div>}

        {/* signoutIcon */}
        <div className="menuItem" onClick={() => handleLogout()}>
          <UilSignOutAlt />
          <span>Déconnexion</span>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;