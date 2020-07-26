import React from "react";
import "./GroupDetails.css";
import { Link } from "react-router-dom";

const GroupDetails = () => {
  return (
    <div>
      <h1>Group Details Page</h1>
      <Link to="/">Landing Page</Link>
      <br />
      <Link to="/groups">Groups Home Page</Link>
      <br />
      <Link to="/groupchat">Group Chat</Link>
      <br />
      <Link to="/groupforum">Group Forum</Link>
      <br />
      <Link to="/grouppoll">Create Poll</Link>
      <br />
      <Link to="/groupbookhistory">Group Book History</Link>
      <br />
    </div>
  );
};

export default GroupDetails;
