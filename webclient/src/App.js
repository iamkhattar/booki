import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import GroupLanding from "./components/GroupLanding/GroupLanding";
import CreateGroup from "./components/CreateGroup/CreateGroup";
import GroupDetails from "./components/GroupDetails/GroupDetails";
import GroupChat from "./components/GroupChat/GroupChat";
import GroupForum from "./components/GroupForum/GroupForum";
import GroupPoll from "./components/GroupPoll/GroupPoll";
import GroupBookHistory from "./components/GroupBookHistory/GroupBookHistory";
import Friends from "./components/Friends/Friends";
import Account from "./components/Account/Account";
import Search from "./components/Search/Search";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/groups" component={GroupLanding} />
        <Route exact path="/creategroup" component={CreateGroup} />
        <Route exact path="/groupdetails" component={GroupDetails} />
        <Route exact path="/groupchat" component={GroupChat} />
        <Route exact path="/groupforum" component={GroupForum} />
        <Route exact path="/grouppoll" component={GroupPoll} />
        <Route exact path="/groupbookhistory" component={GroupBookHistory} />
      </Switch>
    </Router>
  );
};

export default App;
