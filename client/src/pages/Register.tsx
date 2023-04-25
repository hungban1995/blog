import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import bgImg from "../images/background.png";
import logoBlog from "../images/logo_blog.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register">
      <Row className="p-0 mx-0">
        <Col className="background p-0" sm={3}>
          <img className="background__image" src={bgImg} alt="background" />
        </Col>
        <Col className="form-input p-0" sm={9}>
          <div className="form-header-logo">
            <img src={logoBlog} alt="logo" className="form-header__logo"></img>
          </div>
          <div className="form-content">
            <Form>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Input username"
              />
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
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Re-enter password"
              />
              <Button variant="primary " className="mb-3 w-100" type="submit">
                Login
              </Button>
              <p>Return error</p>
              <Form.Label>
                Have account? <Link to={"/login"}>Login!</Link>
              </Form.Label>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
