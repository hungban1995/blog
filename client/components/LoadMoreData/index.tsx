import { axiosApi } from "@/libs/fetchData";
import { post } from "@/pages";
import React, { useEffect, useState } from "react";
import ItemPost from "../ItemPost";

function LoadMoreData() {
  const [posts, setPosts] = useState<post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    axiosApi
      .get(`posts/get-all?page=${page}`)
      .then((res) => {
        setPosts([...posts, ...res.data.posts]);
        if (res.data.posts.length === 0) setHasMoreData(false);
      })
      .catch((err) => console.log(err));
  }, [page]);
  return (
    <div className="home-recent-blog">
      <h1>See what we’ve written lately</h1>
      <div className="home-recent-blog-items">
        {posts?.length > 0 &&
          posts?.map((post: post, idx: number) => {
            return <ItemPost key={idx} post={post} />;
          })}
      </div>
      {hasMoreData && (
        <div
          className="home-recent-blog-action"
          onClick={() => setPage((p) => p + 1)}
        >
          <span>Load more</span>
        </div>
      )}
    </div>
  );
}

export default LoadMoreData;
