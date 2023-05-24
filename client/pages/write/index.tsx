import { axiosApi } from "@/libs/fetchData";
import dynamic from "next/dynamic";
import React, { useState, lazy, Suspense, useEffect } from "react";
import { MdEditNote } from "react-icons/md";
import { Image } from "../../components/ImagesManage";
import { useSelector } from "react-redux";
import { Slugify } from "@/libs/helpData";
import { TCategory } from "@/components/CategoryItem";
import { IMG_URL } from "@/constant";
import images from "@/images";
const Editor = dynamic(() => import("../../components/Ckeditor"), {
  ssr: false,
});
const ImagesManager = lazy(() => import("../../components/ImagesManage"));
const CategoriesManager = lazy(
  () => import("../../components/CategoriesManage")
);
function Write() {
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
    axiosApi
      .get("categories/get-all")
      .then((res) => setCategories(res.data.categories))
      .catch((error) => console.log(error));
  }, []);
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
    const post = {
      content,
      title: valueInput.title,
      description: valueInput.description,
      author: userLogin.id,
      image: selectImage?.id,
      isDraft,
      catId,
      url,
    };
    try {
      const res = await axiosApi.post("posts/create", post);
      console.log(res);
    } catch (error) {
      console.log(error);
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
      <form className="form-write">
        <div className="form-write-left">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />

          <textarea
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
          <div>
            <Editor value="" onChange={(data) => setContent(data)} />
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
                  selectImage
                    ? `${IMG_URL}/${selectImage?.url}`
                    : "https://cdn.shopify.com/s/files/1/0095/1205/8985/files/BLANK_INSIDE-min.jpeg"
                }
                alt="image-post-view"
              />
              {/* <span className="image-view-action">Upload image</span> */}
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

export default Write;
