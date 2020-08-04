import React from "react";
import "./Login.css";
import LoginForm from "./Components/LoginForm";
import WelcomeMessage from "./Components/WelcomeMessage";

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="container">
        <div className="row">
          <div className="col text-center heading">
            <img width="40%" class = "img" src={require("../../assets/cover.png")} fluid />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <WelcomeMessage />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
