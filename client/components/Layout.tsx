import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { axiosApi } from "@/libs/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin, refreshLogin } from "@/stores/userReducer";
import NotifiCation from "./Notification";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { num } = useSelector((state: any) => state.refresh);

  useEffect(() => {
    const id = window?.localStorage?.getItem("userId");
    if (id) {
      axiosApi
        .get("/users/get-id/" + id)
        .then((res) => dispatch(getUserLogin(res.data.user)))
        .catch((err) => console.log(err));
    } else {
      dispatch(refreshLogin());
    }
  }, [num]);
  return (
    <>
      <NotifiCation />
      {router.pathname === "/login" || router.pathname === "/register" ? (
        <div>{children}</div>
      ) : (
        <>
          <Navbar />
          <div className="container">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
