import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddUpdateItem from "../Pages/AddUpdateItem";
// import "/";

function Header() {
  // stock has "_id" and any other array has "id"

  // const [isLoggedIn, setIsLoggedIn] = useState(false); // need to initialize false
  const state = useSelector((state) => state);
  const [isUserClicked, setIsUserClicked] = useState(false);
  const isAuth = state.isAuth;
  const [lowStock, setLowStock] = useState();

  const navigate = useNavigate();

  function handleUserIconClick() {
    setIsUserClicked(!isUserClicked);
    // console.log("user clicked -> ", isUserClicked);
    // console.log("isAuth-> ", isAuth);
  }

  // console.log("user clicked ", isUserClicked);
  // console.log("isAuth ", isAuth);

  async function func() {
    const lowStock = state.stock.filter(
      (item) => item.quantity <= 5 && item.quantity > 0
    );
    setLowStock(lowStock.length);
  }

  function handleLowStock() {
    navigate(`/lowStock`);
  }

  useEffect(() => {
    func();
  }, []);

  return (
    <div className="header" id="no-print">
      {isAuth ? (
        <Link to="/">
          <img
            style={{
              height: "60px",
              width: "80px",
              marginTop: "3px",
              // backgroundColor: "red",
            }}
            src="E766DE1A-D875-49FC-B1BE-458A7785BCE2.PNG"
          />
        </Link>
      ) : (
        <Link to="/">
          <img
            style={{ height: "53px", width: "80px", marginTop: "5px" }}
            src="E766DE1A-D875-49FC-B1BE-458A7785BCE2.PNG"
          />
        </Link>
      )}
      {/* <div id="headerLogo"></div> */}
      <div className="header-user-cart">
        {isAuth && (
          <span id="headerUserIcon">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              onClick={handleUserIconClick}
            />
          </span>
        )}
        {isAuth && (
          <span id="cartIcon" onClick={handleLowStock}>
            <img src="https://cdn-icons-png.flaticon.com/128/1827/1827312.png" />
            <span
              style={{
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                position: "absolute",
                color: "white",
                fontSize: "9px",
                backgroundColor: "red",
                borderRadius: "8px",
                padding: "2px 4px 2px 4px",
                height: "fit-content",
                width: "fit-content",
                border: "1px solid black",
                // marginTop: "-35px",
                // marginLeft: "20px",
                marginTop: "-2px",
                marginLeft: "-10px",
                fontWeight: "600",
              }}
            >
              <span>{lowStock}</span>
            </span>
          </span>
        )}
      </div>
      {/* {!isAuth && !isUserClicked ? <div></div> : <Logout />} */}
      {isAuth && isUserClicked && (
        <Logout
          isUserClicked={isUserClicked}
          setIsUserClicked={setIsUserClicked}
        />
      )}
    </div>
  );
}

export default Header;
