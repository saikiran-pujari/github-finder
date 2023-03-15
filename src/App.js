import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/layout/users/User";
import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import NotFound from "./components/pages/NotFound";

import GithubState from "./context/GithubState";
import AlertState from "./context/alert/AlertsState";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
