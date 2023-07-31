import React from "react";
import "./Updates.css";
const Updates = () => {
  return (
    <div className="Updates">
      <div className="update">
        <div className="noti">
          <div style={{ marginBottom: '0.5rem' }}>
            <span>Nous mettons à votre disposition un services client pour satisfaire au mieux vos besoins.<br/><br/>
             Pour toutes informations vous pouvez nous contacter sur :</span>
              <span style={{ color: 'red' }}><br/>58 023 439</span>
          </div>
          <span>Services client de lundi au samedi de <span style={{ color: 'red' }}>8h30</span> à <span style={{ color: 'red' }}>17h</span></span>
        </div>
      </div>
    </div>
  );
};

export default Updates;
