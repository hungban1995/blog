import Image from "next/image";
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
          <Image src={images.Logo} alt="Logo-blog" />
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
            <li>Style Guide</li>
            <li>Features</li>
            <li>Contact</li>
            <li>404</li>
          </ul>
        </div>
        <div className="footer-blog-navbar-menu">
          <small>Features</small>
          <ul>
            <li>Demos</li>
            <li>Light version</li>
            <li>Color version</li>
            <li>Dark version</li>
          </ul>
        </div>
        <div className="footer-blog-navbar-menu">
          <small>Membership</small>
          <ul>
            <li>Account</li>
            <li>Membership</li>
            <li>Authors</li>
            <li>Tags</li>
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
