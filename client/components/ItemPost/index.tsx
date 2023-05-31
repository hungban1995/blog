import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { IMG_URL } from "@/constant";
import { Props } from "@/pages/[post]";
import { useDispatch, useSelector } from "react-redux";
import ActionPost from "../ActionData";

function ItemPost({ post }: Props) {
  const { userLogin } = useSelector((state: any) => state.user);
  const router = useRouter();
  return (
    <div className="item-blog">
      <div className="item-blog__image">
        <img
          onClick={() => router.push(`/${post?.url}`)}
          className="item-blog__image__post"
          alt="img-post"
          src={`${IMG_URL}/${post?.image}`}
        />
        <div
          className="item-blog__image__author"
          onClick={() => router.push(`/users/${post?.author}`)}
        >
          <img src={`${IMG_URL}/${post?.author_avatar}`} alt="author" />
        </div>
      </div>
      <div>
        <div className="item-blog-tag">
          {post?.catList &&
            post?.catList.split(",").map((item: any, idx) => {
              return (
                <span key={idx} className="tag-item">
                  <Link href={`categories/${item.toLowerCase()}`}>{item}</Link>
                </span>
              );
            })}
        </div>
        <div className="item-blog-action">
          <Link href={`/${post?.url}`} className="item-blog-title">
            {post?.title}
          </Link>
          {userLogin?.role === "admin" && (
            <ActionPost type="post" id={post.id} />
          )}
        </div>
        <p className="item-blog-text">{post?.description}</p>
      </div>
    </div>
  );
}

export default ItemPost;
