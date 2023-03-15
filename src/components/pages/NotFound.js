import React from "react";

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p className="lead"> The page you are looking for does not exist. </p>
      <p className="lead">
        {" "}
        Go back to the <a href="http://localhost:3000/">Github Finder </a>{" "}
      </p>
    </div>
  );
};

export default NotFound;
