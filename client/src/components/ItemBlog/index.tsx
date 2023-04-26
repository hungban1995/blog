import { Link, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
function ItemBlog() {
  const navigate = useNavigate();
  return (
    <div className="item-blog">
      <div className="item-blog__image" onClick={() => navigate("/single")}>
        <img
          alt="img-post"
          src="https://basho.fueko.net/content/images/size/w600/2022/03/photo-1603808033176-9d134e6f2c74.jpeg"
        />
      </div>
      <div>
        <div className="item-blog-tag">
          <span className="tag-item">
            <Link to={"#"}>Tag1</Link>
          </span>
          <span className="tag-item">
            <Link to={"#"}>Tag1</Link>
          </span>
          <span className="tag-item">
            <Link to={"#"}>Tag1</Link>
          </span>
        </div>
        <div className="item-blog-action">
          <span className="item-blog-title">Card Title</span>
          <span>
            <MdEdit className="action-icon" />
            <MdDelete className="action-icon" />
          </span>
        </div>
        <p className="item-blog-text">
          Quibus autem in rebus tanta obscuratio non fit, fieri tamen potest, ut
          id ipsum, quod interest, non sit magnum. Ita fit ut, quanta
          differentia est in principiis naturalibus, tanta sit in finibus
          bonorum malorumque dissimilitudo.
        </p>
      </div>
    </div>
  );
}

export default ItemBlog;
