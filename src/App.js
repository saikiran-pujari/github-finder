import "./App.css";
import React, { useState, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/layout/users/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./components/layout/users/User";
import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Search from "./components/layout/users/Search";

import GithubState from "./context/GithubState";

const App = () => {
  const [alert, setAlert] = useState(null);

  //  Search Github Users

  // Get single github user

  // Get users repos

  // alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search setAlert={(e) => showAlert(e)} />
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
    </GithubState>
  );
};

export default App;
