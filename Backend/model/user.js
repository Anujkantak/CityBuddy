import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:[true,"email is required"],
    unique:true
  },
  password:{
    type:String,
    required:true,
    select:false,
  },
  phone:{
    type:String,
    required:true,
  },
  role:{
    type:String,
   
    enum:["Visitor","Host","Admin"],
    
    
  },
  address:{
    street:String,
    city:String,
    state:String,
    country:{
     type: String,
     default:"India"
    },
    pincode:Number
  },

  avatar:{
       public_id:String,   // for deletion later
       url:{
        type:String,       // for storing actual image url
        // default://add any user icon
       }
  },

  createdAt:{
    type:Date,
    default:Date.now
    
  }
})



userSchema.pre("save",async function (next){
  if(!this.isModified("password")){
    next()
  }

  this.password=await bcrypt.hash(this.password,10);
  next()
})

userSchema.methods.comparePassword= async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateToken= function(){
  return jwt.sign({id:this._id},process.env.SECRET_KEY,{expiresIn:process.env.TOKEN_EXPIRE});
}

 export const User=mongoose.model("User",userSchema);