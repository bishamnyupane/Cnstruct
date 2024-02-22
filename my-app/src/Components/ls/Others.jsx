import React from "react";
import "./Others.css";

const Others = ({ ordersHistory, cancelOrder,confirmOrder }) => {
  const handleCancelItem = (orderId, itemId) => {
    cancelOrder(orderId, itemId);
  };

  const handleConfirmOrder = () => {
    confirmOrder();
    alert("Order confirmed successfully!");
  };

  return (
    <div className="odr">
      <h2>My Orders</h2>
      {ordersHistory && ordersHistory.length > 0 ? (
        <ul>
          {ordersHistory.map((order, orderIndex) => (
            <li key={orderIndex}>
              <h3>Order {orderIndex + 1}</h3>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <div>
                      <span>{item.name}</span>
                      <button
                        className="cls"
                        onClick={() => handleCancelItem(orderIndex, itemIndex)}
                      >
                        Cancel
                      </button>


                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}
      {ordersHistory && ordersHistory.length > 0 && (
        <button className="cfrmbtn" onClick={handleConfirmOrder}>
        Confirm Order
        </button>
      )}
    </div>
  );
};

export default Others;