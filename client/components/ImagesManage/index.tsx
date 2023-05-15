/* eslint-disable @next/next/no-img-element */
import { axiosApi } from "@/libs/fetchData";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { BiUpload } from "react-icons/bi";
import { IMG_URL } from "@/constant";
export type Image = {
  id?: number;
  url?: string;
  alt?: string;
  uploadBy?: number;
};
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  setValue: (value: Image) => void;
}

export default function Images({ show, setShow, setValue }: Props) {
  const [refresh, setRefresh] = useState(0);
  const [images, setImages] = useState([]);
  const [choose, setChoose] = useState(-1);
  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await axiosApi.get("images/get-all");
        setImages(res.data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, [refresh]);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const image = e.target.files;
      const formData = new FormData();
      if (image) {
        formData.append("image", image[0]);
      }
      await axiosApi.post("images/upload", formData);
      setRefresh((f) => f + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Images View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image">
          <div className="image-upload">
            <BiUpload className="image-upload-icon" />

            <input
              type="file"
              className="image-upload-input"
              onChange={handleUpload}
            />
          </div>
          {images &&
            images.map((item: Image, idx: number) => {
              return (
                <div
                  className={"image-item " + (choose === idx ? "active" : "")}
                  key={idx}
                  onClick={() => {
                    setChoose(idx);
                  }}
                >
                  <img src={`${IMG_URL}/${item.url}`} alt={item?.alt} />
                </div>
              );
            })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setValue(images[choose]);
            setShow(false);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
