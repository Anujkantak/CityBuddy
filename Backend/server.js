import app from "./app.js"

import connection from "./connection.js";

connection();

app.listen(process.env.PORT,()=>{
  console.log(`server started at port:${process.env.PORT}`)
})