import React, { useState } from "react";
import QuantityModificationBar from "../components/QuantityModificationBar";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Invoice from "./Invoice";
import { updateCart } from "../Reducer/stockSlice";
import { click } from "@testing-library/user-event/dist/click";
// import cartConfirmationBox from "../components/cart-confirmation-Box";
import CartConfirmationBox from "../components/Cart-Confirmation-Box";
import { Link, Navigate, ScrollRestoration } from "react-router-dom";

function Cart() {
  // stock has "_id" and any other array has "id"

  const state = useSelector((state) => state);
  const cart = state.cart;
  const [confirmationBox, setConfirmationBox] = useState(false);
  const [units, setUnits] = useState(0);
  const [clickedItemId, setClickedItemId] = useState(0);
  const [isGenerateBillClicked, setIsGenerateBillClicked] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  // const [discountedPrice, setDiscountedPrice] = useState();

  // var flag = false;

  // console.log(typeof cart[0].cartUnit);

  // const total = cart.map((data) =>
  //   ((data.price / data.quantity) * data.cartUnit).toFixed(1)
  // );

  // console.log(units);
  // console.log(cart?.length);

  function screenSizeChange() {
    setScreenWidth(window.screen.width);
  }

  window.onresize = screenSizeChange;

  let cartTotal = 0,
    cartProfit = 0;
  console.log(typeof cartTotal);
  for (var i = 0; i < cart?.length; i++) {
    var currCartItem = cart[i];
    console.log(currCartItem);
    // console.log(typeof currCartItem.cartUnit);
    cartTotal += parseFloat(
      (currCartItem.discountedPrice * currCartItem.cartUnit).toFixed(2)
    );
    cartProfit += parseFloat(
      (
        (currCartItem.discountedPrice - currCartItem.costPrice) *
        currCartItem.cartUnit
      ).toFixed(2)
    );
    console.log(cartProfit);
    console.log(cartTotal);
  }

  function handleUpdateCartUnits(id, unitsInCart) {
    setConfirmationBox(true);

    // const currItemDataOfCart = cart.filter((data) => data.id === clickedItemId);

    setUnits(unitsInCart);
    console.log(id);
    setClickedItemId(id);
    const currItemData = cart.filter((data) => data.id === id);
    console.log(currItemData[0].discount);
    setDiscountPercent(currItemData[0].discount);
    console.log(discountPercent);
    console.log(unitsInCart);
  }

  function handleBill() {
    setIsGenerateBillClicked(!isGenerateBillClicked);
    // <Invoice props={state} cartTotal={cartTotal} />;
  }

  return (
    <div className="cart">
      {cart?.length == 0 || cart?.length == undefined ? (
        <div className="welcome-block">
          <h1>
            UGHH...! <br></br>
            <br></br>YOUR CART IS EMPTY
          </h1>
          {/* <Link to="/">
            <button className="submit-button">ADD ITEM</button>
          </Link> */}
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="item-name">Item Name</th>
              {/* <th className="salt-field">Salt</th> */}
              <th>MRP</th>
              <th>Stock</th>
              <th>Units</th>
              <th>Amount</th>
              {/* <th>Update Qty</th> */}
            </tr>
          </thead>

          <tbody>
            {cart?.length == 0 && <div></div>}
            {cart?.length > 0 &&
            typeof cart != "undefined" &&
            cart[0]?.id != 0 ? (
              cart?.map((data) => (
                <tr>
                  <td className="item-name">{data.name}</td>
                  <td>{data.price}/-</td>
                  <td>{data.quantity}</td>
                  <td>
                    <div
                      id="unitsUpdate"
                      onClick={() =>
                        handleUpdateCartUnits(data.id, data.cartUnit)
                      }
                    >
                      {console.log("->> ", data.id)}
                      {data.cartUnit}
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/32/32195.png"
                        id="quantity"
                      />
                    </div>
                  </td>
                  <td>
                    {data.discount > 0 ? (
                      <>
                        <s style={{ fontWeight: "400", fontSize: "8px" }}>
                          {(data.price * data.cartUnit).toFixed(1)}
                        </s>
                        <p
                          style={{
                            marginTop: "1px",
                            marginBottom: "1px",
                            fontSize: "10px",
                          }}
                        >
                          {/* {setDiscountedPrice(
                            (
                              data.price *
                              ((100 - data.discount) / 100) *
                              data.cartUnit
                            ).toFixed(1)
                          )} */}
                          {(data.discountedPrice * data.cartUnit).toFixed(2)}/-
                        </p>
                        <span
                          style={{
                            color: "red",
                            fontWeight: "600",
                            fontSize: "8px",
                          }}
                        >
                          ({data.discount}% off)
                        </span>
                      </>
                    ) : (
                      <>
                        {console.log(data.discount)}
                        <div
                          style={{
                            // color: "red",
                            // fontWeight: "600",
                            fontSize: "10px",
                          }}
                        >
                          {(data.price * data.cartUnit).toFixed(1)}/-
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
      )}
      {confirmationBox && (
        <CartConfirmationBox
          units={units}
          setUnits={setUnits}
          setConfirmationBox={setConfirmationBox}
          clickedItemId={clickedItemId}
          isFromCart={true}
          setClickedItemId={setClickedItemId}
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
        />
      )}

      {isGenerateBillClicked && (
        <CartConfirmationBox
          setIsGenerateBillClicked={setIsGenerateBillClicked}
          isGenerateBillClicked={isGenerateBillClicked}
          cartTotal={cartTotal}
          cartProfit={cartProfit}
        />
      )}

      {cart?.length > 0 && (
        <div className="bill-section">
          <div className="cart-total">
            Bill Total : <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <button onClick={handleBill}>Generate Bill</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
