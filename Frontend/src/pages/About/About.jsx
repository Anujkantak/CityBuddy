import "./About.css";
const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="overlay">
          <h1>About CityBuddy</h1>
          <p>Your digital companion for navigating a new city effortlessly.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            CityBuddy is your trusted guide for settling into a new city. Whether you're a student,
            a working professional, or a traveler — we help you discover PGs, mess, hospitals, hotels,
            essentials, and more. Our platform is community-powered and always evolving to meet
            your needs.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>🛏️ Verified PGs, hostels, and rental spaces</li>
            <li>🍱 Daily food/mess services with real reviews</li>
            <li>🏥 Nearby hospitals and clinics with maps</li>
            <li>🏨 Hotels & guest houses for short/long stays</li>
            <li>🧺 Local essentials like grocery, ATMs, etc.</li>
            <li>🗺️ Smart filtering, search, and Google Map integration</li>
          </ul>
        </div>

        <div className="about-section mission">
          <h2>Our Mission</h2>
          <p>
            We aim to make your city transition smooth and stress-free by providing authentic
            recommendations and real-user feedback. CityBuddy bridges the gap between locals and newcomers.
          </p>
        </div>

        <div className="about-section image-grid">
          <img
            src="https://images.unsplash.com/photo-1618220179428-f9b8f81d9c99?auto=format&fit=crop&w=1000&q=80"
            alt="Map Integration"
          />
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
            alt="PGs"
          />
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=80"
            alt="Mess"
          />
        </div>
      </section>
    </div>
  );
};

export default About;