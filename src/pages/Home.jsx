import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">Welcome to</p>
          <h1 className="hero-title">Golden Dragon</h1>
          <div className="hero-divider">
            <span className="divider-icon">龙</span>
          </div>
          <p className="hero-desc">
            Authentic Chinese cuisine crafted with centuries-old recipes and the
            freshest ingredients
          </p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">
              View Our Menu
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section about-preview">
        <div className="container">
          <div className="about-preview-grid">
            <div className="about-preview-image">
              <div
                className="image-placeholder"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80)",
                }}
              ></div>
            </div>
            <div className="about-preview-text">
              <h2 className="section-title">
                A Tradition of <span className="text-accent">Excellence</span>
              </h2>
              <p>
                For over 25 years, Golden Dragon has been a cornerstone of
                Orlando's culinary scene. Our chefs bring the rich flavors of
                Sichuan, Cantonese, and Hunan cuisine to your table, using
                time-honored techniques passed down through generations.
              </p>
              <p>
                Every dish is a celebration of authentic Chinese cooking — from
                our hand-pulled noodles to our signature Peking duck, each plate
                tells a story of craft and devotion.
              </p>
              <Link to="/about" className="btn btn-primary">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="section signature-dishes">
        <div className="container">
          <h2 className="section-title text-center">
            Signature <span className="text-accent">Dishes</span>
          </h2>
          <p className="section-subtitle">
            Chef Wei's most celebrated creations
          </p>
          <div className="dishes-grid">
            {[
              {
                name: "Peking Duck",
                desc: "Crispy skin, tender meat, served with handmade pancakes and hoisin sauce",
                img: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&q=80",
              },
              {
                name: "Mapo Tofu",
                desc: "Silky tofu in a fiery Sichuan peppercorn and chili sauce",
                img: "https://images.unsplash.com/photo-1769065647078-f067eb768035?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&q=80",
              },
              {
                name: "Xiaolongbao",
                desc: "Delicate soup dumplings filled with savory pork broth",
                img: "https://images.unsplash.com/photo-1684252801327-7e7794c4dd7f?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400&q=80",
              },
            ].map((dish) => (
              <div className="dish-card" key={dish.name}>
                <div
                  className="dish-image"
                  style={{ backgroundImage: `url(${dish.img})` }}
                ></div>
                <div className="dish-info">
                  <h3>{dish.name}</h3>
                  <p>{dish.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="section hours-section">
        <div className="container">
          <div className="hours-card">
            <h2 className="section-title text-center">
              Hours &amp; <span className="text-accent">Location</span>
            </h2>
            <div className="hours-grid">
              <div className="hours-block">
                <h3>Opening Hours</h3>
                <div className="hours-row">
                  <span>Monday – Thursday</span>
                  <span>11:00 AM – 9:30 PM</span>
                </div>
                <div className="hours-row">
                  <span>Friday – Saturday</span>
                  <span>11:00 AM – 10:30 PM</span>
                </div>
                <div className="hours-row">
                  <span>Sunday</span>
                  <span>12:00 PM – 9:00 PM</span>
                </div>
              </div>
              <div className="hours-block">
                <h3>Find Us</h3>
                <p>
                  888 Jade Avenue
                  <br />
                  Orlando, FL 32801
                </p>
                <p className="hours-phone">(407) 555-8888</p>
                <Link to="/contact" className="btn btn-primary">
                  Get Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
