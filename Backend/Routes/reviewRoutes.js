import express from "express"
import { createReview, deleteReview,getReviewsOfPost,updateReview } from "../controllers/reviewControllers.js";
import { isAuthenticated } from "../middleware/auth.js";




const router=express.Router();
router.get("/getall/:id",getReviewsOfPost)
router.post("/create/:id",isAuthenticated,createReview)
router.delete("/delete/:id",isAuthenticated,deleteReview)











router.put("/update/:id",isAuthenticated,updateReview)

export default router