
import {Review} from "../model/review.js";

import calculatePostRatings from "../utils/calculatePostRating.js";





export const getReviewsOfPost = async (req, res, next) => {
  try {
    const { id } = req.params;
   

    const reviews = await Review.find({ createdFor: id })
      .populate("createdBy", "username avatar") // populate reviewer details
      // .sort({ createdAt: -1 });

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({
        success: true,
        reviews: [],
        message: "No reviews found for this post",
      });
    }

    return res.status(200).json({
      success: true,
      reviews,
      message: "Reviews fetched successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error in fetching reviews",
    });
    
  }
};



export const createReview=async (req, res,next)=>{
  try{
    const {rating,comment}=req.body;
    if(!rating || !comment){
      return res.status(400).json({
        success:false,
        message:"Rating is required"
      })
    }
     const user=req.user;
    const {id}=req.params;
    // const post=await Post.findById(id);
    const createdFor=id;
    const createdBy=user._id;
    
    const reviewData={
      rating,
      comment,
      createdBy,
      createdFor
    }

    
    
    
    const review=await Review.create(reviewData);
    
    
    
  await calculatePostRatings(id);
    
    return res.status(201).json({
      succes:true,
      message:"Review Created",
      review
    })


  }
  catch(error){
     

    

    
    console.log(error.message)
    return res.status(400).json({
      success:false,
      message:"Failed to create review"
    })
  }
}

export const deleteReview=async(req,res,next)=>{
  try{
    
    const {id}=req.params;
    const user=req.user;
    
    const review=await Review.findById(id);
    if(!review){
       return res.status(400).json({
    success:false,
    message:"Review not exist"
   })
    }

    if (review.createdBy.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the review creator can delete this review",
      });
    }
  
    await review.deleteOne();

    await calculatePostRatings(review.createdFor);
    return res.status(201).json({
      succes:true,
      
      
      message:"Review deleted successfully",
      review
    })
  }
  catch(error){
    console.log(error.message)
   return res.status(400).json({
    success:false,
    message:"Error in deleting review"
   })
  }
}

export const updateReview=async (req,res,next)=>{
  try{
    const {updatedRating,updatedComment}=req.body;
   console.log(updatedComment, updatedRating, "updatedComment and updatedRating");
    const {id}=req.params;
    const user=req.user;
    if(!updatedRating){
      
      return res.status(400).json({
        success:false,
        message:"Rating required"
      })
    }
    
    
    
    const review=await Review.findById(id);
    if (review.createdBy.toString() !== user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Only the review creator can update this review",
      });
    }
    review.rating=updatedRating;
    review.comment=updatedComment;
    review.save();
    
    
  
    
    
    
    return res.status(201).json({
      success:true,
      
      
      

      
      
      
      message:"Review updated successfully"
    
    })
  }
  catch(error){
    console.log(error.message)
     return res.status(500).json({
      success:false,
      message:"Internal server error in updating review"
     })
  }
}