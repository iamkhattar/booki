import React from "react";
import "./Landing.css";

import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/groups">Groups Home Page</Link>
      <br />
      <Link to="/friends">Friends Page</Link>
      <br />
      <Link to="/account">Account Page</Link>
      <br />
      <Link to="/search">Search Page</Link>
    </div>
  );
};

export default Landing;
