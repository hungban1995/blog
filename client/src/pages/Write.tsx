import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";

function Write() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [valueInput, setValueInput] = useState({
    title: "",
    description: "",
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
      title: valueInput.title,
      description: valueInput.description,
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
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <div className="form-write-right">
          <div className="form-write-right-option">
            <div className="form-write-right-option-cat">
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
          </div>
          <div className="form-write-right-action">
            <div className="form-write-right-action__upload">
              <label>Upload image</label>
              <input type="file" />
            </div>
            <div className="form-write-right-action__submit">
              <button onClick={handlePost}>Save as draft</button>
              <button>Post</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Write;
