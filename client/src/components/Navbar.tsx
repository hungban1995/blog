import images from "../images";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { useState } from "react";
function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="navbar-blog">
      <div className="navbar-blog__Logo" onClick={() => navigate("/")}>
        <img src={images.Logo} alt="Logo" />
      </div>
      <div className="navbar-blog-menu">
        <div className="navbar-blog-menu-mobile">
          <div className="item-menu-mobile">
            <CiSearch />
          </div>
          <div
            className="item-menu-mobile"
            onClick={() => setIsActive((p) => !p)}
          >
            <CiMenuBurger />
          </div>
        </div>
        <ul className={"navbar-blog-menu-items " + (isActive ? "active" : "")}>
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
            <span className="item-menu__search">
              Search <CiSearch />
            </span>
          </li>
          {currentUser ? (
            <li className="item-menu">
              <Link to="/profile">
                <span className="item-menu__action">User</span>
              </Link>
              <span className="item-menu__action">Logout</span>
              <Link to="/write">
                <span className="item-menu__action write">Write</span>
              </Link>
            </li>
          ) : (
            <li className="item-menu">
              <Link to="/login">
                <span className=" item-menu-join">Join</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
