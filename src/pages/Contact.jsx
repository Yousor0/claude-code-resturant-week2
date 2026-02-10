import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/hero-contact.jpg)' }}>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2 className="section-title">
                Get in <span className="text-accent">Touch</span>
              </h2>

              <div className="info-card">
                <div className="info-icon"><FontAwesomeIcon icon={faLocationDot} /></div>
                <div>
                  <h4>Address</h4>
                  <p>
                    888 Jade Avenue
                    <br />
                    Orlando, FL 32801
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><FontAwesomeIcon icon={faPhone} /></div>
                <div>
                  <h4>Phone</h4>
                  <p>(407) 555-8888</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                <div>
                  <h4>Email</h4>
                  <p>info@goldendragonfl.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon"><FontAwesomeIcon icon={faClock} /></div>
                <div>
                  <h4>Hours</h4>
                  <p>
                    Mon–Thu: 11am – 9:30pm
                    <br />
                    Fri–Sat: 11am – 10:30pm
                    <br />
                    Sun: 12pm – 9pm
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2 className="section-title">
                Send a <span className="text-accent">Message</span>
              </h2>
              {submitted ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h3>Thank you!</h3>
                  <p>
                    We've received your message and will get back to you within
                    24 hours.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(407) 555-1234"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="map-wrapper">
            <h2 className="section-title text-center">
              Find <span className="text-accent">Us</span>
            </h2>
            <div className="map-container">
              <iframe
                title="Golden Dragon Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8918!2d-81.3792!3d28.5383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMyJzE4LjAiTiA4McKwMjInNDUuMCJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
