import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function Dashboard() {
  // stock has "_id" and any other array has "id"

  const [isUserIconClicked, setIsUserIconClicked] = useState(true);
  const [isNameClicked, setIsNameClicked] = useState(false);
  const [todaySales, setTodaySales] = useState();
  const [thisMonthSales, setThisMonthSales] = useState(0);
  const [lastMonthSales, setLastMonthSales] = useState();
  const [todayProfit, setTodayProfit] = useState();
  const [thisMonthProfit, setThisMonthProfit] = useState();

  const [monthSalesCompareToLastMonth, setMonthSalesCompareToLastMonth] =
    useState();
  // const [thisMonthAvgOrderValue, setThisMonthAvgOrderValue] = useState();
  const [customers, setCustomers] = useState();
  const [totalSales, setTotalSales] = useState();
  const [lowStock, setLowStock] = useState();
  const [outOfStock, setOutOfStock] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const user = useSelector((state) => state.user);

  var todayInvoices;
  var thisMonthInvoices;
  // var thisMonthSales = 0;
  var lastMonthInvoices;

  function handleUserIconClick() {
    setIsUserIconClicked(!isUserIconClicked);
    console.log("userClicked");
  }

  function handleTodaySales() {
    navigate(`/orders/${Date()}`);
  }

  function handleThisMonthSales() {
    navigate(`/orders/${0}`);
  }

  function handleLastMonthSales() {
    navigate(`/orders/${-1}`);
  }

  function handleLast3MonthSales() {
    alert("under development");
  }

  function handleCustomers() {
    navigate("/endCustomers");
  }

  function handleTotalOrders() {
    navigate("/orders");
  }

  function handleLowStock() {
    navigate(`/lowStock`);
  }

  function handleOutOfStock() {
    navigate(`/lowStock/${Date()}`);
  }

  function handleUnit(revenue) {
    // console.log(revenue);
    var revenueWithUnit = revenue;
    if (revenue >= 1000 && revenue < 100000) {
      const rounded = Math.round(revenue / 100) / 10;
      revenueWithUnit = `${rounded}k`;
    } else if (revenue >= 100000 && revenue < 10000000) {
      const rounded = Math.round(revenue / 1000) / 100;
      revenueWithUnit = `${rounded}L`;
    } else if (revenue >= 10000000) {
      const rounded = Math.round(revenue / 1000) / 100;
      revenueWithUnit = `${rounded}Cr.`;
    }
    // console.log(revenueWithUnit);
    return revenueWithUnit;
  }

  async function func() {
    // console.log(state.user.worksAt);
    const lowStock = state.stock.filter(
      (item) => item.quantity <= 5 && item.quantity > 0
    );
    setLowStock(lowStock.length);
    const outOfStock = state.stock.filter((item) => item.quantity == 0);
    setOutOfStock(outOfStock.length);

    todayInvoices = await axios.get(
      `https://hisaabkitaab-backend.vercel.app/getTodaysAllInvoice/${state.user.worksAt}`
      // `http://localhost:8000/getTodaysAllInvoice/${state.user.worksAt}`
    );

    var todayRevenue = 0,
      todayProfit = 0;
    todayInvoices?.data.map(
      (item) => (
        (todayRevenue += item.billAmount), (todayProfit += item.billProfit)
      )
    );
    setTodaySales(handleUnit(todayRevenue.toFixed(2)));

    // setTodayProfit(handleUnit(todayProfit));
    // console.log(todaySales);
    // console.log(todayProfit);
    if (todayRevenue != 0) {
      setTodayProfit(handleUnit(todayProfit.toFixed(2)));
    }

    thisMonthInvoices = await axios.get(
      `https://hisaabkitaab-backend.vercel.app/getThisMonthInvoice/${state.user.worksAt}`
    );
    // console.log(thisMonthInvoices.data);
    var thisMonthRevenue = 0,
      monthProfit = 0;
    thisMonthInvoices?.data.map(
      (item) => (
        (thisMonthRevenue += item.billAmount), (monthProfit += item.billProfit)
      )
    );
    setThisMonthSales(handleUnit(thisMonthRevenue.toFixed(2)));
    // console.log(thisMonthSales);

    if (thisMonthRevenue != 0) {
      // console.log(thisMonthProfit);
      setThisMonthProfit(handleUnit(monthProfit.toFixed(2)));
    }

    lastMonthInvoices = await axios.get(
      `https://hisaabkitaab-backend.vercel.app/getLastMonthInvoice/${state.user.worksAt}`
      // `http://localhost:8000/getLastMonthInvoice/${state.user.worksAt}`
    );

    var lastMonthRevenue = 0,
      lastMonthProfit = 0;
    lastMonthInvoices?.data.map(
      (item) => (
        (lastMonthRevenue += item.billAmount),
        (lastMonthProfit += item.billProfit)
      )
    );
    setLastMonthSales(handleUnit(lastMonthRevenue.toFixed(2)));

    if (lastMonthRevenue > 0 && thisMonthRevenue > 0) {
      // console.log(lastMonthRevenue?.data);
      setMonthSalesCompareToLastMonth(
        Math.trunc(thisMonthRevenue / (lastMonthRevenue / 100))
      );
      //   ((thisMonthSales?.data - lastMonthRevenue?.data) /
      //     lastMonthRevenue?.data) *
      //     100
      // )
      // );
    } else if (lastMonthRevenue == 0) {
      setMonthSalesCompareToLastMonth(0);
    }

    // console.log(thisMonthSales);

    setTotalSales(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getAllInvoice/${state.user.worksAt}`
      )
    );

    setCustomers(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getCustomers/${state.user.worksAt}`
      )
    );
    setLoading(false);
  }

  useEffect(() => {
    func();
  }, []);

  return (
    <div className="dashboard">
      {/* {console.log(thisMonthAvgOrderValue)} */}
      {/* {console.log(thisMonthSales)} */}

      {!loading ? (
        <div className="dashboard-column">
          <div className="dashboard-item" onClick={handleTodaySales}>
            <div className="dashboard-item-header">TODAY SALES</div>
            <div className="dashboard-item-data" id="todaySales">
              <span className="dashboard-inr">₹</span>
              {todaySales}
            </div>

            <div className="detailed-analytics">
              {/* {parseFloat(
              todaySales?.data.substring(0, todaySales?.data.length - 1)
            ) > yesterday?.data && (
              <div
                style={{
                  fontSize: "10px",
                  marginTop: "3%",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                n times more than Yesterday
              </div>
            )} */}
            </div>
          </div>
          <div className="dashboard-item" onClick={handleThisMonthSales}>
            <div className="dashboard-item-header">THIS MONTH SALES</div>
            <div className="dashboard-item-data">
              <span className="dashboard-inr">₹</span>
              {thisMonthSales}
            </div>
            {/* {console.log(monthSalesCompareToLastMonth)} */}
            {lastMonthSales != 0 &&
              (monthSalesCompareToLastMonth > 100 ? (
                <div
                  className="detailed-analytics"
                  // style={{
                  //   marginTop: "20px",
                  //   fontSize: "10px",
                  //   fontWeight: "800",
                  // }}
                >
                  {thisMonthSales}
                  <img
                    // style={{
                    //   height: "15px",
                    //   marginRight: "5px",
                    // }}
                    src="https://cdn-icons-png.flaticon.com/128/6067/6067121.png"
                  />
                  <div id="moreThisMonthSales">
                    {monthSalesCompareToLastMonth}% of last month
                  </div>
                </div>
              ) : (
                <div
                  className="detailed-analytics"
                  // style={{
                  //   fontSize: "10px",
                  //   marginTop: "20px",
                  //   fontWeight: "800",
                  // }}
                >
                  {monthSalesCompareToLastMonth == 100 ? (
                    <>Same as last month</>
                  ) : (
                    <div className="detailed-analytics" id="lessThisMonthSales">
                      {Math.abs(monthSalesCompareToLastMonth)}% of last month
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="dashboard-item">
            <div className="dashboard-item-header">PROFIT</div>
            <div className="dashboard-item-data">
              <span className="dashboard-inr">₹</span>
              {thisMonthProfit}
            </div>
            {/* {console.log(todayRevenue?.data)} */}
            {todaySales != 0 && (
              <div className="detailed-analytics" id="profit-detailed">
                {/* <img src="https://cdn-icons-png.flaticon.com/128/426/426833.png" /> */}
                <span id="todayProfit">
                  <span>₹</span>
                  {/* {console.log(todayProfit)} */}
                  {todayProfit} Today
                </span>
              </div>
            )}
          </div>

          <div
            // id="todaySales"
            className="dashboard-item"
            onClick={handleLastMonthSales}
          >
            <div className="dashboard-item-header">LAST MONTH SALES</div>

            <div className="dashboard-item-data">
              <span className="dashboard-inr">₹</span>
              {lastMonthSales}
            </div>
            <div className="detailed-analytics"></div>
          </div>
          <div className="dashboard-item" onClick={handleLast3MonthSales}>
            <div className="dashboard-item-header">LAST 3 MONTH SALES</div>
            <div className="dashboard-item-data">
              {/* <span className="dashboard-inr">₹</span> */}
              {/* {thisMonthInvoices?.data} */}
            </div>
            <div className="detailed-analytics"></div>
          </div>
          <div className="dashboard-item" onClick={handleTotalOrders}>
            <div className="dashboard-item-header">LIFETIME ORDERS</div>
            <div className="dashboard-item-data">{totalSales?.data.length}</div>
            <div className="detailed-analytics"></div>
          </div>

          <div
            id="customers"
            className="dashboard-item"
            onClick={handleCustomers}
          >
            <div className="dashboard-item-header">CUSTOMERS</div>
            <div className="dashboard-item-data">{customers?.data}</div>
            <div className="detailed-analytics"></div>
          </div>
          <div
            id="lowStock"
            className="dashboard-item"
            onClick={handleLowStock}
          >
            <div className="dashboard-item-header">LOW STOCK</div>
            <div className="dashboard-item-data">{lowStock}</div>
            <div className="detailed-analytics"></div>
          </div>
          <div
            id="outOfStock"
            className="dashboard-item"
            onClick={handleOutOfStock}
          >
            <div id="outOfStock" className="dashboard-item-header">
              OUT OF STOCK
            </div>
            <div className="dashboard-item-data">{outOfStock}</div>
            <div className="detailed-analytics"></div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {/* <div className="profile-bottom">
        <div id="orders">ORDERS</div>
        <div id="customers" onClick={handleCustomers}>
          CUSTOMERS
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
