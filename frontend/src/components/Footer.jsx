import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
import rrpnglogo from "../../src/assets/rrpnglogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString();

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer>
        <div>
          <img
            src={rrpnglogo}
            alt="logo"
            style={{ width: "150px", backgroundColor: "white" }}
          />
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Arrah Shibtala, Durgapur - 713212, West Bengal</li>
            <li>
              <a href="mailto:rahulrajmodi24523@gmail.com">jobwala@gmail.com</a>
            </li>
            <li>
              <a href="tel:91+ 9973162148">91+ 9973162148</a>
            </li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li to={"/"}>
              <Link>Home</Link>
            </li>
            <li to={"/jobs"}>
              <Link>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
            <li>
              <Link to={"/terms-and-conditions"}>Terms & Conditions</Link>
            </li>
            <li>
              <Link to={"/privacy-policy"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to={"/"}>
                <span>
                  <FaSquareXTwitter />
                </span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaSquareInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaYoutube />
                </span>
                <span>Youtube</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; CopyRight {currentYear} {currentTime} All Rights Reserved By{" "}
        <span
          style={{ color: "white", fontWeight: "semibold", marginLeft: "10px" }}
        >
          Rahul Raj Modi
        </span>
      </div>
    </>
  );
};

export default Footer;
