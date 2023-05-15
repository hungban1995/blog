import dynamic from "next/dynamic";
import React, { useState } from "react";
const Editor = dynamic(() => import("../../components/Ckeditor"), {
  ssr: false,
});
function Write() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState({
    title: "",
    description: "",
    category: "",
  });
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
              <label>Category</label>
              <div className="cat-item">
                <input
                  type="radio"
                  id="people"
                  name="category"
                  value="people"
                  onChange={handleChange}
                />
                  <label>People</label>
              </div>
              <div className="cat-item">
                <input
                  type="radio"
                  id="story"
                  name="category"
                  value="story"
                  onChange={handleChange}
                />
                 <label>Story</label>
              </div>
              <div className="cat-item">
                <input
                  type="radio"
                  id="review"
                  name="category"
                  value="review"
                  onChange={handleChange}
                />
                  <label>Review</label>
              </div>
            </div>
          </div>
          <div className="form-write-right-action">
            <div className="form-write-right-action__upload">
              <label>Upload image</label>
              <input type="file" />
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
