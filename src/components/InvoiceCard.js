import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function InvoiceCard({ invoiceNo, name, date, billAmount }) {
  // stock has "_id" and any other array has "id"

  const state = useSelector((state) => state);
  const navigate = useNavigate();

  function handleInvoice(invoiceNo) {
    navigate(`/invoice/${invoiceNo}`);
  }

  return (
    <div className="invoice-card" onClick={() => handleInvoice(invoiceNo)}>
      {/* {console.log(date.substring(0, 10))} */}
      <div className="details">
        <div id="invoiceNo">Invoice No.</div>
        <div>
          {state.user.worksAt.charAt(0)}-000{invoiceNo}
        </div>
      </div>

      <div className="details">
        <div id="customerName">{name}</div>
        <div style={{ marginTop: "5px", fontSize: "8px" }}>
          {date.substring(8, 10)}-{date.substring(5, 7)}-{date.substring(0, 4)}
        </div>
      </div>
      <div className="details">
        <div
          style={{
            marginTop: "5px",
            fontSize: "8px",
            fontWeight: "600",
          }}
        >
          Bill
        </div>
        <div>₹{billAmount}/-</div>
      </div>
    </div>
  );
}

export default InvoiceCard;
