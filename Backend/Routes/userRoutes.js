import express from "express"
import { login, logout, register,getUser } from "../controllers/userControllers.js";
import upload from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const router=express.Router();

router.post("/register",upload.single('avatar'),register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/getuser", isAuthenticated, getUser);


export default router;

