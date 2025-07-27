import { useEffect, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, resetError } from "../../store/slices/postSlice";
import { toast } from "react-toastify";
import Card from "../../component/Card/Card";
import Landing from "../../component/Landing/Landing";

function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  const dispatch = useDispatch();
  const { posts, error, loading,message } = useSelector((state) => state.post);
  console.log(posts)

  const handleSubmit = () => {

    dispatch(getAllPosts(city,street,pincode,state,searchKeyword));
    // console.log(message,"jj")
    // toast.success(message)
  };
  useEffect(()=>{
      dispatch(getAllPosts(city,street,pincode,state,searchKeyword));
  },[])

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [error,loading]);

  return (
    <div className="home-container">

       <Landing/>
      <div className="search-container">
        <input
          type="text"
          placeholder="What are you looking for?"
          id="search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <label onClick={handleSubmit} htmlFor="search">
          Search
        </label>
      </div>


      <div className="query-container">
        <input
          type="text"
          placeholder="Enter street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select a state</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
        </select>
      </div>



     

      <div className="all-posts">
        {
        
        Array.isArray(posts) &&
        posts.length > 0 ?
        
        
          posts.map((post) => (
           <Card key={post._id} post={post}/>
          )
        
        ): (
          <p className="no-posts">No posts found.</p>
        
        )
        }
        
      </div>
    </div>
  );
}

export default Home;
