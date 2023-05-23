/* eslint-disable @next/next/no-img-element */
import { axiosApi } from "@/libs/fetchData";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import * as yup from "yup";
import { Image } from "../ImagesManage";
import { IMG_URL } from "@/constant";
import images from "@/images";
import { useDispatch } from "react-redux";
import { getNotify } from "@/stores/notificationReducer";
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
  const dispatch = useDispatch();
  const [select, setSelect] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(0);
  const [selectImage, setSelectImage] = useState<Image | null>();
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    axiosApi
      .get("categories/get-all")
      .then((res) => setCategories(res.data.categories))
      .catch((error) => console.log(error));
  }, [refresh]);
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
      const newValue = { ...data, image: selectImage?.id };
      if (edit > 0) {
        const res = await axiosApi.put("categories/update/" + edit, newValue);
        dispatch(
          getNotify({
            show: true,
            status: "success",
            message: res.data.message,
          })
        );
      } else {
        const res = await axiosApi.post("categories/create", newValue);
        dispatch(
          getNotify({
            show: true,
            status: "success",
            message: res.data.message,
          })
        );
      }
      setEdit(0);
      reset();
      setRefresh((f) => f + 1);
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
  const handleClickDel = async () => {
    try {
      const res = await axiosApi.delete("categories/delete", {
        data: select,
      });
      dispatch(
        getNotify({
          show: true,
          status: "success",
          message: res.data.message,
        })
      );
      setSelect([]);
      setRefresh((f) => f + 1);
    } catch (error) {
      console.log(error);
    }
  };
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
            <div style={{ backgroundColor: "red", height: "100%" }}>
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
        <div className="upload-image">
          <div className="upload-image__action" onClick={() => setShow(true)}>
            <img
              src={
                selectImage?.url
                  ? `${IMG_URL}/${selectImage?.url}`
                  : `https://www.pngfind.com/pngs/m/66-661092_png-file-upload-image-icon-png-transparent-png.png`
              }
              alt={selectImage?.alt || "cat-image"}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {edit !== 0 ? (
            <>
              <button className="btn btn-outline-info mt-3">Update</button>
              <button
                onClick={() => {
                  setEdit(0);
                  reset();
                  setSelectImage(null);
                }}
                className="btn btn-outline-danger mt-3"
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-outline-primary mt-3">Create</button>
          )}
        </form>
        <div className="list-categories">
          <div className="list-categories-title">
            <span>List Categories:</span>
            <span>
              {select.length > 0 && (
                <AiOutlineDelete
                  className="cat-action-delete"
                  onClick={handleClickDel}
                />
              )}
            </span>
          </div>
          <div className="list-categories-table">
            <Table
              striped
              bordered
              hover
              className="list-categories-table-data"
            >
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={() => setActive(!active)}
                    />
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
                          <span
                            className="cat-action-edit"
                            onClick={() => {
                              setSelectImage((prev: any) => ({
                                ...prev,
                                url: cat.image,
                              }));
                              setValue("title", cat.title);
                              setValue("description", cat.description),
                                setEdit(cat.id);
                            }}
                          >
                            <AiOutlineEdit />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Categories;
