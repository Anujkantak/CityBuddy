import {Post} from "../model/post.js";
import {Review} from "../model/review.js";

const calculatePostRatings = async (postId) => {
  const reviews = await Review.find({ createdFor: postId });

  const numOfReviews = reviews.length;
  const averageRating =
    numOfReviews === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / numOfReviews;

  await Post.findByIdAndUpdate(postId, {
    averageRating: averageRating.toFixed(1),
    totalReviews: numOfReviews,
  });
};

export default calculatePostRatings;
