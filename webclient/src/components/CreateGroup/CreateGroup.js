import React from "react";
import "./CreateGroup.css";

import { Link } from "react-router-dom";

const CreateGroup = () => {
  return (
    <div>
      <h1>Create Group Page</h1>
      <Link to="/">Landing Page</Link>
      <br />
      <Link to="/groups">Groups Home Page</Link>
    </div>
  );
};

export default CreateGroup;
