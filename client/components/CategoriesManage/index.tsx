/* eslint-disable @next/next/no-img-element */
import { axiosApi } from "@/libs/fetchData";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import * as yup from "yup";
import { Image } from "../ImagesManage";
import { IMG_URL } from "@/constant";
interface Props {
  activeCat: boolean;
  setActiveCat: (activeCat: boolean) => void;
}
const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
const ImageLib = lazy(() => import("../ImagesManage"));
function Categories({ activeCat, setActiveCat }: Props) {
  const [select, setSelect] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectImage, setSelectImage] = useState<Image | null>();
  useEffect(() => {
    axiosApi
      .get("categories/get-all")
      .then((res) => setCategories(res.data.categories))
      .catch((error) => console.log(error));
  }, []);
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data: FormData) => {
    try {
      const createCat = { ...data, image: selectImage?.id };
      const res = await axiosApi.post("categories/create", createCat);
      console.log(res);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (active) {
      let catArray: number[] = [];
      categories.forEach((item: any) => {
        catArray.push(item.id);
      });
      setSelect(catArray);
    } else setSelect([]);
  }, [active, categories]);
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    if (e.target.checked) {
      setSelect((prev) => [...prev, id]);
    }
    if (select.includes(id)) {
      setSelect(select.filter((item: any) => item !== id));
    }
  };
  const handleClickDel = async () => {};
  return (
    <Modal
      show={activeCat}
      size="lg"
      className="categories"
      onHide={() => setActiveCat(false)}
    >
      {show && (
        <Suspense
          fallback={
            <div style={{ backgroundColor: "red", height: "100vh" }}>
              Loading
            </div>
          }
        >
          <ImageLib
            show={show}
            setShow={setShow}
            setSelectImage={setSelectImage}
          />
        </Suspense>
      )}
      <Modal.Header closeButton>
        <Modal.Title>Categories Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="upload-image">
            <span onClick={() => setShow(true)}>Upload Image</span>
            <img
              style={{ width: "100px" }}
              src={`${IMG_URL}/${selectImage?.url}`}
              alt={selectImage?.alt}
            />
          </div>
          <input
            className="form-control mt-3"
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && (
            <span className="error">Field {errors.title.message}</span>
          )}
          <textarea
            className="form-control mt-3"
            placeholder="Description"
            {...register("description")}
          />
          {edit ? (
            <button className="btn btn-outline-info mt-3">Update</button>
          ) : (
            <button className="btn btn-outline-primary mt-3">Create</button>
          )}
        </form>
        <div className="list-categories">
          <div className="list-categories-title">
            <span>List Categories:</span>
            <span>
              <AiOutlineDelete
                className="cat-action-delete"
                onClick={handleClickDel}
              />
            </span>
          </div>
          <Table striped bordered hover className="list-categories-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={() => setActive(!active)} />
                </th>
                <th>id</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map((cat: any, idx: number) => {
                  return (
                    <tr key={idx}>
                      <td>
                        <input
                          type="checkbox"
                          value={cat.id}
                          checked={select.includes(cat.id)}
                          onChange={handleSelect}
                        />
                      </td>
                      <td>{cat.id}</td>
                      <td>{cat.title}</td>
                      <td>
                        {edit ? (
                          <span
                            className="cat-action-cancel"
                            onClick={() => {
                              setEdit(false);
                              reset();
                            }}
                          >
                            <AiOutlineCloseCircle />
                          </span>
                        ) : (
                          <span
                            className="cat-action-edit"
                            onClick={() => {
                              setValue("title", cat.title);
                              setValue("description", cat.description),
                                setEdit(true);
                            }}
                          >
                            <AiOutlineEdit />
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Categories;
