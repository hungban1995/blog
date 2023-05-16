/* eslint-disable @next/next/no-img-element */
import UpdateUser from "@/components/FormUpdate/UpdateUser";
import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import { getRefresh } from "@/stores/refreshReducer";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const ImagesLib = lazy(() => import("@/components/ImagesManage"));
function Index() {
  const [update, setUpdate] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>();
  useEffect(() => {
    if (value) {
      axiosApi
        .put("users/update/" + userLogin.id, { avatar: value })
        .then((res) => dispatch(getRefresh()))
        .catch((err) => console.log(err));
    }
  }, [value]);
  return (
    <>
      <Head>
        <title>Account</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {show && (
        <Suspense
          fallback={
            <div style={{ backgroundColor: "red", height: "100vh" }}>
              Loading
            </div>
          }
        >
          <ImagesLib show={show} setShow={setShow} setValue={setValue} />
        </Suspense>
      )}
      <div className="container profile">
        <div className="profile-info">
          <div className="profile-info-avatar" onClick={() => setShow(true)}>
            <img
              src={
                userLogin?.avatar
                  ? `${IMG_URL}/${userLogin.avatar}`
                  : "https://www.gravatar.com/avatar/b9e94b90a0fffe1d993ee11e9ceddf95?s=250&r=g&d=blank"
              }
              alt="avatar"
            />
            {!userLogin?.avatar && <AiOutlineUser className="avatar-icon" />}
          </div>
          <div className="profile-info-detail">
            <div className="profile-info-detail-title">
              <h4>Account Detail</h4>
              {update ? (
                <AiOutlineClose
                  className="profile-info-detail-title__action bg-danger"
                  onClick={() => setUpdate(false)}
                />
              ) : (
                <AiOutlineEdit
                  className="profile-info-detail-title__action"
                  onClick={() => setUpdate(true)}
                />
              )}
            </div>
            {update ? (
              <div className="profile-info-detail-update">
                <UpdateUser user={userLogin} setUpdate={setUpdate} />
              </div>
            ) : (
              <div className="profile-info-detail-view">
                <div className="profile-info-detail__username">
                  Username: {userLogin?.username}
                </div>
                <div className="profile-info-detail__email">
                  Email: {userLogin?.email}
                </div>
                <div className="profile-info-detail__role">
                  Role {userLogin?.role}
                </div>
              </div>
            )}
          </div>
          <div className="profile-info-action">
            {!update && (
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("accessToken");
                  dispatch(getRefresh());
                  router.push("/");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
