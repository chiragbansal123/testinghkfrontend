import React from "react";
import { Link } from "react-router-dom";

function Tnc({ tnc, setTnc }) {
  function handleOkay() {
    setTnc(false);
  }
  return (
    <div className="Tnc">
      <div className="content-box">
        <p>
          These are T&amp;cs for using this software. <br></br>By clicking this
          you are agreeing to all the T&amp;cs.<br></br>These are T&amp;cs for
          using this software. <br></br>By clicking this you are agreeing to all
          the T&amp;cs.<br></br>These are T&amp;cs for using this software.{" "}
          <br></br>By clicking this you are agreeing to all the T&amp;cs.
          <br></br>These are T&amp;cs for using this software. <br></br>By
          clicking this you are agreeing to all the T&amp;cs.<br></br>These are
          T&amp;cs for using this software. <br></br>By clicking this you are
          agreeing to all the T&amp;cs.<br></br>These are T&amp;cs for using
          this software. <br></br>By clicking this you are agreeing to all the
          T&amp;cs.
        </p>
        <div className="submit-button" onClick={handleOkay}>
          Okay!
        </div>
      </div>
    </div>
  );
}

export default Tnc;
