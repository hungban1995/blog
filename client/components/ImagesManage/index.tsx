/* eslint-disable @next/next/no-img-element */
import { axiosApi } from "@/libs/fetchData";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { BiUpload } from "react-icons/bi";
import { IMG_URL } from "@/constant";
import { Spinner } from "react-bootstrap";
export type Image = {
  id: number;
  url?: string;
  alt?: string;
  uploadBy?: number;
};
interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  setSelectImage: (selectImage: Image) => void;
}
type fcChoose = (item: Image) => void;

export default function Images({ show, setShow, setSelectImage }: Props) {
  const [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(0);
  const [images, setImages] = useState([]);
  const [choose, setChoose] = useState<Image[]>([]);
  useEffect(() => {
    const getImages = async () => {
      try {
        setLoading(true);
        const res = await axiosApi.get("images/get-all");
        setImages(res.data.images);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getImages();
  }, [refresh]);
  //choose image
  const handleChooseImage: fcChoose = (item: Image) => {
    const isSelect = choose.includes(item);
    if (isSelect) {
      const newArr = choose.filter((i) => i !== item);
      setChoose(newArr);
    } else setChoose([...choose, item]);
  };

  //upload image
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
  //delete image
  const handleDelete = async () => {
    try {
      let newData: number[] = [];
      choose.forEach((item: Image) => newData.push(item.id));
      await axiosApi.delete("images/delete", { data: newData });
      setChoose([]);
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
        <div className="image-manager row">
          <div className="image-manager-upload col-3">
            <BiUpload className="image-upload-icon" />

            <input
              type="file"
              className="image-upload-input"
              onChange={handleUpload}
            />
          </div>
          {images.length > 0 ? (
            images.map((item: Image, idx: number) => {
              return (
                <div
                  className={
                    "col-3 image-manager-item " +
                    (choose.includes(item) ? "active" : "")
                  }
                  key={idx}
                  onClick={() => handleChooseImage(item)}
                >
                  <img src={`${IMG_URL}/${item.url}`} alt={item?.alt} />
                </div>
              );
            })
          ) : loading ? (
            <Spinner animation="border" />
          ) : (
            <div>Image Not found!</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {choose.length === 1 && (
          <Button
            variant="primary"
            onClick={() => {
              setSelectImage(choose[0]);
              setShow(false);
            }}
          >
            Save Changes
          </Button>
        )}
        {choose.length > 0 && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}

        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
