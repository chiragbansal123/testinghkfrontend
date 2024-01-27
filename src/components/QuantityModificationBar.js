import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { update } from "../Reducer/stockSlice";

function QuantityModificationBar({
  clickedItemId,
  units,
  setUnits,
  isFromCart,
  isDeleteFromCartClicked,
  setIsDeleteFromCartClicked,
}) {
  // stock has "_id" and any other array has "id"

  const stock = useSelector((state) => state.stock);
  let cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  // console.log("---> ", clickedItemId);

  var inStock;

  if (clickedItemId) {
    // console.log(clickedItemId);
    if (!isFromCart) {
      const currItemData = stock.filter((data) => data._id === clickedItemId);
      inStock = currItemData[0].quantity;

      // console.log(inStock);
      // console.log("-> ", clickedItemId);
    } else if (isFromCart && isDeleteFromCartClicked != "clicked") {
      const currItemDataOfCart = cart.filter(
        (data) => data.id === clickedItemId
      );
      inStock = currItemDataOfCart[0].quantity;
    }
  }

  // console.log(location.pathname);

  function handleDecrement() {
    if (units > 1) {
      setUnits(units - 1);
    } else {
      alert("use delete button to make quantity 0");
    }
  }

  function handleDropDown(e) {
    if (e.target.value <= inStock) {
      setUnits(parseInt(e.target.value));
    } else {
      alert("Not enough units in stock");
    }
  }

  function handleIncrement() {
    if (units < inStock) {
      setUnits(++units);
      console.log(units);
    } else {
      console.log(inStock);
      alert("Not enough units in stock");
    }
  }

  function handleDeleteFromCart() {
    setIsDeleteFromCartClicked(true);
    setUnits(0);
  }

  return (
    <div className="quantity-modification-bar">
      <img
        className="decreament"
        onClick={handleDecrement}
        src="https://cdn-icons-png.flaticon.com/128/992/992683.png"
      />

      <span className="drop-down">
        {/* <input type="text" value="${units}" className="units">
            {units}
          </input> */}
        <input
          type="text"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="units"
        />
      </span>

      <img
        className="increment"
        onClick={() => handleIncrement()}
        src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
      />

      {isFromCart && (
        <div className="delete-from-cart">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3976/3976956.png"
            onClick={handleDeleteFromCart}
          />
        </div>
      )}
    </div>
  );
}

export default QuantityModificationBar;
