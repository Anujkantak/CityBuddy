import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    posts: null,
    myPosts: null,
    singlePost: null,
    error: null,
    message: null,
  },
  reducers: {
    createRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    deleteRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state) => {
      state.loading = false;
    },
    deleteFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    getRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload.allPosts;
      state.message = action.payload.message;
    },
    getFailed: (state, action) => {
      state.loading = false;

      state.error = action.payload.message;
    },
    getMypostsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMypostsSuccess: (state, action) => {
      state.loading = false;
      state.myPosts = action.payload.posts;
      state.message = action.payload.message;
    },
    getMypostsFailed: (state, action) => {
      state.loading = false;

      state.error = action.payload.message;
    },

    getSinglePostRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSinglePostSuccess: (state, action) => {
      state.loading = false;
      state.singlePost = action.payload.post;
      state.error = null;
    },
    getSinglePostFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    resetError: (state) => {
      state.error = null;
    },
  },
});

export const getAllPosts =
  (city, street, pincode, state = "", searchKeyword = "") =>
  async (dispatch) => {
    console.log(city, street, pincode, state, searchKeyword);
    dispatch(postSlice.actions.getRequest());
    try {
      let query = [];
      if (searchKeyword) {
        query.push(`searchKeyword=${searchKeyword}`);
      }
      if (city) {
        query.push(`city=${city}`);
        console.log(city);
      }
      if (street) {
        query.push(`street=${street}`);
        console.log(street);
      }
      if (pincode) {
        query.push(`pincode=${pincode}`);
      }
      if (state) {
        query.push(`state=${state}`);
      }
      let link = "https://citybuddy-1.onrender.com/api/post/allposts?";
      link += query.join("&");
      const response = await axios.get(link, {
        withCredentials: true,
        //   headers: { "Content-Type": "application/json" },// Set the correct content type for JSON data
      });
      dispatch(postSlice.actions.getSuccess(response.data));
      dispatch(postSlice.actions.resetError());
    } catch (error) {
      dispatch(postSlice.actions.getFailed(error.response.data));
      console.log(error.response.data);
    }
  };

export const createPost = (data) => async (dispatch) => {
  dispatch(postSlice.actions.createRequest());
  try {
    const response = await axios.post(
      "https://citybuddy-1.onrender.com/api/post/create",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, // Set the correct content type for JSON data
      }
    );

    dispatch(postSlice.actions.createSuccess(response.data));
    toast.success(response.data.message);
    dispatch(resetError());
  } catch (error) {
    dispatch(postSlice.actions.createFailed(error.response.data));
  }
};

export const getMyPosts = () => async (dispatch) => {
  dispatch(postSlice.actions.getMypostsRequest());
  try {
    let link = "https://citybuddy-1.onrender.com/api/post/getmyposts";

    const response = await axios.get(link, {
      withCredentials: true,
      //   headers: { "Content-Type": "application/json" },// Set the correct content type for JSON data
    });
    dispatch(postSlice.actions.getMypostsSuccess(response.data));
    console.log(response.data.posts);

    dispatch(postSlice.actions.resetError());
  } catch (error) {
    dispatch(postSlice.actions.getMypostsFailed(error.response.data));
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  dispatch(postSlice.actions.getSinglePostRequest());
  try {
    let link = `https://citybuddy-1.onrender.com/api/post/getsinglepost/${id}`;

    const response = await axios.get(link, {
      withCredentials: true,
      //   headers: { "Content-Type": "application/json" },// Set the correct content type for JSON data
    });
    dispatch(postSlice.actions.getSinglePostSuccess(response.data));
    // toast.success(response.data.message);

    dispatch(postSlice.actions.resetError());
  } catch (error) {
    dispatch(postSlice.actions.getSinglePostFailed(error.response.data));
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch(postSlice.actions.deleteRequest());
  try {
    let link = `https://citybuddy-1.onrender.com/api/post/delete/${id}`;
    const response = await axios.delete(link, {
      withCredentials: true,
      //   headers: { "Content-Type": "application/json" },// Set the correct content type for JSON data
    });
    dispatch(postSlice.actions.deleteSuccess());
    toast.success(response.data.message);

    dispatch(postSlice.actions.resetError());
  } catch (error) {
    dispatch(postSlice.actions.deleteFailed(error.response.data));
  }
};

export const resetError = () => async (dispatch) => {
  dispatch(postSlice.actions.resetError());
};
export default postSlice.reducer;
