import ItemPost from "@/components/ItemPost";
import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import Head from "next/head";
import React, { useEffect, useState } from "react";
interface Props {
  category: {
    title: string;
    description: string;
    image: string;
    id: number;
  };
}
export default function Page({ category }: Props) {
  const [posts, setPosts] = useState<any[]>();
  useEffect(() => {
    if (category?.id) {
      axiosApi
        .get("posts/get-by-category/" + category.id)
        .then((res) => setPosts(res.data.posts))
        .catch((err) => console.log(err));
    }
  }, [category]);
  return (
    <>
      <Head>
        <title>{category?.title}</title>
        <meta name="description" content={category?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="category-page">
          <div className="category-page-image">
            <img src={`${IMG_URL}/${category?.image}`} alt="cat" />
          </div>
          <div className="category-page-content">
            <h1>{category?.title} </h1>
            <p>{category?.description}</p>
          </div>
        </div>
        <div className="category-post-list">
          <p>Check out the latest posts</p>
          <div className="category-post-list-items">
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
    const response = await axiosApi.get("categories/category/" + title);
    const category = response.data.category;
    return {
      props: {
        category,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
