import React from "react";
import "./GroupLanding.css";

import { Link } from "react-router-dom";

const GroupLanding = () => {
  return (
    <div>
      <h1>GroupLanding Page</h1>
      <Link to="/">Landing Page</Link>
      <br />
      <Link to="/creategroup">Create Group</Link>
    </div>
  );
};

export default GroupLanding;
