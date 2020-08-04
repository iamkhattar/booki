import React from "react";
import "./Landing.css";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      <div className="background-wrapper h-100 w-100">
        <div className="background-image h-100 w-100"></div>
      </div>
      <div className="content p-5">
        <img
          src={require("../../assets/white-logo.png")}
          alt="Logo"
          className="logo m-2"
        />
        <div className="mt-md-5 mt-4 row">
          <div className="col-md-3"></div>
          <div className="col-md-3 col-12 p-2">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                className="h-100 w-100 landing-page-button"
              >
                <div className="btn-text">REGISTER</div>
              </Button>
            </Link>
          </div>
          <div className="col-md-3 col-12 p-2">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                className="h-100 w-100 landing-page-button"
              >
                <div className="btn-text">Login</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
