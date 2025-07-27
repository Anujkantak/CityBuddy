import mongoose from "mongoose"

 const connection=()=>{
  mongoose.connect(process.env.MONGO_URL,{dbName:"city-buddy"})
  .then(()=>{console.log("connected to the database")})
  .catch((err)=>{console.log(`some error occured during connecting to the database:${err}`)})
}

export default connection;