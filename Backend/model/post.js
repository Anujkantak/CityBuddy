import mongoose from "mongoose";


const postSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true
  },
 
  category:{
    type:String,
    required:true,
    // enum:["PG","Mess","Hotel","Hospital","Gym","Other","Store","School","College"],
  },
  description:String,
  address:{
    street:String,
    city:String,
    state:String,
    country:{type:String,
      default:"India"
    },
    pincode:Number
  },
  images:[
    {
      public_id:String,
      url:String
    }
  ],

   facilities: {
    type: [String], // ["wifi", "parking", "ac"]
    default: [],
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
 

  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  
  createdAt:{
    type:Date,
    default:Date.now
    
  }
})

export const Post=mongoose.model("Post",postSchema);