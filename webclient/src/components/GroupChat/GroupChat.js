import React from "react";
import "./GroupChat.css";

import { Link } from "react-router-dom";

const GroupChat = () => {
  return (
    <div>
      <h1>Group Chat Page</h1>
      <Link to="/">Landing Page</Link>
      <br />
      <Link to="/groups">Group Landing</Link>
    </div>
  );
};

export default GroupChat;
