import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Menu.css';

const menuData = {
  Appetizers: [
    { name: 'Spring Rolls (4 pcs)', desc: 'Crispy rolls filled with vegetables and glass noodles', price: '8.95' },
    { name: 'Potstickers (6 pcs)', desc: 'Pan-fried pork and cabbage dumplings with dipping sauce', price: '10.95' },
    { name: 'Hot & Sour Soup', desc: 'Traditional soup with tofu, mushrooms, and bamboo shoots', price: '7.95' },
    { name: 'Wonton Soup', desc: 'Shrimp and pork wontons in a clear savory broth', price: '8.95' },
    { name: 'Crab Rangoon (6 pcs)', desc: 'Cream cheese and crab meat in crispy wonton shells', price: '9.95' },
    { name: 'Scallion Pancakes', desc: 'Flaky, pan-fried flatbread with green onions', price: '7.95' },
  ],
  'Noodles & Rice': [
    { name: 'Dan Dan Noodles', desc: 'Spicy Sichuan noodles with minced pork and chili oil', price: '14.95' },
    { name: 'Beef Chow Fun', desc: 'Wide rice noodles stir-fried with tender beef and bean sprouts', price: '15.95' },
    { name: 'Yangzhou Fried Rice', desc: 'Classic fried rice with shrimp, pork, and vegetables', price: '13.95' },
    { name: 'Hand-Pulled Noodles', desc: 'Fresh noodles pulled to order in a rich beef broth', price: '16.95' },
    { name: 'Singapore Rice Noodles', desc: 'Curry-flavored thin noodles with shrimp and vegetables', price: '14.95' },
    { name: 'Lo Mein', desc: 'Soft egg noodles with your choice of protein and vegetables', price: '13.95' },
  ],
  'Chef Specialties': [
    { name: 'Peking Duck', desc: 'Whole roasted duck with pancakes, scallions, and hoisin sauce', price: '42.95' },
    { name: 'Mapo Tofu', desc: 'Soft tofu in a spicy Sichuan peppercorn and chili sauce', price: '15.95' },
    { name: 'Kung Pao Chicken', desc: 'Diced chicken with peanuts, chili peppers, and Sichuan spices', price: '16.95' },
    { name: 'Mongolian Beef', desc: 'Tender beef with scallions in a sweet and savory sauce', price: '17.95' },
    { name: 'Xiaolongbao (8 pcs)', desc: 'Shanghai-style soup dumplings with pork filling', price: '14.95' },
    { name: 'Crispy Orange Chicken', desc: 'Lightly battered chicken tossed in a tangy citrus glaze', price: '16.95' },
  ],
  Seafood: [
    { name: 'Salt & Pepper Shrimp', desc: 'Crispy shrimp with garlic, jalapeño, and sea salt', price: '18.95' },
    { name: 'Steamed Whole Fish', desc: 'Market-fresh fish steamed with ginger, scallions, and soy', price: '28.95' },
    { name: 'Lobster Cantonese', desc: 'Wok-fried lobster in a silky egg and black bean sauce', price: '38.95' },
    { name: 'Szechuan Prawns', desc: 'Tiger prawns in a fiery chili garlic sauce', price: '21.95' },
  ],
  Beverages: [
    { name: 'Jasmine Tea (pot)', desc: 'Fragrant premium jasmine green tea', price: '4.50' },
    { name: 'Oolong Tea (pot)', desc: 'Rich, semi-oxidized traditional oolong', price: '4.50' },
    { name: 'Mango Lassi', desc: 'Creamy mango yogurt smoothie', price: '5.95' },
    { name: 'Tsingtao Beer', desc: 'Classic Chinese lager, refreshing and light', price: '6.00' },
    { name: 'Lychee Martini', desc: 'Vodka shaken with lychee juice and a splash of lime', price: '12.00' },
    { name: 'Soft Drinks', desc: 'Coke, Sprite, Ginger Ale, or Iced Tea', price: '3.50' },
  ],
};

const categories = Object.keys(menuData);

function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="menu-page">
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Our Menu</h1>
          <p>Authentic flavors, fresh ingredients, unforgettable taste</p>
        </div>
      </section>

      <section className="section menu-section">
        <div className="container">
          <div className="menu-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`menu-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            <AnimatePresence mode="wait">
              {menuData[activeCategory].map((item, idx) => (
                <motion.div
                  className="menu-item"
                  key={`${activeCategory}-${item.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                >
                  <div className="menu-item-header">
                    <h3>{item.name}</h3>
                    <span className="menu-price">${item.price}</span>
                  </div>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
