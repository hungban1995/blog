import CategoryItem, { TCategory } from "@/components/CategoryItem";
import { axiosApi } from "@/libs/fetchData";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { UserType } from "../register";
import { Card } from "react-bootstrap";
import { IMG_URL } from "@/constant";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const { userLogin } = useSelector((state: any) => state.user);
  useEffect(() => {
    axiosApi
      .get("users/get-all", {
        data: true,
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="description" content="List users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="users-page-title">
          <h1>{userLogin?.role === "admin" ? "List Users" : "List Authors"}</h1>
          <p>
            Praesent placerat laoreet ipsum ut fermentum. Ut mollis accumsan
            quam vitae porta. Nullam sit amet nibh id lorem fermentum feugiat
            rutrum egestas.
          </p>
        </div>
        <div className="users-page-list">
          <p style={{ fontWeight: "bold" }}>
            Explore our
            {userLogin?.role === "admin" ? " List Users" : " List Authors"}
          </p>
          <div className="users-page-list__item row">
            {users &&
              users.map((user: any, index: number) => {
                return (
                  <Card key={index} className="user-item-card m-1 col-3">
                    <Card.Img
                      src={`${IMG_URL}/${user.avatar}`}
                      alt="avatar"
                      className="user-item-card__img"
                      onClick={() =>
                        router.push(`users/${user.username.toLowerCase()}`)
                      }
                    />
                    <Card.Body>
                      <Link
                        href={`users/${user.username.toLowerCase()}`}
                        style={{
                          fontWeight: "bold",
                          textDecoration: "none",
                        }}
                      >
                        {user.username}
                      </Link>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
}
