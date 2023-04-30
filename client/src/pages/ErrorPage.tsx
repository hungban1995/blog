import React from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div>
      <h1>404</h1>
      <p>
        Page not found return to <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default Index;
