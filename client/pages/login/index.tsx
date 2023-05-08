import Link from "next/link";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import images from "../../images";
import Image from "next/image";
function Login() {
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
          <div className="form-header-Logo">
            <Image src={images.Logo} alt="Logo" />
          </div>
          <div className="form-content">
            <Form>
              <Form.Control
                className="mb-3"
                type="email"
                placeholder="Input you email"
              />

              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Input you password"
              />
              <Button
                variant="outline-primary "
                className="mb-3 w-100"
                type="submit"
              >
                Login
              </Button>
              <p>Return error</p>
              <Form.Label>
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
