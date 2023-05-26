import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { IMG_URL } from "@/constant";
import { Props } from "@/pages/[slug]";
import { useDispatch, useSelector } from "react-redux";
import ActionPost from "../ActionPost";

function ItemPost({ post }: Props) {
  const { userLogin } = useSelector((state: any) => state.user);
  const router = useRouter();

  return (
    <div className="item-blog">
      <div
        className="item-blog__image"
        onClick={() => router.push(`/${post?.url}`)}
      >
        <img alt="img-post" src={`${IMG_URL}/${post?.image}`} />
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
          {userLogin?.role === "admin" && <ActionPost id={post.id} />}
        </div>
        <p className="item-blog-text">{post?.description}</p>
      </div>
    </div>
  );
}

export default ItemPost;
