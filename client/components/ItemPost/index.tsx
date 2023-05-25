import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { IMG_URL } from "@/constant";
import { Props } from "@/pages/[slug]";

function ItemPost({ post }: Props) {
  const route = useRouter();
  return (
    <div className="item-blog">
      <div
        className="item-blog__image"
        onClick={() => route.push(`/${post?.url}`)}
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
          <span>
            <MdEdit className="action-icon" />
            <MdDelete className="action-icon" />
          </span>
        </div>
        <p className="item-blog-text">{post?.description}</p>
      </div>
    </div>
  );
}

export default ItemPost;
