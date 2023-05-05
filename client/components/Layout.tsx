import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
interface props {
  children: JSX.Element;
}
function Layout({ children }: props) {
  return (
    <>
      <Navbar />
      <div className="layout-blog">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
