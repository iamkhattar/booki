import React from "react";
import "./GroupPoll.css";

import { Link } from "react-router-dom";

const GroupPoll = () => {
  return (
    <div>
      <h1>Group Poll Page</h1>
      <Link to="/">Landing Page</Link>
      <br />
      <Link to="/groups">Group Landing</Link>
    </div>
  );
};

export default GroupPoll;
