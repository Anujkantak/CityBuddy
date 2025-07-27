import Navbar from "./component/Navbar/Navbar"
import Footer from "./component/Footer/Footer"
import {BrowserRouter as Router,Routes,Route} from "react-router"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import "./App.css"
import { ToastContainer } from 'react-toastify';
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./component/Profile/Profile"
import CreatePost from "./component/CreatePost/CreatePost"
import Mypost from "./component/Mypost/Mypost"
import {useDispatch } from "react-redux"
import { getUser } from "./store/slices/userSlice"
import { useEffect } from "react"
import Post from "./pages/Post/Post"
import Services from "./pages/Services/Services"
import About from "./pages/About/About"
import NotFoundPage from "./pages/Notfound/Notfound"
function App() {

  
  const dispatch=useDispatch();
  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <>
      <Router>
        <Navbar/>
       
        <Routes>
          <Route path="/" element={<Home/>}/>
           <Route path="/services" element={<Services/>}/>
           <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Register/>}/>
           <Route path="/login" element={<Login/>}/>
             <Route path="/viewpost/:id" element={<Post/>}/>
           <Route path="/dashboard" element={<Dashboard/>}>
              <Route index element={<Profile/>}/> 
              <Route path="createpost" element={<CreatePost/>}/> 
              <Route path="myposts" element={<Mypost/>}/> 
           </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>

        <Footer/>
       <ToastContainer position="top-right" theme="dark" />
      </Router>
    </>
  )
}

export default App
