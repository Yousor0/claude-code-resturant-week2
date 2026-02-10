import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="page-hero" style={{ backgroundImage: 'url(/images/hero-about.jpg)' }}>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Our Story</h1>
          <p>A journey of flavor, tradition, and passion</p>
        </div>
      </section>

      {/* Restaurant Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-text">
              <h2 className="section-title">
                From Canton to <span className="text-accent">Orlando</span>
              </h2>
              <p>
                Golden Dragon was founded in 1998 by Chef Wei Lin, who arrived
                in the United States with nothing but a suitcase and a notebook
                filled with his grandmother's recipes. What started as a small
                20-seat dining room on the outskirts of town has grown into one
                of Orlando's most beloved Chinese restaurants.
              </p>
              <p>
                Our name was inspired by the ancient Chinese belief that the
                golden dragon represents prosperity, strength, and good fortune.
                Chef Wei wanted every guest who walked through our doors to feel
                that sense of warmth and abundance — not just through the food,
                but through the experience.
              </p>
              <p>
                Over the past 25 years, we've stayed true to our roots. We still
                hand-pull our noodles daily, roast our ducks in a traditional
                wood-fired oven, and source our spices directly from Sichuan
                province. Our kitchen is a bridge between old-world tradition
                and modern Orlando dining.
              </p>
            </div>
            <div className="story-image">
              <div
                className="image-placeholder"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="section chef-section">
        <div className="container">
          <div className="chef-grid">
            <div className="chef-image">
              <div
                className="image-placeholder chef-portrait"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&q=80)",
                }}
              ></div>
            </div>
            <div className="chef-text">
              <h2 className="section-title">
                Meet Chef <span className="text-accent">Wei Lin</span>
              </h2>
              <p className="chef-title-role">Executive Chef &amp; Founder</p>
              <p>
                Born in Guangzhou, Chef Wei spent his formative years learning
                the art of Cantonese cooking from his grandmother, a renowned
                home cook in their village. At 16, he apprenticed under Master
                Chef Zhao Minghua at the prestigious Jade Palace in Hong Kong,
                where he honed his skills in dim sum, roasting, and wok
                techniques.
              </p>
              <p>
                After eight years in some of Hong Kong's finest kitchens, Chef
                Wei moved to the United States with a vision to share authentic
                Chinese flavors with American diners — without compromise. His
                philosophy is simple: respect the ingredients, honor the
                traditions, and cook with heart.
              </p>
              <p>
                Today, Chef Wei leads a team of 12 cooks, many of whom have
                trained under him for over a decade. He still personally
                prepares his famous Peking Duck every evening and can often be
                found at the noodle station, hand-pulling fresh noodles for the
                lunch rush.
              </p>
              <div className="chef-quote">
                <blockquote>
                  "Good Chinese cooking is not about shortcuts. It is about
                  patience, fire, and soul."
                </blockquote>
                <cite>— Chef Wei Lin</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title text-center">
            Our <span className="text-accent">Values</span>
          </h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">鮮</div>
              <h3>Freshness</h3>
              <p>
                We source ingredients locally and import specialty items
                directly from China. Nothing frozen, nothing pre-made.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">傳</div>
              <h3>Tradition</h3>
              <p>
                Every recipe has a story. We preserve the authentic techniques
                and flavors of regional Chinese cuisine.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">家</div>
              <h3>Family</h3>
              <p>
                From our kitchen to your table, we treat every guest as family.
                Warmth and hospitality are our foundation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
