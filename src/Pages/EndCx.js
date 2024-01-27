import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import InvoiceCard from "../components/InvoiceCard";

function EndCx() {
  // stock has "_id" and any other array has "id"

  const [allInvoices, setAllInvoices] = useState();
  const { id } = useParams();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  async function getCx() {
    setAllInvoices(
      await axios.get(
        `https://hisaabkitaab-backend.vercel.app/getEndCxAllInvoice?businessName=${state.user.worksAt}&mobile=${id}`
      )
    );
  }

  useEffect(() => {
    console.log("useEffect hu main");
    getCx();
  }, []);

  function handleInvoice(invoiceNo) {
    navigate(`/invoice/${invoiceNo}`);
  }

  return (
    <div className="end-cx">
      {console.log(allInvoices)}
      {allInvoices?.data.length == 0 ? (
        <div className="welcome-block">
          <h1>
            UGHH...! <br></br>
            <br></br>NO ORDERS FOUND
          </h1>
          {/* <Link to="/home-page">
            <button className="submit-button">PLACE AN ORDER</button>
          </Link> */}
        </div>
      ) : (
        <div className="invoices-div">
          <h3>{id}</h3>
          {allInvoices?.data.map((data) => (
            <InvoiceCard
              invoiceNo={data.invoiceNo}
              name={data.name}
              date={data.createdAt}
              billAmount={data.billAmount}
            />
          ))}
        </div>

        // <div className="end-cx">
        //   {/* <div className="Search-Bar">
        //     <input
        //       type="text"
        //       value={searchValue}
        //       placeholder="search for item name"
        //       onChange={(e) => setSearchValue(e.target.value)}
        //     ></input>
        //     <span>
        //       SEARCH
        //       <img />
        //     </span>
        //   </div> */}
        //   <table>
        //     <thead>
        //       <tr>
        //         <th className="item-name">Invoice No.</th>
        //         <th>Cx Name</th>
        //         <th>Mobile</th>
        //         <th>Date</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {allInvoices?.data.map((data) => (
        //         <tr onClick={() => handleInvoice(data.invoiceNo)}>
        //           <td className="item-name">{data.invoiceNo}</td>
        //           <td>{data.name}</td>
        //           <td>{data.mobile}</td>
        //           <td>{data.invoiceDate}</td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
      )}
      {/* {console.log(invoices)} */}
    </div>
  );
}

export default EndCx;
