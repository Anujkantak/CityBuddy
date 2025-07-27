import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
    message: null,
  },
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    createReviewSuccess: (state, action) => {
      state.loading = false;
      // state.reviews.push(action.payload.review);
      state.message = action.payload.message;
    },
    getReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.reviews;
      state.message = action.payload.message;
    },
    updateReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = state.reviews.map((r) =>
        r._id === action.payload.review._id ? action.payload.review : r
      );
      state.message = action.payload.message;
    },
    deleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.reviews = state.reviews.filter(
        (r) => r._id !== action.payload.reviewId
      );
      state.message = action.payload.message;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetMessage: (state) => {
      state.message = null;
    },
  },
});


export const {
  requestStart,
  requestFailed,
  createReviewSuccess,
  getReviewsSuccess,
  updateReviewSuccess,
  deleteReviewSuccess,
  resetError,
  resetMessage,
} = reviewSlice.actions;


const API_URL = "http://localhost:3000/api/review";

// Create Review
export const createReview = (id,data) => async (dispatch) => {
  dispatch(reviewSlice.actions.requestStart());
  try {
    const res = await axios.post(`${API_URL}/create/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(reviewSlice.actions.createReviewSuccess(res.data));
    toast.success(res.data.message);
    dispatch(reviewSlice.actions.resetError());
  } catch (err) {
    dispatch(reviewSlice.actions.requestFailed(err.response.data));
    toast.error(err.response.data.message);
  }
};


export const getReviews = (id) => async (dispatch) => {
  dispatch(reviewSlice.actions.requestStart());
  console.log(id, "postId in getReviews");
  try {
    const res = await axios.get(`http://localhost:3000/api/review/getall/${id}`, {
      withCredentials: true,
    });
    console.log(res.data.message, "reviews in getReviews");
    console.log("hhhhhhh")
    dispatch(reviewSlice.actions.getReviewsSuccess(res.data));
    dispatch(reviewSlice.actions.resetError());
  } catch (err) {
    console.log(err, "error in getReviews");
    dispatch(reviewSlice.actions.requestFailed(err.response.data));
  }
};

// // Update Review
export const updateReview = (reviewId, data) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.put(`${API_URL}/update/${reviewId}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(updateReviewSuccess(res.data));
    console.log(res.data.message)
    toast.success(res.data.message);
    dispatch(resetError());
  } catch (err) {
    dispatch(requestFailed(err.response.data));
    toast.error(err.response.data.message);
  }
};

// Delete Review
export const deleteReview = (reviewId) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.delete(`${API_URL}/delete/${reviewId}`, {
      withCredentials: true,
    });
    dispatch(deleteReviewSuccess({ reviewId, message: res.data.message }));
    toast.success(res.data.message);
    dispatch(resetError());
  } catch (err) {
    dispatch(requestFailed(err.response.data));
    toast.error(err.response.data.message);
  }
};

export default reviewSlice.reducer;
