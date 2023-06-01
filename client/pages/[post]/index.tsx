import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import { post } from "..";
import ActionPost from "@/components/ActionData";
import ItemPost from "@/components/ItemPost";
import { useEffect, useState } from "react";
export interface Props {
  post: post;
}
export default function Post({ post }: Props) {
  const { userLogin } = useSelector((state: any) => state.user);
  // const [posts, setPosts] = useState<any[]>([]);
  // useEffect(() => {
  //   const controller = new AbortController();
  //     axiosApi
  //       .get("posts/get-by-category/" + post.catList, { signal: controller.signal })
  //       .then((res) => setPosts(res.data.posts))
  //       .catch((err) => console.log(err));
  //       return () => {
  //         controller.abort();
  //       };
  // }, [post]);
  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="single-container">
          <div className="single-header">
            <div className="single-header-content">
              <div className="single-header-content-tag">
                {post?.catList.length > 0 &&
                  post?.catList.split(",").map((item: string, idx) => {
                    return (
                      <span
                        key={idx}
                        className="single-header-content-tag__item"
                      >
                        <Link href={`categories/${item.toLowerCase()}`}>
                          {item}
                        </Link>
                      </span>
                    );
                  })}
              </div>
              <h1 className="single-header-content-title">{post?.title}</h1>
              <p>{post?.description}</p>
              <div className="single-header-content-info">
                <div className="single-header-content-info-author">
                  <div className="single-header-content-info__avatar">
                    <img
                      src={`${IMG_URL}/${post.author_avatar}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="single-header-content-info__author">
                    <span>{post?.author}</span>
                    <small>{moment(post?.createdAt).format("L")}</small>
                  </div>
                </div>
                <div className="single-header-content-info__action">
                  {userLogin?.role === "admin" && (
                    <ActionPost type="post" id={post.id} />
                  )}
                </div>
              </div>
            </div>
            <div className="single-header-image">
              <img src={`${IMG_URL}/${post?.image}`} alt="post-img" />
            </div>
          </div>
          <div
            className="single-content-post"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="category-post-list">
            <p>You might also like</p>
            {/* <div className="category-post-list-items">
            {posts?.length > 0 ? (
              posts.map((post: any, idx: number) => {
                return <ItemPost key={idx} post={post} />;
              })
            ) : (
              <span>Post not found!</span>
            )}
          </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
export async function getServerSideProps({
  params,
}: {
  params: { post: string };
}) {
  try {
    const url = params.post as string;
    const response = await axiosApi.get("posts/get-by-url/" + url);
    const post = response.data.post;
    if (!post)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    return {
      props: {
        post,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      props: { error },
    };
  }
}
