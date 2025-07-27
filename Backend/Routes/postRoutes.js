import express from "express"
import { createPost ,deletePost,getAllPost,getMyPosts, getSinglePost, updatePost} from "../controllers/postControllers.js";
import upload from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.post("/create",upload.array("images",20),isAuthenticated,createPost);
router.get("/getsinglepost/:id",getSinglePost);
router.get("/allposts",getAllPost);
router.get("/getmyposts",isAuthenticated,getMyPosts);
router.delete("/delete/:id",isAuthenticated,deletePost)
router.put("/updatepost/:id",upload.array("images", 20),isAuthenticated,updatePost)



export default router