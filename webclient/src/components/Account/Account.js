import React from "react";
import "./Account.css";

import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div>
      <h1>Account Page</h1>
      <Link to="/">Landing Page</Link>
    </div>
  );
};

export default Account;
