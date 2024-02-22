import React from "react";
import Others from "./Others.jsx";
const MyOrders = ({ ordersHistory, cancelOrder }) => {


  return (
    <div>
      <Others ordersHistory={ordersHistory} cancelOrder={cancelOrder} />
    </div>
   );
};

export default MyOrders;