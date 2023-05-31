import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import { post } from "..";
import ActionPost from "@/components/ActionData";
export interface Props {
  post: post;
}
export default function Post({ post }: Props) {
  const { userLogin } = useSelector((state: any) => state.user);
  return (
    <>
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="single-container">
        <div className="single-header">
          <div className="single-header-content">
            <div className="single-header-content-tag">
              {post?.catList.length > 0 &&
                post?.catList.split(",").map((item: string, idx) => {
                  return (
                    <span key={idx} className="single-header-content-tag__item">
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
                  <img src={`${IMG_URL}/${post.author_avatar}`} alt="avatar" />
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
      </div>
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
