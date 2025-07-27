import "./Card.css"
import { Link } from "react-router"

const Card = ({key,post}) => {
  return (
    <>
      <div className="card-container">
        <div className="image-container">
             <img src={post.images[1].url} alt="" />
        </div>
        <div className="text-container">
            <p className="card-title">{post.title}</p>
            <p className="category">Category:{post.category}</p>
            <p className="rating">Rating: ⭐{post.averageRating}/5</p>
            
            
            <p className="comment">Comments:{post.totalReviews}</p>
          
            <Link to={`/viewpost/${post._id}`} className="link">See more</Link>
        </div>
      </div>
    </>
  )
}

export default Card
