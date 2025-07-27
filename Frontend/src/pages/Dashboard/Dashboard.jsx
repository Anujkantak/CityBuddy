import { Link, NavLink, Outlet } from "react-router"
import "./Dashboard.css"
import { useSelector,useDispatch } from "react-redux"
import { logout } from "../../store/slices/userSlice"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { resetError } from "../../store/slices/userSlice"

const Dashboard = () => {
  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);
  
  return (
    <>
    <div className="dashboard-header">
         <p >Dashboard</p>
         <p>Welcome <span>{user?.username}</span></p>
    </div>
    <div className="dashboard-container">
      
      
      
















      
    

  
      <div className="dashboard-left">
           <p className="manage">Manage Accounts</p>
           <div className="left-links">
            <NavLink to="." className="link">My Profile</NavLink>
            {
              user?.role==="Host" &&
              <>
              <NavLink to="createpost" className="link">Create Post</NavLink>
              <NavLink to="myposts" className="link">My Posts</NavLink>
              </>
            }
            
            <NavLink className="link" onClick={logoutHandler}>Logout</NavLink>
           </div>
      </div>
      <div className="dashboard-right">
          <Outlet/>
      </div>
    </div>
     
    </>
  )
}

export default Dashboard
