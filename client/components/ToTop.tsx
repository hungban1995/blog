import React from "react";
import { BiArrowToTop } from "react-icons/bi";

function BackToTop({
  showButton,
  scrollToTop,
}: {
  showButton: boolean;
  scrollToTop: () => void;
}) {
  return (
    <div
      className={"back-to-top " + (showButton ? "active" : "")}
      onClick={scrollToTop}
    >
      <BiArrowToTop className="icon-to-top" />
    </div>
  );
}

export default BackToTop;
