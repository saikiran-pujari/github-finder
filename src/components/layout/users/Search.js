import React, { Component } from "react";

export class Search extends Component {
  state = {
    text: "",
  };
  onSubmit(e) {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please write something", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  }
  onChange(e) {
    console.log({ this: this });
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={(e) => this.onSubmit(e)} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users"
            value={this.state.text}
            onChange={(e) => this.onChange(e)}
          />
          <input
            type="submit"
            value="search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
