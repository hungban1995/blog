import images from "../images";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <div className="navbar-blog">
      <div className="navbar-blog__logo" onClick={() => navigate("/")}>
        <img src={images.Logo} alt="logo" />
      </div>
      <div className="navbar-blog-menu">
        <ul className="navbar-blog-menu-items">
          <li className="item-menu">
            <Link to="/demos">Demos</Link>
          </li>
          <li className="item-menu">
            <Link to="/style">Style Guide</Link>
          </li>
          <li className="item-menu">
            <Link to="/tag">Tag</Link>
          </li>
          <li className="item-menu">
            <span>Search</span> <CiSearch />
          </li>
          {currentUser ? (
            <li className="item-menu">User</li>
          ) : (
            <li className="item-menu item-menu-join">Join</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
