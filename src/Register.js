import React from "react";

function Register() {
  function handleSubmit() {
    // alert("Submitted");
  }
  return (
    <div className="Register-Page">
      {/* <div className="Login-Register">
        <span>Log In</span>
        <span>Register</span>
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="Email-Id">
          <input type="text" placeholder="Email"></input>
        </div>

        <div className="Password">
          <input type="password" placeholder="Password"></input>
        </div>

        <div className="Password">
          <input type="password" placeholder="Confirm Password"></input>
        </div>

        <div className="register-button">
          <button>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
