import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div className="loading-data">
      <Spinner animation="border" role="status" />
    </div>
  );
}

export default Loading;
