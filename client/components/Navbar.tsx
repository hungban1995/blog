import images from "../images";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
function Navbar() {
  const route = useRouter();
  const [currentUser, setCurrentUser] = useState(false);
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="navbar-blog">
      <div className="navbar-blog__Logo" onClick={() => route.push("/")}>
        <Image src={images.Logo} alt="logo" />
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
            <Link href="/demos">Demos</Link>
          </li>
          <li className="item-menu">
            <Link href="/style">Style Guide</Link>
          </li>
          <li className="item-menu">
            <Link href="/tag">Tag</Link>
          </li>
          <li className="item-menu">
            <span className="item-menu__search">
              Search <CiSearch />
            </span>
          </li>
          {currentUser ? (
            <li className="item-menu">
              <Link href="/profile">
                <span className="item-menu__action">User</span>
              </Link>
              <span className="item-menu__action">Logout</span>
              <Link href="/write">
                <span className="item-menu__action write">Write</span>
              </Link>
            </li>
          ) : (
            <li className="item-menu">
              <Link href="/login">
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
