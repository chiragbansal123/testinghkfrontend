import React, { useEffect, useState } from "react";

import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
// import ConfirmationBox from "../components/Confirmation-Box";



function print() {
  window.print();
  // alert("under development, kindly download invoice for now");
}

function Invoice() {
  async function GenerateInvoice() {
    try {
      const backendURL=`http://localhost:8000/downloadInvoice?id=${id}&email=${state.user.email}`;
      const response = await axios.get(backendURL, {
        responseType: 'blob', // Receive response as a Blob
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a link to download the PDF
      const url = window.URL.createObjectURL(blob);
      console.log(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${id}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  
  }
  // stock has "_id" and any other array has "id"

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  const state = useSelector((state) => state);
  const { id } = useParams();

  // async function func() {
  //   setBill(await axios.get(`https://hk-backend1.vercel.app/getInvoice/${id}`));
  //   // console.log(bill);
  // }

  async function func() {
    try {
      console.log("get invoice");
      console.log(id);
      setBill(
        await axios.get(
          // `http://localhost:8000/getInvoice?id=${id}&businessName=${state.user.worksAt}`
          `https://hisaabkitaab-backend.vercel.app/getInvoice?id=${id}&businessName=${state.user.worksAt}`
        )
      );
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
    setLoading(false);
    // console.log(bill);
  }

  useEffect(() => {
    func();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="invoice">
          <div className="share-invoice" id="no-print">
            <img
              className="download"
              style={{
                height: "32px",
                // backgroundColor: "grey",
                // marginTop: "26px",
                marginRight: "-20px",
                borderRadius: "30px",
                boxShadow: "1px 0px 5px rgb(70, 70, 70)",
              }}
              src="https://cdn-icons-png.flaticon.com/128/54/54993.png"
              onClick={GenerateInvoice}
            />
            {/* <BiCloudDownload
          style={{
            width: "20px",
            // height: "20px",
            // marginTop: "-2px",
            // marginLeft: "-30px",
            // position: "absolute",
          }}
        /> */}
            {/* DOWNLOAD INVOICE */}
            <div
              className="print"
              // id="no-print"
              style={{
                height: "30px",
                width: "30px",
                display: "flex",
                // alignContent: "center",
                justifyContent: "center",
                backgroundColor: "lightgrey",
                borderRadius: "30px",
                marginLeft: "30px",
                // marginTop: "25px",
                boxShadow: "1px 0px 5px rgb(70, 70, 70)",
              }}
            >
              <img
                // id="no-print"
                style={{
                  height: "17px",
                  // backgroundColor: "grey",
                  marginTop: "6.5px",
                }}
                src="https://cdn-icons-png.flaticon.com/128/3022/3022251.png"
                onClick={print}
              />
            </div>
          </div>
          <div id="invoiceCapture">
            {console.log(bill)}
            <h4>TAX INVOICE</h4>
            <div className="main-invoice">
              <div id="invoiceBusinessName">
                <h4 className="invoice-part">{state.user.worksAt}</h4>
              </div>
              <div className="invoice-top">
                <h6 className="invoice-part">
                  Invoice No. {state.user.worksAt.charAt(0)}-000
                  {bill?.data[0].invoiceNo}
                </h6>
              </div>
              <div className="Billing-details">
                <div style={{ width: "40%", overflow: "word-break" }}>
                  <h3 className="invoice-part">Billed From:</h3>
                  <h4 className="invoice-part">{state.user.worksAt || ""}</h4>
                  <h4 className="invoice-part">{state.user.email}</h4>
                  <h4 style={{ fontWeight: "bold" }} className="invoice-part">
                    GSTIN -
                  </h4>
                </div>
                <div
                  style={{
                    marginLeft: "0px",
                    width: "40%",
                    overflow: "word-break",
                    paddingRight: "5px",
                  }}
                >
                  <h3 className="invoice-part">Billed to:</h3>
                  <h4 className="invoice-part">{bill?.data[0].name}</h4>
                  <h4 className="invoice-part">{bill?.data[0].mobile}</h4>
                  <h4 className="invoice-part">{bill?.data[0].email}</h4>
                </div>
                <div
                  id="billingDate"
                  style={{
                    marginLeft: "0px",
                    width: "20%",
                    overflow: "word-break",
                    paddingRight: "5px",
                  }}
                >
                  <h3 className="invoice-part">Billing Date:</h3>
                  <h4 className="invoice-part">
                    <h4>
                      Date - {bill?.data[0].createdAt.substring(8, 10)}-
                      {bill?.data[0].createdAt.substring(5, 7)}-
                      {bill?.data[0].createdAt.substring(0, 4)}
                    </h4>
                    <h4>Time - {bill?.data[0].createdAt.substring(11, 16)}</h4>
                  </h4>
                </div>
              </div>
              <div className="table-content">
                <table>
                  <thead>
                    <tr id="tableHeader">
                      <th className="item-name">Item</th>
                      <th>MRP</th>

                      <th>Qty</th>
                      <th>Discount</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  {/* {console.log(bill)} */}

                  {bill?.data[0].cart.map((item, i) => {
                    return (
                      <tr>
                        <td className="item-name">{item.name}</td>
                        <td>₹{item.price}/-</td>

                        <td>{item.cartUnit}</td>
                        <td>
                          {item.discount > 0 ? <>{item.discount}% </> : "-"}
                        </td>
                        <td>
                          ₹
                          {item.discountedPrice
                            ? (item.discountedPrice * item.cartUnit).toFixed(2)
                            : (item.price * item.cartUnit).toFixed(2)}
                          /-
                        </td>
                      </tr>
                    );
                    {
                      console.log(item);
                    }
                  })}
                </table>
              </div>
              <div className="invoice-part-bottom">
                <span id="gst-section">
                  <div>
                    <h3>CGST - 9.00%</h3>
                  </div>
                  <div>
                    <h3>SGST - 9.00%</h3>
                  </div>
                  <div>
                    <h3>
                      Tax- ₹{((bill?.data[0].billAmount / 100) * 18).toFixed(2)}
                      /-
                    </h3>
                  </div>
                </span>
                <h5 id="total">Total-&nbsp;₹{bill?.data[0].billAmount}/-</h5>
              </div>
              <div className="invoice-part-bottom">
                <span id="TermsOnInvoice">
                  <h6
                  // style={{ backgroundColor: "red" }}
                  >
                    Terms &amp; Conditions -{" "}
                  </h6>
                  <h6 style={{ marginTop: "-20px" }}>
                    Goods once sold will not be taken back or exchanged.
                  </h6>
                </span>
              </div>
            </div>
          </div>

          <hr />
        </div>
      ) : (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <Loader />
        </div>
      )}
    </>
  );
}
export default Invoice;
