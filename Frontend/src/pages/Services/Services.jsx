import "./Services.css";



const Services = () => {
  return (
    <section className="services-full">
      <div className="services-header">
        <h1>Welcome to CityBuddy Services</h1>
        <p>
          Your ultimate guide to explore, settle, and thrive in a new city. Discover the best PGs, mess, hospitals,
          guest houses, and nearby services — all in one place, trusted and reviewed by locals.
        </p>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" alt="PGs" />
          <div className="card-content">
            <h3>PGs & Hostels</h3>
            <p>
              Explore top-rated PGs and hostels based on budget, distance, and amenities. Compare reviews and connect directly.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Mess" />
          <div className="card-content">
            <h3>Mess & Food Services</h3>
            <p>
              Browse affordable mess/tiffin providers with ratings on hygiene, taste, pricing, and delivery time.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="https://images.unsplash.com/photo-1576765607924-d9d1a1a04b82" alt="Hospitals" />
          <div className="card-content">
            <h3>Hospitals & Clinics</h3>
            <p>
              Find nearby hospitals, clinics, pharmacies and emergency services with availability info and contact details.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Hotels" />
          <div className="card-content">
            <h3>Guest Houses & Hotels</h3>
            <p>
              Comfortable and secure temporary stays for newcomers. Easily filter by ratings, budget, and amenities.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="https://images.unsplash.com/photo-1556742400-b5b7c512f1a8" alt="Local Services" />
          <div className="card-content">
            <h3>Nearby Essentials</h3>
            <p>
              Discover grocery stores, pharmacies, saloons, ATMs and other essentials with distance and opening hours.
            </p>
          </div>
        </div>

        <div className="service-card">
          <img src="https://images.unsplash.com/photo-1618220179428-f9b8f81d9c99" alt="Map Search" />
          <div className="card-content">
            <h3>Smart Map Integration</h3>
            <p>
              Use interactive maps to find services near your current location in real-time with filter options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;