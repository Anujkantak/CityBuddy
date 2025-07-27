import "./Post.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSinglePost } from "../../store/slices/postSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../../store/slices/reviewSlice";

const Post = () => {
 
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singlePost } = useSelector((state) => state.post);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1); // Default rating
  const { reviews } = useSelector((state) => state.review);
  console.log(reviews, "reviews");

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);


  useEffect(() => {
  if (singlePost?._id) {
    dispatch(getReviews(singlePost._id));
  }
}, [dispatch, singlePost?._id,reviews]);

  if (!singlePost) return <p>Loading...</p>;

  const {
    images = [],
    title,
    // description,
    location,

    category,
    // reviews = [],
  } = singlePost;

  const handleSubmit = () => {
    console.log("chala1");
    if (!comment.trim()) {
      alert("Please write a comment.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please give a rating between 1 to 5.");
      return;
    }
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", rating);
    console.log("chala2,", comment, rating);

    dispatch(createReview(singlePost._id, formData));
    setComment("");
    setRating(1);
    console.log("chala3");
  };

  return (
    <div className="post-container">
      {/* === Header with Main Image & Info === */}
      <div className="post-header">
        <div className="main-image">
          <img src={images[0]?.url} alt="Main" />
        </div>

        <div className="post-info">
          <h2>Name: {title}</h2>

          <p className="category">category: {category}</p>
          {/* <p className="description">description: {description}</p> */}

          <p className="location">
            {" "}
            Location
            <FaMapMarkerAlt /> {location}
          </p>
          <div className="location-details">
            <p>street: {singlePost.address.street}</p>
            <p>city: {singlePost.address.city}</p>
            <p>pincode: {singlePost.address.pincode}</p>
            <p>state: {singlePost.address.state}</p>
            <p>country: {singlePost.address.country}</p>
          </div>

          <p className="owner">
            Owner details
            <FaMapMarkerAlt /> {location}
          </p>
          <div className="owner-details">
            <p className="avatar-username">
              <img src={singlePost.createdBy.avatar.url} alt="" />{" "}
              {singlePost.createdBy.username}
            </p>
            <p>Phone: {singlePost.createdBy.phone}</p>
            <p>Email: {singlePost.createdBy.email}</p>
            <p>
              Created On: {new Date(singlePost.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* === Image Gallery (scrollable) === */}
      <div className="gallery-section">
        <h3>Gallery</h3>
        <div className="image-scroll">
          {images.map((img, idx) => (
            <img key={idx} src={img.url} alt={`img-${idx}`} />
          ))}
        </div>
      </div>

      {/* === Reviews === */}
      <div className="review-section">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <div className="review" key={i}>
              <div>
                <div className="review-header">
                  <img src={r.createdBy.avatar.url} alt="avatar" />

                  <p>
                    <strong>{r.createdBy.username}</strong>
                  </p>
                  <p>⭐ {r.rating} / 5</p>
                </div>


  
                  <p className="comment">{r.comment}</p>
              </div>
              {user && user._id === r.createdBy._id && (
                <div className="review-actions">
                
                  <button
                    onClick={() => dispatch(deleteReview(r._id))}
                    className="delete-review"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* === Add Review === */}
      <div className="add-review">
        <textarea
          rows="3"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="rating-select">
          <label>Rating: </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1 - Terrible</option>
            <option value={2}>2 - Poor</option>
            <option value={3}>3 - Average</option>
            <option value={4}>4 - Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>

        <button onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default Post;
