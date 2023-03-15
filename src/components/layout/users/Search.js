import React, { useState, useContext } from "react";
import GithubContext from "../../../context/githubContext";
import AlertContext from "../../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContext.setAlert("Please write something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  const onChange = (e) => {
    console.log({ this: this });
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={text}
          onChange={(e) => onChange(e)}
        />
        <input
          type="submit"
          value="search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={() => {
            githubContext.clearUsers();
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
