
import { Link } from "react-router-dom";
import "./Notfound.css";

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you're looking for doesn't exist or has been moved.  
          Let’s help you get back on track.
        </p>
        <Link to="/" className="home-link">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
