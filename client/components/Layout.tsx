import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { axiosApi } from "@/libs/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin, refreshLogin } from "@/stores/userReducer";
import NotifiCation from "./Notification";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getLoading } from "@/stores/loadingReducer";
import Loading from "./Loading";
import BackToTop from "./ToTop";

interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { num } = useSelector((state: any) => state.refresh);
  const { active } = useSelector((state: any) => state.loading);

  useEffect(() => {
    const start = () => {
      dispatch(getLoading(true));
    };
    const end = () => {
      dispatch(getLoading(false));
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

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
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  return (
    <>
      <Loading active={active} />
      <NotifiCation />
      {router.pathname === "/login" || router.pathname === "/register" ? (
        <div>{children}</div>
      ) : (
        <>
          <Navbar />
          <div className="container">{children}</div>
          <Footer />
          <BackToTop showButton={showButton} scrollToTop={scrollToTop} />
        </>
      )}
    </>
  );
}

export default Layout;
