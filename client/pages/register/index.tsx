import Link from "next/link";
import images from "../../images";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { axiosApi } from "@/libs/fetchData";
import { useDispatch } from "react-redux";
import { getNotify } from "@/stores/notificationReducer";
import { object, string } from "yup";
import { useRouter } from "next/router";
const userSchema = object({
  username: string().required(),
  email: string().email().required(),
  password: string().required().min(6),
  retypePassword: string().required().min(6),
});
export interface UserType {
  username: string;
  email: string;
  password?: string;
  retypePassword?: string;
  role?: string;
  avatar?: string;
  id?: number;
}
function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<UserType>({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [value, setValue] = useState<UserType>({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });
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
      const res = await axiosApi.post("users/register", value);
      dispatch(
        getNotify({
          show: true,
          status: "success",
          message: res.data.message,
        })
      );
      router.push("/login");
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
  return (
    <div className="register">
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
            <Image src={images.Logo} alt="Logo" className="form-header__Logo" />
          </div>
          <div className="form-content">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                className="mt-3"
                type="text"
                name="username"
                placeholder="Input username"
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error">Field {errors.username}</span>
              )}
              <Form.Control
                className="mt-3"
                type="email"
                placeholder="Input you email"
                onChange={handleChange}
                name="email"
              />
              {errors.email && (
                <span className="error">Field {errors.email}</span>
              )}
              <Form.Control
                className="mt-3"
                type="password"
                placeholder="Input you password"
                onChange={handleChange}
                name="password"
              />
              {errors.password && (
                <span className="error">Field {errors.password}</span>
              )}
              <Form.Control
                className="mt-3"
                type="password"
                placeholder="Re-enter password"
                onChange={handleChange}
                name="retypePassword"
              />
              {errors.retypePassword && (
                <span className="error">Field {errors.retypePassword}</span>
              )}
              <Button
                variant="outline-primary "
                className="mt-3 w-100"
                type="submit"
              >
                Register
              </Button>
              <Form.Label className="mt-3">
                Have account? <Link href={"/login"}>Login!</Link>
              </Form.Label>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
