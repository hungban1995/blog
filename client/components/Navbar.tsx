import images from "../images";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { refreshLogin } from "@/stores/userReducer";
import { axiosApi } from "@/libs/fetchData";
import { Debounce } from "@/libs/Deboundce";
import SearchResults, { data } from "./SearchResults";

function Navbar() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [isActive, setIsActive] = useState(false);
  const { userLogin } = useSelector((state: any) => state.user);
  const [value, setValue] = useState("");
  const [data, setData] = useState<data[]>([]);
  const debounce = Debounce(value, 1000);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!debounce) {
      setData([]);
      return;
    }
    axiosApi
      .get(`search?q=${debounce}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [debounce]);
  useEffect(() => {
    if (value) {
      setValue("");
    }
  }, [route]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="navbar-blog">
      <div className="navbar-blog__Logo" onClick={() => route.push("/")}>
        <Image src={images.Logo} alt="logo" />
      </div>
      <div className="navbar-blog-menu">
        <div className="navbar-blog-menu-search">
          <input
            type="text"
            value={value}
            placeholder="Search"
            className="search-input"
            onChange={handleChange}
          />
          {value && <SearchResults data={data} loading={loading} />}
        </div>
        <div
          className="navbar-blog-action-collapse"
          onClick={() => setIsActive(!isActive)}
        >
          <CiMenuBurger className="navbar-blog-menu-collapse__icon" />
        </div>
        <div
          className={"navbar-blog-menu-collapse " + (isActive ? "active" : "")}
          onClick={() => setIsActive(false)}
        >
          <ul className={"navbar-blog-menu-items"}>
            <li className="item-menu">
              <Link className="item-menu__action" href="/users">
                {userLogin?.role === "admin" ? "List Users" : "List Author"}
              </Link>
            </li>
            <li className="item-menu">
              <Link className="item-menu__action" href="/categories">
                Categories
              </Link>
            </li>
            {userLogin?.id ? (
              <li className="item-menu">
                {userLogin.role === "admin" && (
                  <Link className="item-menu__action" href="/edit">
                    <span className="item-menu__action-write">Write</span>
                  </Link>
                )}
                <Link className="item-menu__action" href="/profile">
                  <span>{userLogin.username}</span>
                </Link>
                <span
                  className="item-menu__action"
                  onClick={() => {
                    localStorage.removeItem("userId");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("accessToken");
                    dispatch(refreshLogin());
                    route.push("/");
                  }}
                >
                  Logout
                </span>
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
    </div>
  );
}

export default Navbar;
