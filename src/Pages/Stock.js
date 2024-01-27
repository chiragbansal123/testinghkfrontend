import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ConfirmationBox from "../components/Confirmation-Box";
// import CheckPoint from "../components/Checkpoint";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";
import csvtojson from "csvtojson";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProducts } from "../Reducer/stockSlice";
import { click } from "@testing-library/user-event/dist/click";
import BarcodeReader from 'react-barcode-reader'
import BarcodeScanner from "../components/BarCodeScanner";
// import { store } from "../store/store";

function Stock() {
  // stock has "_id" and any other array has "id"

  const client = useSelector((state) => state.user.worksAt);
  const stock = useSelector((state) => state?.stock);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [units, setUnits] = useState(1);

  const [checkPoint, setCheckPoint] = useState(false);
  const [confirmationBox, setConfirmationBox] = useState(false);
  const [clickedItemId, setClickedItemId] = useState();
  const [isIdExistsInCart, setIsIdExistsInCart] = useState(false);
  const [stockMgt, setStockMgt] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [stockHeaderClicked, setStockHeaderClicked] = useState(false);
  const[result,setResult]=useState();
  const[openCamera,setOpenCamera]=useState(false);

  const dispatch = useDispatch();

  // console.log(stock);
  // const size = window.screen.width;

  var idExistsInCart;
  // function handleConfirmationBox() {
  //   setConfirmationBox(true);
  // }

  // addEventListener("resize", (event) => {});
  function screenSizeChange() {
    setScreenWidth(window.screen.width);
  }

  window.onresize = screenSizeChange;

  // console.log(screenWidth);

  function handleAddToCart(id) {
    // idExistsInCart = cart.find((cartData) => cartData.id === id);
    setConfirmationBox(true);
    setClickedItemId(id);
  }

  function handleGoToCart() {
    // console.log("go to cart");
    // navigate("/cart");
  }

  function handleAddItem() {
    // console.log("redirect");
    setCheckPoint(!checkPoint);
    // navigate("/add-item");
  }

  async function getData() {
    const today = new Date();
    console.log(today.getFullYear());
    try {
      const headers={
        'X-RapidAPI-Key': '78c62fcc89msh64eef01e3ecbf81p178732jsn4918d1156a54',
        'X-RapidAPI-Host': 'medicine-search-and-autocomplete.p.rapidapi.com'
      }
      const response =
        await axios.get(`https://medicine-search-and-autocomplete.p.rapidapi.com/api/medicine/search?searchterm="dolo"`,{headers});
      console.log(response.data);
    } catch (error) {
      alert(error);
      console.error(error);
    }
    try {
      const data = await axios.get(
        `http://localhost:8000/getStock/${client}`
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
  useEffect(() => {
    // screenWidth = screen.width;
    getData();
  }, []);

  useEffect(() => {
      console.log("inside searchValue useEffect");
    const filtered = stock?.filter(
      (item) =>
        item?.productId?.toLowerCase().startsWith(searchValue?.toLowerCase()) ||
        item?.name?.toLowerCase().startsWith(searchValue?.toLowerCase()) ||
        item?.salt?.toLowerCase().includes(searchValue?.toLowerCase()) ||
        item?.quantity<=5
    ).sort((a,b)=>{
    const date1=new Date(a.expiry);
    const date2=new Date(b.expiry);
    return date1-date2;
    })
    setFilteredData(filtered);
    
  },[searchValue]);

  function handleStockHeaderClicked() {
    setStockHeaderClicked(!stockHeaderClicked);
  }

  function cross() {
    setStockHeaderClicked(!stockHeaderClicked);
  }

  function handleLowStock(id) {
    setConfirmationBox(true);
    setStockMgt(true);
    setClickedItemId(id);
    // alert("Stock Mgt. under development");
  }
  function handleScan(data){
    console.log(data);
    setResult(data);
  }
  function handleError(err){
    console.error(err)
  }
  function handleBarCode(){
    setOpenCamera(!openCamera)
  }

  // console.log(clickedItemId);

  // running 5 times, need to check useEffect (inspect via console)
  return (
    
    <div className="stock">
      <button onClick={handleBarCode}>Open Scanner</button>
      {openCamera && 
      <BarcodeScanner/>  
        }
      {/* <div className="filters-icon">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3161/3161837.png"
          onClick={handleAddItem}
        />
      </div> */}
      {/* {stock.length == 0 ? (
        <div className="welcome-block">
          <h1>
            UGHH...! <br></br>
            <br></br>YOU HAVE NOTHING IN STOCK
          </h1>
          <Link to="/add-item">
            <button className="submit-button">ADD ITEM</button>
          </Link>
        </div>
      ) : (
        <div className="Search-Bar">
          <input
            type="text"
            value={searchValue}
            placeholder="search for item name"
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <span>
            SEARCH
            <img />
          </span>
        </div>
      )} */}

      {screenWidth > 430 ? (
        <div className="stock-header">
          <div className="Search-Bar">
            <input
              type="text"
              value={searchValue}
              placeholder="search in stock"
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
          </div>

          <div className="filters-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3161/3161837.png"
              onClick={handleAddItem}
            />
          </div>
        </div>
      ) : (
        <>
          {cart?.length == 0 ? (
            <div className="stock-header">
              <div className="Search-Bar">
                <input
                  type="text"
                  value={searchValue}
                  placeholder="search in stock"
                  onChange={(e) => setSearchValue(e.target.value)}
                ></input>
              </div>

              <div className="filters-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3161/3161837.png"
                  onClick={handleAddItem}
                />
              </div>
            </div>
          ) : (
            <>
              {stockHeaderClicked ? (
                <div className="stock-header-mobile">
                  <div className="Search-Bar">
                    <input
                      type="text"
                      value={searchValue}
                      placeholder="search in stock"
                      onChange={(e) => setSearchValue(e.target.value)}
                    ></input>
                  </div>

                  <div className="filters-icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3161/3161837.png"
                      onClick={handleAddItem}
                    />
                  </div>
                  <div className="back-to-home-cross-container">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
                      className="back-to-home-cross"
                      onClick={cross}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="stock-header-icon"
                  onClick={handleStockHeaderClicked}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/149/149852.png"
                    style={{ height: "13px", marginRight: "8px" }}
                  />
                  SEARCH
                </div>
              )}
            </>
          )}
          {/*  */}
        </>
      )}

      {checkPoint && (
        <ConfirmationBox
          checkPoint={checkPoint}
          setCheckPoint={setCheckPoint}
          setConfirmationBox={setConfirmationBox}
        />
      )}

      {confirmationBox && (
        <ConfirmationBox
          // confirmationBox={confirmationBox}
          // lastPage={"home-page"}
          units={units}
          setUnits={setUnits}
          setConfirmationBox={setConfirmationBox}
          clickedItemId={clickedItemId}
          stockMgt={stockMgt}
          setStockMgt={setStockMgt}
        />
      )}
      {stock.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="item-name">ITEM NAME</th>
              <th>MRP</th>
              <th>STOCK</th>
              <th>SHELF</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 &&
              filteredData.map((data) => (
                <tr key={data._id}>
                  {/* {console.log(data.expiry)} */}
                  {data.quantity <= 5 ? (
                    <div className="low-stock-row">
                      <td
                        className="item-name"
                        onClick={() => handleLowStock(data._id)}
                      >
                        <p
                          style={{
                            fontSize: "8px",
                            fontWeight: "500",
                            marginBottom: "0px",
                          }}
                        >
                          {data?.productId}
                        </p>
                        {data.name}
                        <p
                          style={{
                            fontSize: "8px",
                            fontWeight: "500",
                            marginTop: "1px",
                          }}
                        >
                          Expiry:
                          {data?.expiry?.substring(8, 10)}-
                          {data?.expiry?.substring(5, 7)}-
                          {data?.expiry?.substring(0, 4)}
                        </p>
                      </td>
                      <td>{data.price}/-</td>
                      <td>
                        <div>
                          {data.quantity}
                          {/* <img src="https://cdn-icons-png.flaticon.com/128/9215/9215114.png" /> */}
                        </div>
                      </td>
                      <td>{data.shelf}</td>
                      {data.availability && data.quantity > 0 ? (
                        <td className="cartIcon">
                          {(idExistsInCart = cart?.find(
                            (cartData) => cartData.id === data._id
                          )) && idExistsInCart != undefined ? (
                            <img
                              src="https://cdn-icons-png.flaticon.com/128/664/664866.png"
                              onClick={handleGoToCart}
                            />
                          ) : (
                            <img
                              src="https://cdn-icons-png.flaticon.com/128/11530/11530382.png"
                              onClick={() => handleAddToCart(data._id)}
                            />
                          )}
                        </td>
                      ) : (
                        <td className="cartIcon">
                          <img></img>
                        </td>
                      )}
                    </div>
                  ) : (
                    <div className="row">
                      <td
                        className="item-name"
                        // id="itemName"
                        onClick={() => handleLowStock(data._id)}
                      >
                        <p
                          style={{
                            fontSize: "8px",
                            fontWeight: "500",
                            marginBottom: "0px",
                          }}
                        >
                          {data?.productId}
                        </p>
                        {data.name}
                        <p
                          style={{
                            fontSize: "8px",
                            fontWeight: "500",
                            marginTop: "1px",
                          }}
                        >
                          Expiry:
                          {data?.expiry?.substring(8, 10)}-
                          {data?.expiry?.substring(5, 7)}-
                          {data?.expiry?.substring(0, 4)}
                        </p>
                      </td>
                      <td>{data.price}/-</td>
                      <td> {data.quantity}</td>
                      <td>{data.shelf}</td>
                      <td className="cartIcon">
                        {(idExistsInCart = cart?.find(
                          (cartData) => cartData.id === data._id
                        )) && idExistsInCart != undefined ? (
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/664/664866.png"
                            onClick={handleGoToCart}
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/11530/11530382.png"
                            onClick={() => handleAddToCart(data._id)}
                          />
                        )}
                      </td>
                    </div>
                  )}
                  {/* {data.quantity == 0 && (
                    <div className="out-of-stock-row">
                      <td className="item-name" onClick={handleItemPage}>
                        {data.name}
                      </td>
                      <td>{data.price}/-</td>
                      <td> {data.quantity}</td>
                      <td>{data.shelf}</td>
                      <td className="cartIcon">
                        {(idExistsInCart = cart.find(
                          (cartData) => cartData.id === data._id
                        )) && idExistsInCart != undefined ? (
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/664/664866.png"
                            onClick={handleGoToCart}
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
                            onClick={() => handleAddToCart(data._id)}
                          />
                        )}
                      </td>
                    </div>
                  )} */}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h1>
            UGH...! <br></br>
            <br></br>NOTHING FOUND
          </h1>

          <Link to="/add-item">
            <button className="submit-button">ADD ITEM</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Stock;
