import { refreshUpdate } from "@/stores/updateDataReducer";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import FormUpdate from "../FormUpdate/UpdateUser";

export function UpdateData() {
  const { data } = useSelector((state: any) => state.update);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(refreshUpdate());
  const [value, setValue] = useState({});
  const handleUpdate = () => {
    console.log(value);
    // refreshUpdate()
  };
  return (
    <Modal show={data.show} onHide={handleClose} className="modal-update">
      <Modal.Header closeButton>
        <Modal.Title>Edit {data.type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{/* <FormUpdate setValue={setValue} /> */}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
