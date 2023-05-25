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
  const [post, setPost] = useState<post>();
  const { userLogin } = useSelector((state: any) => state.user);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [activeCat, setActiveCat] = useState(false);
  const [show, setShow] = useState(false);
  const [selectImage, setSelectImage] = useState<Image | null>();
  const [content, setContent] = useState("");
  const [catId, setCatId] = useState<string[]>([]);
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
          setCatId(res.data.post.catList.split(","));
        })
        .catch((err) => console.log(err));
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
      setPost((prev: any) => ({ ...prev, image: selectImage.url }));
    }
  }, [selectImage]);

  const handleCreate = async (data: any) => {
    try {
      const res = await axiosApi.post("posts/create", data);
      dispatch(
        getNotify({
          show: true,
          status: "success",
          message: res.data.message,
        })
      );
    } catch (error: any) {
      dispatch(
        getNotify({
          show: true,
          status: "error",
          message: error.response.data.message,
        })
      );
    }
  };
  const handleEdit = async (id: number, data: any) => {
    try {
      const res = await axiosApi.post("posts/update/" + id, data);
    } catch (error: any) {
      dispatch(
        getNotify({
          show: true,
          status: "error",
          message: error.response.data.message,
        })
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, checked } = e.target;
    setValueInput((prevState) => ({ ...prevState, [name]: value }));
    if (checked) {
      setCatId((prev) => [...prev, value]);
    } else if (!checked) {
      let catArray = catId.filter((val) => val !== value);
      setCatId([...catArray]);
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
      catId,
      url,
    };
    if (post?.id) {
      await handleEdit(post.id, data);
    } else {
      await handleCreate(data);
    }
  };
  return (
    <div className="write-container">
      {show && (
        <Suspense
          fallback={
            <div style={{ backgroundColor: "red", height: "100vh" }}>
              Loading
            </div>
          }
        >
          <ImagesManager
            show={show}
            setShow={setShow}
            setSelectImage={setSelectImage}
          />
        </Suspense>
      )}
      {activeCat && (
        <Suspense
          fallback={
            <div style={{ backgroundColor: "red", height: "100vh" }}>
              Loading
            </div>
          }
        >
          <CategoriesManager
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
        </Suspense>
      )}
      <h1>Create Post</h1>
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
                        id={String(cat.id)}
                        name="category"
                        value={cat.id}
                        defaultChecked={post?.catList
                          .split(",")
                          .includes(String(cat.id))}
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
                src={
                  post
                    ? `${IMG_URL}/${post.image}`
                    : "https://cdn.shopify.com/s/files/1/0095/1205/8985/files/BLANK_INSIDE-min.jpeg"
                }
                alt="image-post-view"
              />
            </div>
            <div className="form-write-right-action__submit">
              <button onClick={(e) => handlePost(e, 1)}>Save as draft</button>
              <button onClick={(e) => handlePost(e, 0)}>Post</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
