import { Post } from "../model/post.js";
import cloudinary from "../middleware/cloudinary.js";
import calculatePostRatings from "../utils/calculatePostRating.js";

export const createPost=async(req,res,next)=>{
  console.log(req.body)
  try{
     const {title,category,description,street,city,state,pincode}=req.body;
  if(
    !title ||
    !category ||
    !description ||
    !street ||
   
    !state ||
    !pincode ||
    !city

   ){
    return res.status(400).json({
       success:false,
       message:"All fields are required"
    })
   }

  const facilities=Array.isArray(req.body.facilities) ? req.body.facilities : [req.body.facilities];

   const files = req.files; // multiple images

    if (!files || files.length === 0) {
      return res.status(400).json({success:false, message: "Please upload images" });
    }

    const images = [];

    for (const file of files) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "citybuddy/posts",
      });

      images.push({
        public_id: uploadRes.public_id,
        url: uploadRes.secure_url,
      });
    }

   const user=req.user;
   const createdBy=user._id;
   const postData={
    title,
    category,
    description,
    address:{
       street,
       city,
       state,
       pincode
    },
    images, 
    createdBy,
    facilities,
   }

   const post =await Post.create(postData);
   return res.status(200).json({
    success:true,
    message:"Post created successfully",
    post
   })

    
  }
  catch(error){
    console.log(error.message)
    return res.status(400).json({
    success:false,
    message:"Post creation Failed",
    error
   })
  }
  
}



export const getSinglePost =async (req, res, next) => {
  
  try{
 const { id } = req.params;
  const post = await Post.findById(id).populate("createdBy", "username email avatar phone");
  if (!post) {
    return res.status(400).json({
      succes:false,
      message:"No post found"
    });
  }
  res.status(200).json({
    success: true,
    post,
  });
  }
  catch(error){
    return res.status(400).json({
      success:false,
      message:"Error in fetching single job"
    })
  }
 
}

export const getAllPost=async (req,res,next)=>{
  try{
    const {street,city,state,searchKeyword,pincode}=req.query;
    const query={};
    if(street){
     query["address.street"] = street;
     console.log(street)
    }
     if(city){
     query["address.city"] = city;
     console.log(city)
    }
     if(state){
     query["address.state"] = state;
    }
    if(pincode){
      query["address.pincode"]=pincode
    }
    if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { category: { $regex: searchKeyword, $options: "i" } },
      { description: { $regex: searchKeyword, $options: "i" } },
    ];
  }

    const allPosts=await Post.find(query);

    
    return res.status(201).json({
      success:true,
      message:"Posts fetched successfully",
      allPosts,
      count:allPosts.length
    })
  }
  catch(error){
     return res.status(400).json({
      success:true,
      message:"Error in fetching Posts",
      error
     })
  }
}

export const getMyPosts=async(req,res,next)=>{
  try{
     const id=req.user._id;
     const posts=await Post.find({createdBy:id});
     return res.status(201).json({
      succes:true,
      message:"All posts of your fetched succesfully",
      posts
     })
  }
  catch(error){
     return res.status(400).json({
      success:false,
      message:"Error in fetching your posts",
      error
     })
  }
}






























export const deletePost=async(req,res,next)=>{
  try{
     const {id}=req.params;
     
     const post=await Post.findById(id);
     if(!post){
      return res.status(400).json({
        success:false,
        message:"Oops! post is not found"
      })
     }
     await post.deleteOne()
     return res.status(201).json({
      success:true,
      
      message:"post deleted successfully"
     })
  }
  catch(error){
      return res.status(400).json({
        success:false,
        message:"failed to delete the post",
        error:error.message
      })
  }
}



















export const updatePost = async (req, res, next) => {
  console.log(req.body)
  try {
    const { id } = req.params; // Post ID to update
    const {
      title,
      category,
      description,
      street,
      city,
      state,
      country,
      pincode,
    } = req.body;

    // 1. Validate all required fields
    if (
      !title ||
      !category ||
      !description ||
      !street ||
      !state ||
      !country ||
      !pincode ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("yha")

    // 2. Get post from DB
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // 3. Handle facilities
    const facilities = Array.isArray(req.body.facilities)
      ? req.body.facilities
      : [req.body.facilities];

    // 4. Handle images (replace old ones if new files provided)
    let images = post.images; // default to existing images
    const files = req.files;

    if (files && files.length > 0) {
      // ✅ Delete old images from Cloudinary
      for (const img of post.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }

      images = [];

      for (const file of files) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;

        const uploadRes = await cloudinary.uploader.upload(dataURI, {
          folder: "citybuddy/posts",
        });

        images.push({
          public_id: uploadRes.public_id,
          url: uploadRes.secure_url,
        });
      }
    }

    // 5. Update post data
    post.title = title;
    post.category = category;
    post.description = description;
    post.facilities = facilities;
    post.images = images;
    post.address = {
      street,
      city,
      state,
      country,
      pincode,
    };

    // 6. Save updated post
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Post update failed",
      error,
    });
  }
};







