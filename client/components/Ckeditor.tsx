import { IMG_URL } from "@/constant";
import { axiosApi } from "@/libs/fetchData";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
export interface CKeditorProps {
  onChange: (data: string) => void;
  value?: string;
}
const Editor = ({ value, onChange }: CKeditorProps) => {
  const uploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((rs, rj) => {
          const formData = new FormData();
          loader.file.then(async (file: any) => {
            try {
              formData.append("image", file);
              const res = await axiosApi.post("images/upload", formData);
              rs({ default: `${IMG_URL}/${res.data.url}` });
            } catch (error) {
              console.log(error);
              rj(error);
            }
          });
        });
      },
    };
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      onReady={(editor: any) => {
        editor.plugins.get("FileRepository").createUploadAdapter = (
          loader: any
        ) => {
          return uploadAdapter(loader);
        };
      }}
    />
  );
};

export default Editor;
