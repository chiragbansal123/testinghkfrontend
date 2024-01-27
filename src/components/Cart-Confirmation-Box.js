import React, { useState } from "react";
import axios from "axios";
// import { Link, Navigate } from "react-router-dom";
import QuantityModificationBar from "./QuantityModificationBar";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, deleteFromCart, addCustomer } from "../Reducer/stockSlice";
import { redirect, useLocation, useNavigate } from "react-router-dom";
// import { click } from "@testing-library/user-event/dist/click";

function CartConfirmationBox({
  units,
  setUnits,
  setConfirmationBox,
  clickedItemId,
  setClickedItemId,
  isGenerateBillClicked,
  setIsGenerateBillClicked,
  isFromCart,
  cartTotal,
  cartProfit,
  discountPercent,
  setDiscountPercent,
}) {
  // stock has "_id" and any other array has "id"

  //   const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isdeleteFromCartClicked, setIsDeleteFromCartClicked] = useState(false);
  const [isChangeDiscountClicked, setIsChangeDiscountClicked] = useState(false);
  // const [discountPercent, setDiscountPercent] = useState(0);
  //   const location = useLocation();
  //   const path = location.pathname;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const stock = useSelector((state) => state.stock);
  const cart = state.cart;

  console.log(discountPercent);

  const currItemData = cart.filter((data) => data.id === clickedItemId);
  // console.log(currItemData[0].discount);
  // console.log("clickedItemId ->> ", clickedItemId);

  // let discount = currItemData[0].discount;
  // console.log(discount, "%");
  // console.log(typeof discountedPrice);

  // setDiscountPercent(currItemData[0].discount);

  function handleUpdateInCart() {
    console.log("---->>> ", discountPercent, "%");
    // // setDiscountPercent(currItemData[0].discount);
    // console.log(discount, "%");
    // discount = discountPercent;
    let discountedPrice = parseFloat(
      (currItemData[0].price * ((100 - discountPercent) / 100)).toFixed(2)
    );
    console.log(discountedPrice);
    // console.log(discount);
    if (units <= currItemData[0].quantity) {
      // console.log();

      console.log("here");

      if (discountedPrice < currItemData[0].costPrice) {
        alert(
          "Kindly, cross-check discount percent as discounted price is less than cost price!!!"
        );
      } else {
        const cart = {
          id: currItemData[0].id,
          productId: currItemData[0].productId,
          name: currItemData[0].name,
          salt: currItemData[0].salt,
          quantity: currItemData[0].quantity,
          cartUnit: units,
          costPrice: currItemData[0].costPrice,
          price: currItemData[0].price,
          expiry: currItemData[0].expiry.substring(0, 10),
          discount: discountPercent,
          discountedPrice: discountedPrice,
          shelf: currItemData[0].shelf,
          customer: currItemData[0].customer,
        };

        dispatch(
          updateCart({
            updatedCart: cart,
          })
        );

        console.log(cart);

        setUnits(0);
        setConfirmationBox(false);
      }
    } else {
      alert("Not enough units in stock");
    }
  }

  function handleDeleteFromCart() {
    dispatch(
      deleteFromCart({
        id: clickedItemId,
      })
    );
    setClickedItemId(0);
    setIsDeleteFromCartClicked("clicked");
    setConfirmationBox(false);
  }

  // async function handleOutOfStock() {
  //   // e.preventDefault();
  //   // console.log(currItemData[0]._id);
  //   const { data } = await axios.post(
  //     `https://hisaabkitaab-backend.vercel.app/outOfStock/`,
  //     {
  //       id: currItemData[0]._id,
  //       customer: currItemData[0].customer,
  //       name: currItemData[0].name,
  //       salt: currItemData[0].salt,
  //       price: currItemData[0].price,
  //       quantity: 0,
  //       shelf: currItemData[0].shelf,
  //       availability: false,
  //       worksAt: state.user.worksAt,
  //     }
  //   );

  //   setConfirmationBox(false);
  // }

  function cross() {
    if (isGenerateBillClicked) {
      setIsGenerateBillClicked(!isGenerateBillClicked);
    } else {
      setConfirmationBox(false);
    }

    // if (stockMgt != undefined) {
    //   setStockMgt(false);
    // }
  }

  function handleApplyDiscount() {
    // alert("discount coming soon");
    setIsChangeDiscountClicked(!isChangeDiscountClicked);
  }

  async function handleProceedToInvoice(e) {
    e.preventDefault();

    const customer_name = document.getElementById("customerName").value;
    const mobile = document.getElementById("mobile").value;
    if (mobile.length == 10) {
      setIsGenerateBillClicked(false);
      const email = document.getElementById("email").value;
      const endCustomer = {
        name: customer_name,
        mobile: mobile,
        email: email,
        billAmount: cartTotal,
        // cartProfit: cartProfit,
        shoppedFrom: state.user.worksAt,
      };

      dispatch(
        addCustomer({
          endCustomer: endCustomer,
        })
      );

      console.log(email);

      console.log(state.cart);
      let data;
      try {
        data = await axios.post(
          `https://hisaabkitaab-backend.vercel.app/createInvoice`,
          // `http://localhost:8000/createInvoice`,

          {
            // invoiceNo: 100,
            cart: cart,
            name: customer_name,
            mobile: mobile,
            email: email,
            // createdAt: Date(),
            billAmount: cartTotal,
            billProfit: cartProfit,
            invoiceDate: Date().substring(0, 25),
            // shoppedFrom: state.user.worksAt,
            businessName: state.user.worksAt,
          }
        );

        cart.map((cartItem) =>
          axios.post(
            `https://hisaabkitaab-backend.vercel.app/updateStockAfterBill`,
            {
              id: cartItem.id,
              cartUnit: cartItem.cartUnit,
            }
          )
        );

        cart.map((cartItem) =>
          dispatch(
            deleteFromCart({
              id: cartItem.id,
            })
          )
        );

        if (data != undefined) {
          navigate(`/invoice/${data?.data.invoiceNo}`);
        }
      } catch (error) {
        alert(error);
      }

      console.log(data);

      // navigate(`/invoice/${data?.invoiceNo}`);
    } else {
      alert("enter correct mobile number");
    }
  }

  return (
    <div className="cart-confirmation-box">
      {!isGenerateBillClicked ? (
        <>
          <div className="content-box">
            {!isGenerateBillClicked && <div>Select Units</div>}
            <div className="back-to-home-cross-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
                className="back-to-home-cross"
                onClick={cross}
              />
            </div>
            {!isGenerateBillClicked && (
              <QuantityModificationBar
                clickedItemId={clickedItemId}
                units={units}
                setUnits={setUnits}
                isFromCart={isFromCart}
                setIsDeleteFromCartClicked={setIsDeleteFromCartClicked}
              />
            )}
            {!isChangeDiscountClicked ? (
              <div
                className="apply-discount"
                style={{
                  // position: "absolute",
                  marginTop: "10px",
                  marginBottom: "-20px",
                  // marginLeft: "150px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleApplyDiscount}
              >
                Change Discount
              </div>
            ) : (
              <div className="discount-section">
                Change Discount -&nbsp;
                <input
                  type="text"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="units"
                  id="discount"
                />
                %
              </div>
            )}
            {!isdeleteFromCartClicked ? (
              <button onClick={handleUpdateInCart}>UPDATE</button>
            ) : (
              <button onClick={handleDeleteFromCart}>DELETE</button>
            )}
          </div>
        </>
      ) : (
        <div id="billConfirmationBox" className="content-box">
          <div className="back-to-home-cross-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
              className="back-to-home-cross"
              onClick={cross}
            />
          </div>

          <form onSubmit={handleProceedToInvoice}>
            <input
              type="text"
              placeholder="Customer Name"
              id="customerName"
              // value={itemData.salt}
              required
            ></input>
            <input
              type="Number"
              placeholder="Mobile No."
              id="mobile"
              // value={itemData.salt}
              required
            ></input>
            <input
              type="email"
              placeholder="Email"
              id="email"
              // value={itemData.salt}
            ></input>
            <button className="proceed">PROCEED</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CartConfirmationBox;
