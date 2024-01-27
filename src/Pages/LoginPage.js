import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../Reducer/stockSlice";
import axios, { AxiosHeaders } from "axios";
import { redirect, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Tnc from "../components/Tnc";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [cnfpassword, setCnfPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tnc, setTnc] = useState(false);
  // const token=useSelector((state)=>state.stockReducer.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isRegister) {
    //   // register block
    //   try {
    //     const { data } = await axios.post("http://localhost:8000/register", {
    //       email: email,
    //       password: password,
    //       cnfpassword: cnfpassword,
    //     });
    //     setIsRegister(false);
    //     navigate("/");
    //   } catch (error) {
    //     console.log(
    //       `Status code is ${error.response.request.status}, ${error.response.data.message}`
    //     );
    //   }
    // } else {
    // login block

    console.log(email, " ", password);
    try {
      console.log(email, " ", password);
      const { data, token } = await axios.post(
        "https://hisaabkitaab-backend.vercel.app/signin",
        {
          email: email,
          password: password,
        }
      );

      // console.log(data.customer);
      dispatch(
        login({
          user: data.data,
          token: data.token,
        })
      );
      // console.log(data, data.token);
      // const data1 = await axios.post("http://localhost:8000/signin", {
      //   isLoggedIn: true,
      // });

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // function handleRegister() {
  //   setIsRegister(true);
  // }

  // function handleLogin() {
  //   setIsRegister(false);
  // }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  // function handleRegisterButton() {
  //   setIsRegister(false);
  //   alert("Registered Successfully, Please Log In");
  //   console.log(isRegister);
  // }

  function handleLoginButton() {
    // alert("Submitted");
    // setIsLoggedIn(true);
    // console.log(isLoggedIn + ",,,");
    // console.log(isLoggedIn);
  }

  // function handleTnc() {
  //   setTnc(true);
  // }

  return (
    <div className="login-page">
      {tnc && <Tnc tnc={tnc} setTnc={setTnc} />}
      <div className="Login-Register-Bar">
        <span
        // style={{ borderBottom: "1px solid black", fontWeight: "bold" }}
        // onClick={handleLogin}
        >
          Log In to your Registered Account
        </span>
        {/* {!isRegister ? (
          <span
          // style={{ borderBottom: "1px solid black", fontWeight: "bold" }}
          // onClick={handleLogin}
          >
            LOG IN
          </span>
        ) : (
          <span onClick={handleLogin}>Log In</span>
        )} */}
        {/* {isRegister ? (
          <span
            style={{ borderBottom: "1px solid black", fontWeight: "bold" }}
            onClick={handleRegister}
          ></span>
        ) : (
          <span onClick={handleRegister}></span>
        )} */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="Email-Id">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>

        <div className="Password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          {showPassword ? (
            <div onClick={handleShowPassword}>HIDE</div>
          ) : (
            <div onClick={handleShowPassword}>SHOW</div>
          )}
        </div>

        {/* {isRegister && (
          <div className="Password">
            <input
              type="password"
              placeholder="Confirm Password"
              value={cnfpassword}
              onChange={(e) => setCnfPassword(e.target.value)}
              required
            ></input>
          </div>
        )} */}

        {/* {isRegister && (
          <div className="checkboxFlex">
            <input type="checkbox" required />
            <span className="tnc" onClick={handleTnc}>
              <a>I agree to the T&amp;c</a>
            </span>
          </div>
        )} */}

        {/* <Link to="/home-page" onClick={handleSubmit}> */}
        {error != "" && <div className="error">{error}</div>}
        <button>LOG IN</button>
        {/* {!isRegister ? (
          // <div className="submit-button">
          <button>Log In</button>
        ) : (
          // </div>
          // <div className="submit-button">
          <button>Register</button>
          // </div>
        )} */}
        {/* </Link> */}
      </form>
    </div>
  );
}

export default LoginPage;
