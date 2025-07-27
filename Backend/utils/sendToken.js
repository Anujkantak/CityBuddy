const sendToken=(user,statuscode,res,message)=>{
  const token= user.generateToken();
  const options={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
   res.status(statuscode).cookie("token",token,options).json({
        success:true,
        message,
        user,
        token
 
      })
}
export default sendToken;