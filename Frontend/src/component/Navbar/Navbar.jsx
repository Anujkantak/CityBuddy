import { Link, NavLink } from "react-router"
import { useState } from "react";
import "./Navbar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";

function Navbar(){

  const [show,setShow]=useState(false)
  const {isAuthenticated,user}=useSelector((state)=>state.user)
  console.log(user)


  return (
    <>
    <div className="nav">
       <div className="nav-left">
          <h1 className="logo">CITY <span>BUDDY</span></h1>
       </div>

       <div className="nav-right" >
        <ul>
           
          <li><NavLink to="/" className="NavLink">Home</NavLink></li>
          <li><NavLink to="/services" className="NavLink">Services</NavLink></li>
          <li><NavLink to="/about" className="NavLink">About</NavLink></li>
          <li><NavLink to="/contact-us" className="NavLink">Contact Us</NavLink></li>

          {
            // <h4 onClick={logoutHandler}>Logout</h4>
            
            isAuthenticated ?<NavLink to="/dashboard"><img  src={user?.avatar.url} alt="icon" className="avatar-icon" /></NavLink> :  (
              <>
          <li><NavLink to="/login" className="NavLink">Login</NavLink></li>
          <li><NavLink to="/register" className="NavLink">Register</NavLink></li>
          </>
          )   
          }
                      
        </ul>

        {show ? <ImCross onClick={()=>setShow(!show)} className="cross"/> : <GiHamburgerMenu onClick={()=>setShow(!show)} className="hamburger" />}
       
 
         </div>
          </div>
           {

            show ? (
                 <div className="mobile">
        <ul>
          <li><NavLink to="/" className="NavLink">Home</NavLink></li>
          <li><NavLink to="/services" className="NavLink">Services</NavLink></li>
          <li><NavLink to="/about" className="NavLink">About</NavLink></li>
          <li><NavLink to="/contact-us" className="NavLink">Contact Us</NavLink></li>


         {
            // <h4 onClick={logoutHandler}>Logout</h4>
            
            isAuthenticated ?<NavLink to="/dashboard"><img  src={user?.avatar.url} alt="icon" className="avatar-icon" /> Profile</NavLink> :  (
              <>
          <li><NavLink to="/login" className="NavLink">Login</NavLink></li>
          <li><NavLink to="/register" className="NavLink">Register</NavLink></li>
          </>
          )   
          }           
          
          
         
        </ul>
       
        
         </div>
            )
            :
            " "
           }
           
     
    </>
  )

}

export default Navbar

