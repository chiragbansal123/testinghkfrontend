import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Reducer/stockSlice";
import axios, { AxiosHeaders } from "axios";

function Logout({ isUserClicked, setIsUserClicked }) {
  // stock has "_id" and any other array has "id"

  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname;

  function handleStock() {
    setIsUserClicked(!isUserClicked);
    navigate("/");
  }

  function handleProfile() {
    setIsUserClicked(!isUserClicked);
    navigate("/profile");
  }

  function handleDashboard() {
    setIsUserClicked(!isUserClicked);
    navigate("/");
  }

  async function handleUserLogout() {
    console.log(email);
    try {
      const { data } = await axios.post(
        "https://hisaabkitaab-backend.vercel.app/logout",
        {
          email: email,
        }
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
    dispatch(logout());
  }
  return (
    <div className="logout">
      <div className="logout-header">
        {path != "/profile" ? (
          <div onClick={handleProfile}>YOUR PROFILE</div>
        ) : (
          <div onClick={handleDashboard}>DASHBOARD</div>
        )}
        {/* <div style={{ marginLeft: "5px" }} onClick={handleStock}>
          STOCK
        </div> */}
      </div>
      <Link to="/">
        <div className="logout-button" onClick={handleUserLogout}>
          LOG OUT
        </div>
      </Link>
    </div>
  );
}

export default Logout;
