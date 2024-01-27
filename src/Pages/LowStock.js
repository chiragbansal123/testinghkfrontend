import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { redirect, useLocation, useNavigate } from "react-router-dom";

function LowStock() {
  // stock has "_id" and any other array has "id"

  const [lowStock, setLowStock] = useState();
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  function func() {
    // console.log(state);
    setLowStock(
      state.stock?.filter((item) => item.quantity <= 5 && item.quantity > 0)
    );
  }

  function outOfStock() {
    // console.log(state);
    setLowStock(state.stock?.filter((item) => item.quantity == 0));
  }

  function handleUpdate(identity) {
    // setConfirmationBox(true);
    // setStockMgt(true);
    // setClickedItemId(id);
    console.log(identity);
    navigate(`/add-item/${identity}`);
    // alert("Stock Mgt. under development");
  }

  useEffect(() => {
    if (id) {
      outOfStock();
    } else {
      func();
    }
  }, []);

  return (
    <div className="low-stock">
      {/* {console.log(lowStock)} */}
      {lowStock?.length == 0 ? (
        <div className="welcome-block">
          <h1>
            COOL...! <br></br>
            <br></br>ENOUGH STOCK AVAILABLE
          </h1>
        </div>
      ) : (
        <div id="lowStock">
          {/* <div className="Search-Bar"></div> */}
          <table>
            <thead>
              <tr>
                <th className="item-name">ITEM NAME</th>
                {/* <th className="salt-field">Salt</th> */}
                {/* <th>ID</th> */}
                <th>PRICE</th>
                <th>STOCK</th>
                <th>SHELF No.</th>
              </tr>
            </thead>
            <tbody>
              {id == undefined
                ? lowStock?.map((data) => (
                    <tr>
                      <td
                        className="item-name"
                        onClick={() => handleUpdate(data._id)}
                      >
                        {/* {console.log(data._id)} */}
                        {data.name}
                      </td>
                      <td>{data.price}</td>
                      <td>{data.quantity}</td>
                      <td>{data.shelf}</td>
                    </tr>
                  ))
                : lowStock?.map((data) => (
                    <tr className="out-of-stock">
                      {/* {console.log(data._id)} */}
                      <td
                        className="item-name"
                        onClick={() => handleUpdate(data._id)}
                      >
                        {data.name}
                      </td>
                      <td>{data.price}</td>
                      <td>{data.quantity}</td>
                      <td>{data.shelf}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LowStock;
