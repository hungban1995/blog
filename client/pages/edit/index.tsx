/* eslint-disable @next/next/no-img-element */
import { axiosApi } from "@/libs/fetchData";
import dynamic from "next/dynamic";
import React, { useState, lazy, Suspense, useEffect } from "react";
import { MdEditNote } from "react-icons/md";
import { Image } from "../../components/ImagesManage";
import { useDispatch, useSelector } from "react-redux";
import { Slugify } from "@/libs/helpData";
import { TCategory } from "@/components/CategoryItem";
import { IMG_URL } from "@/constant";
import { post } from "..";
import { useRouter } from "next/router";
import { getNotify } from "@/stores/notificationReducer";
import Loading from "@/components/Loading";
const Editor = dynamic(() => import("../../components/Ckeditor"), {
  ssr: false,
});
const ImagesManager = lazy(() => import("../../components/ImagesManage"));
const CategoriesManager = lazy(
  () => import("../../components/CategoriesManage")
);

function Edit() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [post, setPost] = useState<post | null>();
  const { userLogin } = useSelector((state: any) => state.user);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [activeCat, setActiveCat] = useState(false);
  const [show, setShow] = useState(false);
  const [selectImage, setSelectImage] = useState<Image | null>();
  const [content, setContent] = useState("");
  const [catIds, setCatIds] = useState<string[]>([]);
  const [imageView, setImageView] = useState(
    "https://cdn.shopify.com/s/files/1/0095/1205/8985/files/BLANK_INSIDE-min.jpeg"
  );
  const [valueInput, setValueInput] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    const id = router.query.id;
    if (id) {
      axiosApi
        .get("posts/get-id/" + id)
        .then((res) => {
          setPost(res.data.post);
          setCatIds(res.data.post.catList.split(","));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPost(null);
      setCatIds([]);
      setImageView(
        "https://cdn.shopify.com/s/files/1/0095/1205/8985/files/BLANK_INSIDE-min.jpeg"
      );
    }
  }, [router]);
  useEffect(() => {
    axiosApi
      .get("categories/get-all")
      .then((res) => setCategories(res.data.categories))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (selectImage?.url) {
      setImageView(`${IMG_URL}/${selectImage.url}`);
    }
    if (post?.image) {
      setImageView(`${IMG_URL}/${post.image}`);
    }
  }, [selectImage, post]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, checked } = e.target;
    setValueInput((prevState) => ({ ...prevState, [name]: value }));
    if (checked) {
      setCatIds((prev) => [...prev, value]);
    } else if (!checked) {
      let catArray = catIds.filter((val) => val !== value);
      setCatIds(catArray);
    }
  };
  const handlePost = async (
    e: React.MouseEvent<HTMLButtonElement>,
    isDraft: number
  ) => {
    e.preventDefault();
    const url = Slugify(valueInput.title);
    const data = {
      content,
      title: valueInput.title,
      description: valueInput.description,
      author: userLogin.id,
      image: selectImage?.id,
      isDraft,
      catIds,
      url,
    };
    try {
      let res: any;
      if (post?.id) {
        res = await axiosApi.put("posts/update/" + post?.id, data);
      } else {
        res = await axiosApi.post("posts/create", data);
      }
      dispatch(
        getNotify({
          show: true,
          status: "success",
          message: res.data.message,
        })
      );
    } catch (error: any) {
      console.log(error);
      dispatch(
        getNotify({
          show: true,
          status: "error",
          message: error.response.data.message,
        })
      );
    }
  };

  return (
    <div className="write-container">
      {show && (
        <Suspense fallback={<Loading active={true} />}>
          <ImagesManager
            show={show}
            setShow={setShow}
            setSelectImage={setSelectImage}
          />
        </Suspense>
      )}
      {activeCat && (
        <Suspense fallback={<Loading active={true} />}>
          <CategoriesManager
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
        </Suspense>
      )}
      {post?.id ? <h1>Edit Post</h1> : <h1>Create Post</h1>}
      <form className="form-write">
        <div className="form-write-left">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            defaultValue={post ? post.title : ""}
          />
          <textarea
            defaultValue={post ? post.description : ""}
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
          <div>
            <Editor
              value={post ? post.content : ""}
              onChange={(data) => setContent(data)}
            />
          </div>
        </div>
        <div className="form-write-right">
          <div className="form-write-right-option">
            <div className="form-write-right-option-cat">
              <div className="cat-items">
                <span>Categories</span>
                <MdEditNote
                  className="manager-action"
                  onClick={() => setActiveCat(true)}
                />
              </div>
              {categories &&
                categories.map((cat: TCategory, idx: number) => {
                  return (
                    <div key={idx} className="cat-item">
                      <input
                        type="checkbox"
                        name="category"
                        value={cat.id.toString()}
                        checked={catIds.includes(cat.id.toString())}
                        onChange={handleChange}
                      />
                        <label>{cat.title}</label>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="form-write-right-action">
            <div
              className="form-write-right-action__upload"
              onClick={() => setShow(true)}
            >
              <img
                className="image-post-view"
                src={imageView}
                alt="image-post-view"
              />
            </div>
            <div className="form-write-right-action__submit">
              <button
                onClick={(e) => handlePost(e, 1)}
                disabled={!selectImage && !post?.image}
              >
                Save as draft
              </button>
              <button
                onClick={(e) => handlePost(e, 0)}
                disabled={!selectImage && !post?.image}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
