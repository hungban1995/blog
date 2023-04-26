import images from "../images";
import {
  FaFacebook,
  FaInstagram,
  FaGooglePlus,
  FaPinterest,
} from "react-icons/fa";
function Footer() {
  return (
    <div className="footer-blog">
      <div className="footer-blog-content">
        <div className="footer-blog-content__image">
          <img src={images.LogoBlog} alt="logo-blog" />
        </div>
        <p className="footer-blog-content__des">
          A minimal, functional theme for running a paid-membership publication
          on Ghost.
        </p>
      </div>
      <div className="footer-blog-navbar">
        <div className="footer-blog-navbar-menu is-social">
          <small>Social</small>
          <ul>
            <li>
              <FaFacebook /> <span>Facebook</span>
            </li>
            <li>
              <FaInstagram /> <span>Instagram</span>
            </li>
            <li>
              <FaGooglePlus /> <span>Google+</span>
            </li>
            <li>
              <FaPinterest /> <span>Pinterest</span>
            </li>
          </ul>
        </div>
        <div className="footer-blog-navbar-menu">
          <small>About</small>
          <ul>
            <li>F</li>
            <li>t</li>
            <li>i</li>
            <li>g</li>
          </ul>
        </div>
        <div className="footer-blog-navbar-menu">
          <small>About</small>
          <ul>
            <li>F</li>
            <li>t</li>
            <li>i</li>
            <li>g</li>
          </ul>
        </div>
        <div className="footer-blog-navbar-menu">
          <small>About</small>
          <ul>
            <li>F</li>
            <li>t</li>
            <li>i</li>
            <li>g</li>
          </ul>
        </div>
      </div>
      <div className="footer-blog-copyright">
        <span>© Simple Blog 2023. Made with nab__95 and ReactJs.</span>
      </div>
    </div>
  );
}

export default Footer;
