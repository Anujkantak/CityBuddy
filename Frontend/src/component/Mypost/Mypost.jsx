import { useEffect } from "react";
import "./Mypost.css"
import { useSelector,useDispatch } from "react-redux"
import { getMyPosts } from "../../store/slices/postSlice";
import Card2 from "../Card2/Card2";


const Mypost = () => {

  const {myPosts}=useSelector((state)=>state.post);
  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(getMyPosts());
  },[dispatch,myPosts])
  return (
    <>
    <div className="myposts-container">
      <h1>My Posts</h1>
      <div className="posts-container">
        {Array.isArray(myPosts) &&

          myPosts.length > 0 ?

          myPosts.map((post) => (
           <Card2 key={post._id} post={post}/>
          ))
          :
          <p className="no-posts">No posts available.</p>}
      </div>
    </div>
      
    </>
  )
}

export default Mypost


// import { useEffect } from "react";
// import "./Mypost.css";
// import { useSelector, useDispatch } from "react-redux";
// import { getMyPosts } from "../../store/slices/postSlice";

// const Mypost = () => {
//   const dispatch = useDispatch();
//   const {}posts = useSelector((state) => state.myPosts?.posts) || [];

//   useEffect(() => {
//     dispatch(getMyPosts());
//   }, [dispatch]);

//   return (
//     <div>
//       {posts.length > 0 ? (
//         posts.map((post) => (
//           <div key={post._id}>{post.title}</div>
//         ))
//       ) : (
//         <p>No posts available.</p>
//       )}
//     </div>
//   );
// };

// export default Mypost;
