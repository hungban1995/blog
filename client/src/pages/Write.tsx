import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function Write() {
  return (
    <div className="write-container">
      <form className="form-write">
        <div className="form-write-left">
          <input type="text" name="title" />
          <input type="text" name="description" />
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            // onReady={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log("Editor is ready to use!", editor);
            // }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
        </div>
        <div className="form-write-right">
          <div className="form-write-right-option">
            <label>Category</label>
            <select name="category" id="">
              <option value="value">cat</option>
              <option value="value">cat</option>
              <option value="value">cat</option>
            </select>
          </div>
          <div className="form-write-right-action">
            <div className="form-write-right-action__upload">
              <input type="file" />
            </div>
            <div className="form-write-right-action__submit">
              <button>Save as draft</button>
              <button>Post</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Write;
