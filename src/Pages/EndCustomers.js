import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function EndCustomers() {
  // stock has "_id" and any other array has "id"

  const [endCustomers, setEndCustomers] = useState();
  const [loading, setLoading] = useState(true);
  const state = useSelector((state) => state);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [rangeFilter, setRangeFilter] = useState(false);

  const navigate = useNavigate();

  async function getEndCustomers() {
    setEndCustomers(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getEndCustomers/${state.user.worksAt}`
      )
    );
    setLoading(false);
    console.log(endCustomers);
  }

  useEffect(() => {
    console.log("useEffect hu main");
    getEndCustomers();
  }, []);

  useEffect(() => {
    // Filter data based on the search input value
    // invoices = {};
    const filtered = endCustomers?.data?.filter(
      (item) =>
        item.mobile.toString().startsWith(searchValue.toString()) ||
        // item.invoiceNo.toString().startsWith(searchValue.toString()) ||
        item.name.toLowerCase().startsWith(searchValue.toLowerCase())
      // console.log(item)
    );
    setFilteredData(filtered);

    // console.log(filteredData);

    // console.log("=> filtered data", filteredData);
  }, [searchValue, endCustomers]);

  function handleCx(mob) {
    // alert("Under Development");
    navigate(`/endCx/${mob}`);
  }
  function handleFiltersVisibility() {
    setIsFiltersVisible(!isFiltersVisible);
    setRangeFilter(false);
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
    <div className="end-customers">
      {!loading ? (
        <>
          {endCustomers?.data == undefined || endCustomers?.data.length == 0 ? (
            <div className="welcome-block">
              <h1>
                UGHH...! <br></br>
                <br></br>NO CUSTOMER FOUND
              </h1>
            </div>
          ) : (
            <>
              <div className="end-customer-header">
                <div className="Search-Bar">
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="search in stock"
                    onChange={(e) => setSearchValue(e.target.value)}
                  ></input>
                </div>

                {!rangeFilter && (
                  <div
                    className="filters-icon"
                    onClick={handleFiltersVisibility}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/128/3839/3839020.png" />
                  </div>
                )}
                {isFiltersVisible && (
                  <div className="today-orders-filters">
                    <div id="ascBtn" onClick={handleSortAsc}>
                      Sort Asc.
                    </div>
                    <div id="dscBtn" onClick={handleSortDsc}>
                      Sort Des.
                    </div>
                  </div>
                )}
              </div>
              <table>
                <thead>
                  <tr>
                    <th className="item-name">Customer Name</th>
                    <th>Mobile</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((data) => (
                    // console.log(data)
                    <tr>
                      <td
                        className="item-name"
                        onClick={() => handleCx(data.mobile)}
                      >
                        {data.name}
                      </td>
                      <td>{data.mobile}</td>
                      <td>
                        {data.createdAt.substring(8, 10)}-
                        {data.createdAt.substring(5, 7)}-
                        {data.createdAt.substring(0, 4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      ) : (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default EndCustomers;
