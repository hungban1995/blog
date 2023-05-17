import { axiosApi } from "@/libs/fetchData";
import dynamic from "next/dynamic";
import React, { useState, lazy, Suspense, useEffect } from "react";
import { MdEditNote } from "react-icons/md";
const Editor = dynamic(() => import("../../components/Ckeditor"), {
  ssr: false,
});
const ImagesManager = lazy(() => import("../../components/ImagesManage"));
const CategoriesManager = lazy(
  () => import("../../components/CategoriesManage")
);
function Write() {
  const [catId, setCatId] = useState<number | null>();
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(false);
  const [show, setShow] = useState(false);
  const [selectImage, setSelectImage] = useState<{} | null>();

  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState({
    title: "",
    description: "",
    category: "",
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
      setTags((prev) => [...prev, value]);
    } else if (!checked) {
      let tagArr = tags.filter((val) => val !== value);
      setTags([...tagArr]);
    }
  };
  const handlePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const post = {
      content,
      tags,
      category: valueInput.category,
      title: valueInput.title,
      description: valueInput.description,
      isDraft: false,
    };
    console.log(post);
  };
  const handlePostDraft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const post = {
      content,
      tags,
      category: valueInput.category,
      title: valueInput.title,
      description: valueInput.description,
      isDraft: true,
    };
    console.log(post);
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
          <input
            type="text"
            placeholder="Url"
            name="url"
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
            <div className="form-write-right-option-tags">
              <label>Tags</label>
              <div className="tags-item">
                <input
                  type="checkbox"
                  id="people"
                  name="tags"
                  value="people"
                  onChange={handleChange}
                />
                  <label>People</label>
              </div>
              <div className="tags-item">
                <input
                  type="checkbox"
                  id="story"
                  name="tags"
                  value="story"
                  onChange={handleChange}
                />
                 <label>Story</label>
              </div>
              <div className="tags-item">
                <input
                  type="checkbox"
                  id="review"
                  name="tags"
                  value="review"
                  onChange={handleChange}
                />
                  <label>Review</label>
              </div>
            </div>
            <div className="form-write-right-option-cat">
              <div className="cat-items">
                <span>Categories</span>
                <MdEditNote
                  className="manager-action"
                  onClick={() => setActiveCat(true)}
                />
              </div>
              {categories &&
                categories.map((cat: any, idx: number) => {
                  return (
                    <div key={idx} className="cat-item">
                      <input
                        type="checkbox"
                        id={cat.id}
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
              <span>Upload image</span>
            </div>
            <div className="form-write-right-action__submit">
              <button onClick={handlePostDraft}>Save as draft</button>
              <button onClick={handlePost}>Post</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Write;
