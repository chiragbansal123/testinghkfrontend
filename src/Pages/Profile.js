import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  // stock has "_id" and any other array has "id"

  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [cnfPassword, setCnfPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);

  const state = useSelector((state) => state);

  const navigate = useNavigate();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleChangePasswordButton() {
    setIsChangePasswordClicked(!isChangePasswordClicked);
  }
  async function handleChangePasswordConfirm(e) {
    e.preventDefault();

    if (password == cnfPassword) {
      try {
        const response = await axios.post(
          `https://hisaabkitaab-backend.vercel.app/changePassword?email=${state.user.email}&pwd=${cnfPassword}&oldPwd=${oldPassword}`
          // `http://localhost:8000/changePassword?email=${state.user.email}&newPwd=${cnfPassword}&oldPwd=${oldPassword}`
        );
        console.log(response.status);
        alert(response.data.message);
        navigate("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      alert("Password does'nt match");
    }
  }

  return (
    <div id="profile">
      <h1>{state.user.worksAt}</h1>
      <div className="welcome-block">
        <div id="headerUserIcon">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
            // onClick={handleUserIconClick}
          />
        </div>
        <h6>{state.user.email}</h6>
        {/* <h6></h6> */}

        {!isChangePasswordClicked ? (
          <>
            <div className="submit-button" onClick={handleChangePasswordButton}>
              CHANGE PASSWORD
            </div>
          </>
        ) : (
          <form
            className="change-password-form"
            onSubmit={handleChangePasswordConfirm}
          >
            <div className="Password">
              <input
                type={
                  // showPassword ? "text" :
                  "password"
                }
                placeholder="Old Password"
                className="changePassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              ></input>
              {/* {showPassword ? (
                <div onClick={handleShowPassword}>HIDE</div>
              ) : (
                <div onClick={handleShowPassword}>SHOW</div>
              )} */}
            </div>
            <div className="Password">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="changePassword"
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
            <div className="Password">
              <input
                type="password"
                placeholder="Confirm New Password"
                className="changePassword"
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                required
              ></input>
            </div>

            <button className="submit-button">CONFIRM</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
