import "./App.css";
import React, { Component, Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/layout/users/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import Search from "./components/layout/users/Search";
class App extends Component {
  state = {
    users: [],
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
    const { users, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Fragment>
                    <Search
                      searchUsers={(t) => this.searchUsers(t)}
                      clearUsers={(e) => this.clearUsers(e)}
                      showClear={users.length > 0 ? true : false}
                      setAlert={(e) => this.setAlert(e)}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                }
              />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
