// import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import QuantityModificationBar from "./QuantityModificationBar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Reducer/stockSlice";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import csvtojson from "csvtojson";
import { getProducts } from "../Reducer/stockSlice";
import { hover } from "@testing-library/user-event/dist/hover";

function ConfirmationBox({
  units,
  setUnits,
  setConfirmationBox,
  clickedItemId,
  setClickedItemId,
  isFromCart,
  isGenerateBillClicked,
  setIsGenerateBillClicked,
  stockMgt,
  setStockMgt,
  cartTotal,
  checkPoint,
  setCheckPoint,
}) {
  // stock has "_id" and any other array has "id"

  const client = useSelector((state) => state.user.worksAt);
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);
  const [isdeleteFromCartClicked, setIsDeleteFromCartClicked] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState();
  const [file, setFile] = useState(null);
  const [isApplyDiscountClicked, setIsApplyDiscountClicked] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  // const [discountedPrice, setDiscountedPrice] = useState(0);

  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const stock = useSelector((state) => state.stock);

  const currItemData = stock.filter((data) => data._id === clickedItemId);

  function handleConfirm() {
    // const discount = document.getElementById();
    if (units <= currItemData[0].quantity) {
      let discountedPrice = parseFloat(
        (currItemData[0].price * ((100 - discountPercent) / 100)).toFixed(2)
      );
      if (discountedPrice < currItemData[0].costPrice) {
        alert(
          "Kindly, cross-check discount percent as discounted price is less than cost price!!!"
        );
      } else {
        console.log(typeof currItemData[0].price);
        console.log(typeof discountPercent);

        console.log(discountedPrice);

        const cart = {
          id: currItemData[0]._id,
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
          // customer: currItemData[0].customer,
        };

        dispatch(
          addToCart({
            currCart: cart,
          })
        );
        setUnits(1);
        setConfirmationBox(false);
      }
    } else {
      alert("Not enough units in stock");
    }
  }

  function handleUpdateInStock() {
    navigate(`/add-item/${currItemData[0]._id}`);
  }

  async function handleOutOfStock() {
    // e.preventDefault();
    // console.log(currItemData[0]._id);
    const { data } = await axios.post(
      `https://hisaabkitaab-backend.vercel.app/outOfStock/`,
      {
        id: currItemData[0]._id,
        productId: currItemData[0].productId,
        // customer: currItemData[0].customer,
        name: currItemData[0].name,
        salt: currItemData[0].salt,
        price: currItemData[0].price,
        quantity: 0,
        shelf: currItemData[0].shelf,
        availability: false,
        worksAt: state.user.worksAt,
      }
    );

    setConfirmationBox(false);
  }

  function cross() {
    if (isGenerateBillClicked) {
      setIsGenerateBillClicked(!isGenerateBillClicked);
      // setConfirmationBox(false);
    } else {
      setConfirmationBox(false);
    }

    // console.log(typeof stockMgt);
    if (stockMgt != undefined) {
      setStockMgt(false);
    }

    if (checkPoint) {
      setCheckPoint(!checkPoint);
    }
  }

  async function getData() {
    try {
      const data = await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getStock/${client}`
      );

      dispatch(
        getProducts({
          stock: data.data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  function handleApplyDiscount() {
    // alert("discount coming soon");
    setIsApplyDiscountClicked(!isApplyDiscountClicked);
  }

  function handleSingleAdd() {
    navigate("/add-item");
  }

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (file) {
      console.log("file is present");
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csv = e.target.result;
        const jsonArray = await csvtojson().fromString(csv);
        setJsonData(jsonArray);
      };
      reader.readAsText(file);
    }
  };

  async function insertToCsv() {
    const data = await axios.post(
      "https://hisaabkitaab-backend.vercel.app/bulkUpload",
      {
        data: jsonData,
        client: state.user.worksAt,
      }
    );
  }
  useEffect(() => {
    console.log("inside jsonData", jsonData);
    if (jsonData != null) {
      console.log("inside jsonData data is present", jsonData);
      insertToCsv();
      setCheckPoint(!checkPoint);
      getData();
    }
  }, [jsonData]);

  return (
    <div className="confirmation-box">
      {!checkPoint ? (
        <>
          {!stockMgt ? (
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
              {!isApplyDiscountClicked ? (
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
                  Apply Discount
                </div>
              ) : (
                <div className="discount-section">
                  Enter Discount -&nbsp;
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
              <button onClick={handleConfirm}>CONFIRM</button>
            </div>
          ) : (
            <div className="stock-content-box" id="update">
              <div
                className="confirmation-box-header"
                // style={{ fontWeight: "bold", marginBottom: "10px" }}
              >
                {currItemData[0].name}
              </div>
              <div
                className="confirmation-box-middle"
                style={{
                  fontSize: "10px",
                  color: "grey",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  width: "200px",
                  height: "50px",
                }}
              >
                Description-
                <div style={{ fontSize: "15px", color: "black" }}>
                  {currItemData[0].salt}
                </div>
              </div>
              <div className="back-to-home-cross-container">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
                  className="back-to-home-cross"
                  onClick={cross}
                />
              </div>
              <div
                className="confirmation-box-bottom"
                style={{
                  fontSize: "12px",
                  color: "grey",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // marginBottom: "10px",
                }}
              >
                Update {currItemData[0].name}
                <img
                  id="updateIcon"
                  src="https://cdn-icons-png.flaticon.com/128/2356/2356780.png"
                  style={{
                    height: "20px",
                    // backgroundColor: "red",
                    padding: "3px",
                    cursor: "pointer",
                    // marginTop: "10px",
                  }}
                  // onMouseOver={hoverOnUpdate}
                  onClick={handleUpdateInStock}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="stock-content-box">
          <div className="back-to-home-cross-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
              className="back-to-home-cross"
              onClick={cross}
            />
          </div>
          <input
            type="submit"
            id="label"
            value="ADD ITEM"
            style={{ border: "0px" }}
            onClick={handleSingleAdd}
          />

          {/* </input> */}

          <div className="file">
            <input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <label id="label" for="file">
              Select file
            </label>
          </div>
          <button onClick={handleFileUpload}>BULK UPLOAD</button>

          {jsonData && (
            <div>
              <h2>Converted JSON Data:</h2>
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConfirmationBox;
