import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import LoginRegisterBar from "./Login-Register-Bar";
// import LoginPage from "./Pages/LoginPage";
// import Register from "./Register";
import ConfirmationBox from "./components/Confirmation-Box";
import Footer from "./components/Footer";
import Stock from "./Pages/Stock";
import { useSelector } from "react-redux";
import AddUpdateItem from "./Pages/AddUpdateItem";

// import LoginPage from "./LoginPage";

function Layout() {
  // const isMobile = window.matchMedia("(max-width: 572px)").matches;
  var isUserClicked = false;
  const [screenWidth, setScreenWidth] = useState(window.screen.width);

  function screenSizeChange() {
    setScreenWidth(window.screen.width);
    console.log(screenWidth);
  }

  window.onresize = screenSizeChange;

  return (
    <div className="App">
      <Header isUserClicked={isUserClicked} />
      <Outlet />
      {/* {isMobile ? <p>This content is for mobile</p> : <Footer />} */}
      {screenWidth > 430 && <Footer />}
    </div>
  );
}

export default Layout;
