

import mongoose from "mongoose"


const reviewSchema=new mongoose.Schema({
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5
  },
  
  comment:{
    type:String
  },
  createdBy:{
    
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  createdFor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    required:true
  },
  createdAt:{
    type:Date,
    
    default:Date.now
  }
})

export const Review=mongoose.model("Review",reviewSchema);