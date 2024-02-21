import React, { useState, useEffect } from "react";
import Pay from "./Pay";
import Others from "./Others";
const MyOrders = ({ ordersHistory, cancelOrder }) => {
 

  return (
    <div>
      <Others ordersHistory={ordersHistory} cancelOrder={cancelOrder} />
    </div>
  );
};

export default MyOrders;
