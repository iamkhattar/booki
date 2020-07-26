import React from "react";
import "./Friends.css";

import { Link } from "react-router-dom";

const Friends = () => {
  return (
    <div>
      <h1>Friends Page</h1>
      <Link to="/">Landing Page</Link>
    </div>
  );
};

export default Friends;
