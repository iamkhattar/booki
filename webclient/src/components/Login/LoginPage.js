import React from "react";
import "./Login.css";
import LoginForm from "./Components/LoginForm";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="background-wrapper h-100 w-100">
        <div className="background-image h-100 w-100"></div>
      </div>
      <div className="container">
        <div className="row headerContent">
          <div className="col text-center ">
            <img width="50%"  alt="Logo" className="logo m-3" src={require("../../assets/white-logo.png")} fluid />
          </div>
        </div>
        <div className="loginContent content p-5">

          <div className="row">
            <div className="col-sm-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
