import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <div className="footer-logo">
            <span className="logo-icon">龙</span>
            <span className="logo-text">Golden Dragon</span>
          </div>
          <p className="footer-tagline">
            Authentic Chinese cuisine crafted with tradition and passion since
            1998.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <p>Mon – Thu: 11am – 9:30pm</p>
          <p>Fri – Sat: 11am – 10:30pm</p>
          <p>Sunday: 12pm – 9pm</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>888 Jade Avenue</p>
          <p>Orlando, FL 32801</p>
          <p>(407) 555-8888</p>
          <p>info@goldendragonfl.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Golden Dragon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
