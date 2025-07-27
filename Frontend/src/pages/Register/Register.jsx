import React, { useState,useEffect } from 'react'
import "./Register.css"
import { useNavigate } from 'react-router';

import { Link } from 'react-router';

import { toast } from 'react-toastify';
import {useDispatch,useSelector} from "react-redux"
import { register,resetError } from '../../store/slices/userSlice';


function Register() {
  
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  
  
  const [role,setRole]=useState("");
  
  const [phone,setPhone]=useState("");
  const [street,setStreet]=useState("");
  const [city,setCity]=useState("");
  const [state,setState]=useState(null);
 
  
  
  
  
  
  
  const [pincode,setPincode]=useState("");
  const [avatar,setAvatar]=useState("");

  
  const {loading,error,isAuthenticated}=useSelector((state)=>state.user);


  const avatarHandler = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  
  const dispatch=useDispatch();
  const navigateTo=useNavigate();
  const registerHandle=function(e){
   e.preventDefault();

   const formData = new FormData();
    formData.append("role", role);
    console.log(role,"role")
    formData.append("username",username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
   
    if (role === "Host") {
      formData.append("street", street);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("pincode", pincode);
    }
    
    
    dispatch(register(formData));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(resetError());
    }
     if (isAuthenticated) {
      navigateTo("/");
    }
  },[dispatch,error,isAuthenticated,loading])

  return (
    <>
        <div className="register-container">
            <p className="title">Create your Account</p>
            <form onSubmit={registerHandle} className="register-form">
              <div className="role-username">
               
                 <select value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Select your role" required >
                   <option value="" disabled>Select your role</option>
                  <option value="Visitor">Visitor</option>
                  <option value="Host">Host</option>
                  
                 </select>
                 <input type="text" placeholder="Enter your name" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
              </div>

               <div className="email-password">
                 <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                
                 <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
              </div>

              <div className="phone-avatar">
                <input type="number" placeholder="Enter your number" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
                 <input type="file" placeholder="Choose your profile pic"  onChange={avatarHandler} required/>
              </div>
             {
              role==="Host" && (
                <>
                  <div className="street-city">
                 <input type="text" placeholder="Enter your street" value={street} onChange={(e)=>setStreet(e.target.value)} required/>
                
                 <input type="text" placeholder="Enter your city" value={city} onChange={(e)=>setCity(e.target.value)} required/>
              </div>

              <div className="pincode-state">
                 <input type="text" placeholder="Enter your pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)} required/>
                
                 <input type="text" placeholder="Enter your state" value={state} onChange={(e)=>setState(e.target.value)} required/>
              </div>
              
              </>
              )
             }
                    <button className="submit-button" type="submit">Register</button>
                    <p >Already a User? <Link className="link" to="/login">Login</Link></p>
                    
            </form>
        </div>
    </>
  )
}

export default Register