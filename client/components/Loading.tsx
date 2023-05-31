import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function Loading({ active }: { active: boolean }) {
  return active ? (
    <div className="loading-data ">
      <Spinner animation="border" role="status" />
    </div>
  ) : null;
}

export default Loading;
