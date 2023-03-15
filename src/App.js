import "./App.css";
import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/layout/users/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/layout/users/User";
import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Search from "./components/layout/users/Search";

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
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
