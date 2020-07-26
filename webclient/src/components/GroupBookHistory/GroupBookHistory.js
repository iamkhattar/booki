import React from "react";
import "./GroupBookHistory.css";

import { Link } from "react-router-dom";

const GroupBookHistory = () => {
  return (
    <div>
      <h1>Group Book History Page</h1>
      <Link to="/">Landing Page</Link>
      <br />
      <Link to="/groups">Group Landing</Link>
    </div>
  );
};

export default GroupBookHistory;
