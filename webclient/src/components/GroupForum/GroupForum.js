import React from "react";
import "./GroupForum.css";

import { Link } from "react-router-dom";

const GroupForum = () => {
  return (
    <div>
      <h1>Group Forum Page</h1>
      <Link to="/">Landing Page</Link>
      <br />
      <Link to="/groups">Group Landing</Link>
    </div>
  );
};

export default GroupForum;
