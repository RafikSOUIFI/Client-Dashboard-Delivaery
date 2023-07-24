import React from "react";
import serviceClient from "../../imgs/service-client.png"


const CustomerReview = () => {
  return <div className="CustomerReview">
    <img
      src={serviceClient} alt="Customer"
      style={{ width: '285px', height: '260px' }}
    />
  </div>;
};

export default CustomerReview;
