import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    // handle register
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.message;
    },
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    fetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.message;
    },

    resetError: (state) => {
      state.error = null;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    
    const response = await axios.post(
      "https://citybuddy-1.onrender.com/api/user/register",
      data,
      {
        withCredentials: true,
        //   headers: { "Content-Type": "application/json" },// Set the correct content type for JSON data
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));

    toast.success(response.data.message);
    dispatch(userSlice.actions.resetError());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "https://citybuddy-1.onrender.com/api/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }, // Set the correct content type for JSON data
      }
    );

    dispatch(userSlice.actions.loginSuccess(response.data));
    localStorage.setItem("token", response.data.token);
    toast.success(response.data.message);
    dispatch(resetError());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://citybuddy-1.onrender.com/api/user/logout",
      {
        withCredentials: true,
      }
    );

    dispatch(userSlice.actions.logoutSuccess());
    // toast.success(response.data.message);
    localStorage.removeItem("token");
    dispatch(resetError());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "https://citybuddy-1.onrender.com/api/user/getuser",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data));
    dispatch(userSlice.actions.resetError());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response.data));
  }
};

export const resetError = () => async (dispatch) => {
  dispatch(userSlice.actions.resetError());
};

export default userSlice.reducer;
