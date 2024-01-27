import React, { useEffect, useState } from "react";
import { Route, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
// import Invoice from "./Invoice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

function Orders() {
  // stock has "_id" and any other array has "id"

  const [invoices, setInvoices] = useState(null);
  // const [todayInvoices, setTodayInvoices] = useState();
  const state = useSelector((state) => state);

  const [welcomeBlock, setWelcomeBlock] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isThisMonthFilterClicked, setIsThisMonthFilterClicked] =
    useState(false);
  const [rangeFilter, setRangeFilter] = useState(false);
  const [rangeData, setRangeData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id);

  const [isTodayFilterClicked, setIsTodayFilterClicked] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  console.log(filteredData);

  async function getAllInvoices() {
    // console.log("gere");
    setInvoices(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getAllInvoice/${state.user.worksAt}`
      )
    );
    setLoading(false);
    // console.log(invoices);
  }

  async function getTodayInvoices() {
    console.log("today Sale ->>>>>> )");
    setInvoices(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getTodaysAllInvoice/${state.user.worksAt}`
      )
    );
    setLoading(false);
  }

  async function getThisMonthInvoices() {
    // console.log("here ;)");
    setInvoices(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getThisMonthInvoice/${state.user.worksAt}`
      )
    );
    setLoading(false);
  }

  async function getLastMonthInvoices() {
    setInvoices(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getLastMonthInvoice/${state.user.worksAt}`
      )
    );
    setLoading(false);
  }

  useEffect(() => {
    //   isme hai error ye asc desc k baad firse chal rha h

    // console.log(id);
    if (id == 0) {
      // console.log("hey");
      getThisMonthInvoices();
    } else if (id == -1) {
      getLastMonthInvoices();
    } else if (typeof id == "string") {
      getTodayInvoices(id);
    } else {
      getAllInvoices();
    }
  }, []);

  useEffect(() => {
    // Filter data based on the search input value
    // invoices = {};
    const filtered = invoices?.data?.filter(
      (item) =>
        item.mobile.toString().startsWith(searchValue.toString()) ||
        item.invoiceNo.toString().startsWith(searchValue.toString()) ||
        item.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    setFilteredData(filtered);

    // console.log(filteredData);

    // console.log("=> filtered data", filteredData);
  }, [searchValue, invoices]);

  function handleInvoice(invoiceNo) {
    navigate(`/invoice/${invoiceNo}`);
  }

  function handleFiltersVisibility() {
    setIsFiltersVisible(!isFiltersVisible);
    setRangeFilter(false);
  }

  function handleTodayFilterClicked() {
    setIsTodayFilterClicked(!isTodayFilterClicked);
    // setWelcomeBlock(!welcomeBlock);
    getTodayInvoices();
  }

  function handleAllTimeFilterClicked() {
    setIsThisMonthFilterClicked(!isThisMonthFilterClicked);
    // setWelcomeBlock(!welcomeBlock);
    getAllInvoices();
  }

  function handleThisMonthFilterClicked() {
    setIsThisMonthFilterClicked(!isThisMonthFilterClicked);
    // setWelcomeBlock(!welcomeBlock);
    if (id == 0) {
      setIsTodayFilterClicked(!isTodayFilterClicked);
    }

    getThisMonthInvoices();
  }

  function handleRange() {
    // alert("filter coming soon");
    setRangeFilter(!rangeFilter);
  }

  async function handleRangeSubmit(e) {
    e.preventDefault();
    const startDate = document.getElementById("start").value;
    const endDate = document.getElementById("end").value;
    console.log(startDate, " ", endDate);
    if (startDate <= endDate) {
      const data = await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getRangeInvoices?start=${startDate}&end=${endDate}&businessName=${state.user.worksAt}`
      );
      setRangeData(data.data);

      setFilteredData(data.data);

      setRangeFilter(!rangeFilter);
      // setFilteredData(rangeData);
      console.log(filteredData);
    }
  }

  async function handleSortAsc() {
    setFilteredData(
      [...filteredData].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
    );
    console.log(filteredData);
  }

  async function handleSortDsc() {
    console.log(filteredData);
    const button = document.getElementById("dscBtn");
    button.disabled = true;

    const sorted = [...filteredData].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setFilteredData(sorted);
  }

  return (
    <div className="orders">
      {/* <>
        {!welcomeBlock ? (
          <div className="welcome-block">
            <h1>
              UGHH...! <br></br>
              <br></br>NO ORDERS FOUND
            </h1>
            <Link to="/home-page">
              <button className="submit-button">PLACE AN ORDER</button>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </> */}

      {console.log(welcomeBlock)}
      {/* {console.log(invoices?.data.length)} */}
      {!loading ? (
        <>
          {
            // !welcomeBlock &&
            invoices?.data?.length == 0 && !isFiltersVisible ? (
              <div className="welcome-block">
                <h1>
                  UGHH...! <br></br>
                  <br></br>NO ORDERS FOUND
                </h1>
                <Link to="/home-page">
                  <button className="submit-button">PLACE AN ORDER</button>
                </Link>
              </div>
            ) : (
              <div className="orders">
                {!rangeFilter && (
                  <div className="Search-Bar">
                    <input
                      type="text"
                      value={searchValue}
                      placeholder="search in orders"
                      onChange={(e) => setSearchValue(e.target.value)}
                    ></input>
                    {/* <span>
                  SEARCH
                  <img />
                </span> */}
                  </div>
                )}
                {!rangeFilter && (
                  <div
                    className="filters-icon"
                    onClick={handleFiltersVisibility}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/128/3839/3839020.png" />
                  </div>
                )}

                {isFiltersVisible && id == undefined && (
                  <div className="orders-filters">
                    <div onClick={handleTodayFilterClicked}>TODAY</div>
                    {!isThisMonthFilterClicked ? (
                      <div onClick={handleThisMonthFilterClicked}>
                        THIS MONTH
                      </div>
                    ) : (
                      <div onClick={handleAllTimeFilterClicked}>ALL TIME</div>
                    )}

                    <div onClick={handleRange}>Select Date </div>

                    <div id="ascBtn" onClick={handleSortAsc}>
                      Sort Asc.
                    </div>
                    <div id="dscBtn" onClick={handleSortDsc}>
                      Sort Des.
                    </div>
                  </div>
                )}

                {isFiltersVisible && id == 0 && (
                  <div className="orders-filters">
                    {!isTodayFilterClicked ? (
                      <div onClick={handleTodayFilterClicked}>TODAY</div>
                    ) : (
                      <div onClick={handleThisMonthFilterClicked}>
                        THIS MONTH
                      </div>
                    )}

                    <div onClick={handleRange}>Select Date </div>

                    <div id="ascBtn" onClick={handleSortAsc}>
                      Sort Asc.
                    </div>
                    <div id="dscBtn" onClick={handleSortDsc}>
                      Sort Des.
                    </div>
                  </div>
                )}

                {isFiltersVisible && id != 0 && typeof id == "string" && (
                  <div className="today-orders-filters">
                    <div id="ascBtn" onClick={handleSortAsc}>
                      Sort Asc.
                    </div>
                    <div id="dscBtn" onClick={handleSortDsc}>
                      Sort Des.
                    </div>
                  </div>
                )}

                {rangeFilter && (
                  <form className="range-form" onSubmit={handleRangeSubmit}>
                    <input
                      style={{ height: "10px" }}
                      type="date"
                      id="start"
                      name="From"
                      max={today}
                      required
                    />
                    <input
                      style={{ height: "10px" }}
                      type="date"
                      id="end"
                      name="To"
                      max={today}
                      required
                    />
                    <button className="submit-button">GO</button>
                  </form>
                )}
                <table>
                  <thead>
                    <tr>
                      <th>Invoice No.</th>
                      <th className="item-name">Cx Name</th>
                      <th>Mobile</th>
                      <th>Bill Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {filteredData?.map((data) => (
                  <tr onClick={() => handleInvoice(data.invoiceNo)}>
                    <td className="item-name">{data.invoiceNo}</td>
                    <td>{data.name}</td>
                    <td>{data.mobile}</td>
                    <td>₹{data.billAmount}/-</td>
                  </tr>
                ))} */}
                    {rangeData == undefined
                      ? filteredData?.map((data) => (
                          <tr onClick={() => handleInvoice(data.invoiceNo)}>
                            <td>
                              {state.user.worksAt.charAt(0)}-000{data.invoiceNo}
                            </td>
                            <td className="item-name">{data.name}</td>
                            <td>{data.mobile}</td>
                            <td>₹{data.billAmount}/-</td>
                          </tr>
                        ))
                      : filteredData?.map((data) => (
                          <tr onClick={() => handleInvoice(data.invoiceNo)}>
                            <td className="item-name">
                              {state.user.worksAt.charAt(0)}-000{data.invoiceNo}
                            </td>
                            <td>{data.name}</td>
                            <td>{data.mobile}</td>
                            <td>₹{data.billAmount}/-</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            )
          }{" "}
        </>
      ) : (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Loader />
        </div>
      )}
      {filteredData?.length > 1 && (
        <>
          {typeof id == "string" && id != 0 && id != -1 && (
            <div style={{ marginTop: "20px" }}>
              {/* Today Sales -  */}
              {}
            </div>
          )}
          {id == 0 && (
            <div style={{ marginTop: "20px" }}>
              {/* This Month Sales -  */}
              {}
            </div>
          )}
          {id == undefined && (
            <div style={{ marginTop: "20px" }}>
              {/* Total Sales -  */}
              {}
            </div>
          )}
          {id == -1 && (
            <div style={{ marginTop: "20px" }}>
              {/* Last Month Sales -  */}
              {}
            </div>
          )}
        </>
      )}

      {/* // console.log("hey");
      getThisMonthInvoices();
    } else if (id) {
      getTodayInvoices(id);
    } else {
      getAllInvoices();
    } */}

      {/* {console.log(invoices)} */}
    </div>
  );
}

export default Orders;
