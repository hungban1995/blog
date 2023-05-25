import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotifiCation from "./Notification";
import { useRouter } from "next/router";
import { axiosApi } from "@/libs/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin, refreshLogin } from "@/stores/userReducer";
interface props {
  children: JSX.Element;
}
function Layout({ children }: props) {
  const dispatch = useDispatch();
  const { num } = useSelector((state: any) => state.refresh);
  useEffect(() => {
    const getUser = async () => {
      if (window && window.localStorage.getItem("userId")) {
        try {
          const id = JSON.parse(
            window.localStorage.getItem("userId") as string
          );
          const res = await axiosApi.get("/users/get-id/" + id);
          dispatch(getUserLogin(res.data.user));
        } catch (error) {
          console.log(error);
        }
      } else dispatch(refreshLogin());
    };
    getUser();
  }, [num]);
  const router = useRouter();
  if (router.pathname === "/login" || router.pathname === "/register")
    return (
      <>
        <NotifiCation />
        <div>{children}</div>
      </>
    );
  return (
    <>
      <NotifiCation />
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
