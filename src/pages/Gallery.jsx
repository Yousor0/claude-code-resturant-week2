import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=600&q=80",
    alt: "Peking Duck",
    category: "Dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1769065647078-f067eb768035?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600&q=80",
    alt: "Mapo Tofu",
    category: "Dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80",
    alt: "Dim Sum",
    category: "Dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    alt: "Restaurant Interior",
    category: "Ambiance",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Fine Dining",
    category: "Ambiance",
  },
  {
    src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    alt: "Noodles",
    category: "Dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&q=80",
    alt: "Fried Rice",
    category: "Dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
    alt: "Chef at Work",
    category: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=600&q=80",
    alt: "Table Setting",
    category: "Ambiance",
  },
  {
    src: "https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=600&q=80",
    alt: "Dumplings",
    category: "Dishes",
  },
  {
    src: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=600&q=80",
    alt: "Wok Cooking",
    category: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    alt: "Spring Rolls",
    category: "Dishes",
  },
];

const categories = ["All", ...new Set(photos.map((p) => p.category))];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeFilter === "All"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  return (
    <div className="gallery-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/hero-gallery.jpg)' }}>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Gallery</h1>
          <p>A visual feast from our kitchen and dining room</p>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            <AnimatePresence mode="wait">
              {filtered.map((photo, idx) => (
                <motion.div
                  className="gallery-item"
                  key={`${activeFilter}-${photo.alt}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.07 }}
                  onClick={() => setLightbox(photo)}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <div className="gallery-item-overlay">
                    <span>{photo.alt}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
          >
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              &times;
            </button>
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <p className="lightbox-caption">{lightbox.alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
