import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { axiosApi } from "@/libs/fetchData";
import { getNotify } from "@/stores/notificationReducer";
import { useDispatch } from "react-redux";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/router";

function ActionData({ id, type }: { id: number; type: string }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const res = await axiosApi.delete(`${type}s/delete/` + id);
      dispatch(
        getNotify({
          show: true,
          status: "success",
          message: res.data.message,
        })
      );
      setShow(false);
      router.reload();
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
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Delete this {type}?</Popover.Header>
      <Popover.Body>
        <Button
          variant="danger"
          className="me-3"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
        <Button variant="primary" onClick={() => setShow(false)}>
          Cancel
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="action-blog-view">
      <div className="action-icon">
        <MdEdit
          className="action-icon__edit"
          onClick={() => router.push(`edit?id=${id}`)}
        />
      </div>
      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={popover}
        show={show}
      >
        <div className="action-icon" onClick={() => setShow(true)}>
          <MdDelete className="action-icon__delete" />
        </div>
      </OverlayTrigger>
    </div>
  );
}

export default ActionData;
