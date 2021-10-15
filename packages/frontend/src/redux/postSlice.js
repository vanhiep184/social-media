import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  posts: [],
  postDetails: {},
};

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const { data } = await axios.get("/");
  return data;
});

export const getPostDetails = createAsyncThunk(
  "post/getPostDetails",
  async (id) => {
    const { data } = await axios.get("/" + id);
    return data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateLike: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );
      state.posts[index].isLiked = !state.posts[index].isLiked;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts = action.payload.response.posts;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getPostDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPostDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.postDetails = action.payload.response.post;
    },
    [getPostDetails.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default postSlice.reducer;
export const { updateLike } = postSlice.actions;