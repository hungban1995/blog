import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
export interface Props {
  post: {
    id: number;
    title: string;
    url: string;
    image: string;
    description: string;
    content: string | TrustedHTML;
    author: string;
    createdAt: Date;
    catList: string;
  };
}
export default function Post({ post }: Props) {
  console.log(post);

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
                  <img
                    src="https://basho.fueko.net/content/images/size/w300/2022/03/joshua-oyebanji-kMC1v6rBHMI-unsplash-2.jpg"
                    alt="avatar"
                  />
                </div>
                <div className="single-header-content-info__author">
                  <span>{post?.author}</span>
                  <small>{moment(post?.createdAt).format("L")}</small>
                </div>
              </div>
              <div className="single-header-content-info__action">
                <MdEdit className="action-icon" />
                <MdDelete className="action-icon" />
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
  params: { slug: string };
}) {
  try {
    const url = params.slug as string;
    const response = await axiosApi.get("posts/get-by-url/" + url);
    const post = response.data.post;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
