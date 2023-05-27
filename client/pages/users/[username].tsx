import ItemPost from "@/components/ItemPost";
import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import Head from "next/head";
import React, { useEffect, useState } from "react";
interface Props {
  user: any;
}
export default function Page({ user }: Props) {
  const [posts, setPosts] = useState<any[]>();
  useEffect(() => {
    if (user?.id) {
      axiosApi
        .get("posts/get-by-user/" + user.id)
        .then((res) => setPosts(res.data.posts))
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>{user?.title}</title>
        <meta name="description" content={user?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="user-page">
          <div className="user-page-image">
            <img src={`${IMG_URL}/${user?.image}`} alt="cat" />
          </div>
          <div className="user-page-content">
            <h1>{user?.title} </h1>
            <p>{user?.description}</p>
          </div>
        </div>
        <div className="user-post-list">
          <p>Check out the latest posts</p>
          <div className="user-post-list-items">
            {posts?.length &&
              posts.map((post: any, idx: number) => {
                return <ItemPost key={idx} post={post} />;
              })}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const title = params.slug as any;
    const response = await axiosApi.get("categories/user/" + title);
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
