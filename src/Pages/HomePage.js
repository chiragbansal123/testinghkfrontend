import React from "react";
import Dashboard from "./Dashboard";
import Stock from "./Stock";
import Cart from "./Cart";
import Orders from "./Orders";

function HomePage() {
  return (
    <div className="HomePage">
      <Dashboard />
      <div className="order-process">
        <Stock />
        <Cart />
      </div>
      {/* <div className="HomePage-right">
        <div className="order-process">
          <Stock />
          <Cart />
        </div>
        <>
          <Orders />
        </>
      </div> */}
    </div>
  );
}

export default HomePage;
