import React from "react";
import "./Login.css";
import LoginForm from "./Components/LoginForm";
import WelcomeMessage from "./Components/WelcomeMessage";


const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="background-wrapper h-100 w-100">
        <div className="background-image h-100 w-100"></div>
      </div>
      <div className="container">
        <div className="row headerContent">
          <div className="col text-center ">
            <img width="50%"  className="logo m-2" src={require("../../assets/white-logo.png")} fluid />
          
          </div>
        </div>
        <div className="content p-5">
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
