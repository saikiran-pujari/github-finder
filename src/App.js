import "./App.css";
import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/layout/users/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import User from "./components/layout/users/User";
import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Search from "./components/layout/users/Search";
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };
  //  Search Github Users
  async searchUsers(text) {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  }

  // Get single github user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Clear users
  clearUsers() {
    this.setState({ users: [], loading: false });
  }
  // alert
  setAlert(msg, type) {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  }
  render() {
    const { users, user, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={(t) => this.searchUsers(t)}
                      clearUsers={(e) => this.clearUsers(e)}
                      showClear={users.length > 0 ? true : false}
                      setAlert={(e) => this.setAlert(e)}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
