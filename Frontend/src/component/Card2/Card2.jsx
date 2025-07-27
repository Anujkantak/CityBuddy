import "./Card2.css"

import { Link } from "react-router"
import { useDispatch } from "react-redux"
import { deletePost } from "../../store/slices/postSlice";  

const Card2 = ({key,post}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="card-container">
        <div className="image-container">
             <img src={post.images[1].url} alt="" />
        </div>
        <div className="text-container">
            <p className="card-title">Title:{post.title}</p>
            <p className="category">Category:{post.category}</p>
            <p className="rating">Rating:{post.averageRating}/5</p>
            
            
            <p className="comment">Comments:{post.totalReviews}</p>
          
            <div className="edit-delete">
                 <button onClick={()=>dispatch(deletePost(post._id))}>Delete</button>
                 <button>Update</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Card2
