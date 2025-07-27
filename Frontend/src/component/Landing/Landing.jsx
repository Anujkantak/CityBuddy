import "./Landing.css";
const Landing = () => {
  return (
    <div className="landing-wrapper">
      <section className="intro">
        <h1>Welcome to CityBuddy</h1>
        <p>
          New in the city? Don't worry — CityBuddy helps you find PGs, mess services, hospitals, hotels,
          and more with reviews, ratings, and verified listings, all in one place.
        </p>
        {/* <a href="#features" className="cta-button">Explore Now</a> */}
      </section>

      <section id="features" className="features-section">
        <h2>What We Offer</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" alt="PGs" />
            <h3>PGs & Hostels</h3>
            <p>Find safe, affordable accommodation based on real user reviews.</p>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Mess" />
            <h3>Food & Mess</h3>
            <p>Access hygienic mess and tiffin services recommended by locals.</p>
          </div>
          {/* <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1576765607924-d9d1a1a04b82" alt="Hospitals" />
            <h3>Hospitals & Clinics</h3>
            <p>Locate nearby healthcare facilities with emergency contact info.</p>
          </div> */}
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Hotels" />
            <h3>Hotels & Guest Houses</h3>
            <p>Short and long-stay options verified for comfort and pricing.</p>
          </div>
        </div>
      </section>

      <section className="why-section">
        <h2>Let's Explore your Destination</h2>
        {/* <ul>
          <li>✅ Trusted by students and working professionals alike</li>
          <li>✅ Real-time reviews and ratings</li>
          <li>✅ Smart filters and location-based suggestions</li>
          <li>✅ Verified photos and contact information</li>
        </ul> */}
      </section>
    </div>
  );
};

export default Landing;