import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import GroupLanding from "./components/GroupLanding/GroupLanding";
import CreateGroup from "./components/CreateGroup/CreateGroup";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route exact path="/groups" component={GroupLanding} />
        <Route exact path="/creategroup" component={CreateGroup} />
      </Switch>
    </Router>
  );
};

export default App;
