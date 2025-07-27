import "./Footer.css"
import { NavLink } from "react-router"
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <>
    <div className="outer">
    <div className="footer">
         <div className="footer-top">
              <h1 className="logo">CITY <span>BUDDY</span></h1>
              <p style={{color:"green"}}>Find your place, find your people -with CityBuddy</p>
              <p style={{color:"rgb(78, 78, 174)"}}> </p>
         </div>
         <div className="container">
                 <div className="footer-middle">
              <ul>
               <li><NavLink to="/" className="NavLink">Home</NavLink></li>
               <li><NavLink to="/services" className="NavLink">Services</NavLink></li>
               <li><NavLink to="/about" className="NavLink">About</NavLink></li>
               <li><NavLink to="/contact-us" className="NavLink">Contact Us</NavLink></li>
                     
            </ul>
            </div>
             <div className="footer-right">
               <ul>
               <li><NavLink to="/" className="NavLink"><RiInstagramFill /> Instagram</NavLink></li>
               <li><NavLink to="https://www.linkedin.com/in/anuj-kantak/" className="NavLink"> <FaLinkedin /> Linkedin</NavLink></li>
               <li><NavLink to="tel:6388137118" className="NavLink"><FaPhoneVolume /> +91 6388137118</NavLink></li>
               <li><NavLink to="mailto:anujkantak2004@gmail.com" className="NavLink"><IoMdMail /> anujkantak2004@gmail.com</NavLink></li>
                </ul>
             </div>

         </div>
        
    </div>
    <div className="copyright"><p className="text-sm">
    &copy; {new Date().getFullYear()} CityBuddy. All rights reserved-By Anuj Kantak
  </p></div>
  </div>
    </>
  )
}

export default Footer
