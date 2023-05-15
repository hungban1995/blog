import Link from "next/link";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import images from "../../images";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { axiosApi } from "../../libs/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { getNotify } from "@/stores/notificationReducer";
import { object, string } from "yup";
import { getRefresh } from "@/stores/refreshReducer";
const userSchema = object({
  email: string().email().required(),
  password: string().required().min(6),
});
function Login() {
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });
  const [value, setValue] = React.useState({ email: "", password: "" });
  const router = useRouter();
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    try {
      await userSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: null }));
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosApi.post("users/login", value);
      localStorage.setItem("userId", JSON.stringify(res.data.user.id));
      dispatch(getRefresh());
      dispatch(
        getNotify({
          show: true,
          status: "success",
          message: res.data.message,
        })
      );
      router.push("/");
    } catch (error: any) {
      console.log(error);
      dispatch(
        getNotify({
          show: true,
          status: "error",
          message: error.response.data.message,
        })
      );
    }
  };
  return (
    <div className="login">
      <Row className="p-0 mx-0">
        <Col className="background p-0" sm={3}>
          <Image
            className="background__image"
            src={images.BgImg}
            alt="background"
          />
        </Col>
        <Col className="form-input-action p-0" sm={9}>
          <div className="form-header-Logo" onClick={() => router.push("/")}>
            <Image src={images.Logo} alt="Logo" />
          </div>
          <div className="form-content">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                className="mt-3"
                type="email"
                name="email"
                placeholder="Input you email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error">Field {errors.email}</span>
              )}
              <Form.Control
                className="mt-3"
                type="password"
                name="password"
                placeholder="Input you password"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">Field {errors.password}</span>
              )}
              <Button
                variant="outline-primary "
                className="mt-3 w-100"
                type="submit"
              >
                Login
              </Button>
              <Form.Label className="mt-3">
                Don&apos;t have account?{" "}
                <Link href={"/register"}>Register!</Link>
              </Form.Label>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
