import { clearNotify } from "@/stores/notificationReducer";
import { Toast } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useDispatch, useSelector } from "react-redux";
const NotifiCation = () => {
  const { notifyMessage } = useSelector((state: any) => state.notify);
  const dispatch = useDispatch();
  return (
    <ToastContainer className="p-3" position="top-end">
      <Toast
        className={
          "notification " + (notifyMessage.status === "error" ? "error" : "")
        }
        onClose={() => dispatch(clearNotify())}
        show={notifyMessage.show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Message</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{notifyMessage.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default NotifiCation;
