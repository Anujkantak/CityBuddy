import { User } from "../model/user.js";
import sendToken from "../utils/sendToken.js";
import cloudinary from "../middleware/cloudinary.js";

export const register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      street,
      city,
      state,
      country,
      pincode,
      role
    } = req.body;
    
    if (
      !username ||
      !email ||
      !password ||
      !phone ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all detailss",
      });
    }

    if(role==="Host" && (!street ||!city ||!state ||!pincode)){
        return res.status(400).json({
        success: false,
        message: "Please fill all detail",
      });
  }

    const alreadyUser = await User.findOne({ email });

    if (alreadyUser) {
      return res.status(400).json({
        success: false,
        message: "email is already registered",
      });
    }

    // ✅ Upload profile picture if file exists
    let avatar = { public_id: "", url: "" };
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const cloudinaryRes = await cloudinary.uploader.upload(dataURI, {
          folder: "citybuddy/profiles",
        });

        if (!cloudinaryRes || cloudinaryRes.error) {
          return res.status(400).json({
            success: false,
            message: "Failed to upload image at cloudinary",
          });
        }

        avatar = {
          public_id: cloudinaryRes.public_id,
          url: cloudinaryRes.secure_url,
        };
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Failed to upload avatar image",
          error,
        });
      }
    }

    const userData = {
      username,
      email,
      password,
      phone,
      role,
      address: {
        street,
        city,
        state,
        country,
        pincode
      },
      avatar,
    };

    const user = await User.create(userData);

    sendToken(user, 200, res, "user registered successfuly");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      success: false,
      message: "some error occured during registering the user",
      err,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });
    }
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched){
      return res.status(400).json({
        succes: false,
        message: "Password is incorrect",
      });
    }

    sendToken(user, 201, res, "user logged in successfuly");
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: "User failed to login",
    });
  }
};

export const logout = async (req, res, next) => {
  res.status(200).cookie("token", "", { maxAge: 0 }).json({
    success: true,
    message: "User logout seccessfully",
  });
};


export const getUser = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};
