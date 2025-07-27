import { configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice";


import postReducer from "./slices/postSlice"
import reviewReducer from "./slices/reviewSlice";

const store=configureStore({
  reducer:{
   user:userReducer,
   
   post:postReducer,
   review:reviewReducer,
  }
})

export default store;