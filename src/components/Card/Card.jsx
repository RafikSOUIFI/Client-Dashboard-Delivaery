import React from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";

// parent Card

const Card = (props) => {

  return (
    <AnimateSharedLayout>
        
        <CompactCard param={props} />

    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param }) {
  const Png = param.png;
  const biggerBoldTextStyle = {
    fontSize: '20px', // Adjust the font size as needed
    fontWeight: 'bold',
  };
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={()=>param.setHideCards(param.status)}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.number}`}
          styles={{
            text: biggerBoldTextStyle,
          }}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.money} DT</span>
        <span></span>
      </div>
    </motion.div>
  );
}


export default Card;
