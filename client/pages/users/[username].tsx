import ActionPost from "@/components/ActionData";
import ItemPost from "@/components/ItemPost";
import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface Props {
  user: any;
}
export default function Page({ user }: Props) {
  const { userLogin } = useSelector((state: any) => state.user);

  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    if (user?.role === "admin") {
      axiosApi
        .get("posts/get-by-author/" + user?.id, { signal: controller.signal })
        .then((res) => {
          setPosts(res.data.posts);
        })
        .catch(() => {});
    }
    return () => {
      controller.abort();
    };
  }, [user]);
  return (
    <>
      <Head>
        <title>{user?.username}</title>
        <meta name="description" content={user?.username} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="user-page">
          <div className="user-page-image">
            <img src={`${IMG_URL}/${user?.avatar}`} alt="avatar" />
          </div>
          <div className="user-page-content">
            <div className="user-page-content-manager">
              <Link
                href={`/users/${user?.username}`}
                className="user-page-content-manager__title"
              >
                {user?.username}
              </Link>
              {userLogin?.role === "admin" && (
                <ActionPost type="user" id={user.id} />
              )}
            </div>
            <p>
              Respondeat totidem verbis. Utinam quidem dicerent alium alio
              beatiorem, Iam ruinas videres. Quamquam ab iis philosophiam et
              omnes ingenuas disciplinas habemus.
            </p>
          </div>
        </div>
        {user?.role === "admin" && (
          <div className="user-post-list">
            <p>Check out the latest posts</p>
            <div className="user-post-list-items">
              {posts?.length > 0 &&
                posts.map((post: any, idx: number) => {
                  return <ItemPost key={idx} post={post} />;
                })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { username: string };
}) {
  try {
    const username = params.username as string;
    const response = await axiosApi.get("users/get-username/" + username);
    const user = response.data.user;
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
