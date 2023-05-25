import CategoryItem from "@/components/CategoryItem";
import LoadMoreData from "@/components/LoadMoreData";
import SlickSlide from "@/components/Slide";
import { axiosApi } from "@/libs/fetchData";
import Head from "next/head";
import { useEffect, useState } from "react";
export type post = {
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
export default function Home() {
  const [categories, setCategories] = useState<any[]>();
  const [postsSlide, setPostsSlide] = useState<post[]>([]);

  useEffect(() => {
    const getCats = axiosApi.get("categories/get-all");
    const getPostsSlide = axiosApi.get("posts/get-all?page=1");

    Promise.all([getCats, getPostsSlide])
      .then((res) => {
        setCategories(res[0].data.categories);

        setPostsSlide(res[1].data.posts);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Head>
        <title>Social Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="home-container">
        <div className="home-title-blog">
          <h1>
            <span>Hey there!</span> See our thoughts, stories and ideas.
          </h1>
        </div>
        <div className="home-featured-blog">
          <h1>Get started with our best stories</h1>
          <SlickSlide postsSlide={postsSlide} />
        </div>
        <LoadMoreData />
        <div className="home-category-list">
          <h1>Category</h1>
          <div className="home-category-list-items">
            {categories &&
              categories.map((cat: any, idx: number) => {
                return <CategoryItem category={cat} key={idx} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
