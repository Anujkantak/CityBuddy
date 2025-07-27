import jwt from "jsonwebtoken"
import { User } from ".././model/user.js";

export const isAuthenticated= async function(req,res,next){
    const {token}=req.cookies;
    if(!token){
      return res.status(400).json({
        success:false,
        // message:"User is not authenticated"
      })
    }

    const decodedToken=jwt.verify(token,process.env.SECRET_KEY);
    req.user= await User.findById(decodedToken.id);
    next();
}