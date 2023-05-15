import images from "../images";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { UserType } from "@/pages/register";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "@/stores/refreshReducer";
function Navbar() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [isActive, setIsActive] = useState(false);
  const { userLogin } = useSelector((state: any) => state.user);
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
          {userLogin?.id ? (
            <li className="item-menu">
              <Link href="/profile">
                <span className="item-menu__action">{userLogin.username}</span>
              </Link>
              <span
                className="item-menu__action"
                onClick={() => {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("accessToken");
                  dispatch(getRefresh());
                }}
              >
                Logout
              </span>
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
