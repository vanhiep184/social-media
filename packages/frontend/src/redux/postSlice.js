import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  posts: [],
  postDetails: {},
};

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const { data } = await axios.get('/');
  return data;
});

export const getPostDetails = createAsyncThunk('post/getPostDetails', async (id) => {
  const { data } = await axios.get('/' + id);
  return data;
});
export const createPost = createAsyncThunk('post/createPost', async (post) => {
  const { data } = await axios.post('/', post);
  return data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updateLike: (state, action) => {
      const index = state.posts.findIndex((post) => post._id === action.payload.id);
      state.posts[index].isLiked = !state.posts[index].isLiked;
    },
  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = 'success';
      state.posts = action.payload.post;
    },
    [createPost.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [getPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = 'success';
      const posts = action.payload.posts;
      posts.sort((aPost, bPost) => compare(aPost?.order, bPost?.order));
      state.posts = posts;
    },
    [getPosts.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [getPostDetails.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getPostDetails.fulfilled]: (state, action) => {
      state.status = 'success';
      state.postDetails = action.payload.post;
    },
    [getPostDetails.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default postSlice.reducer;
export const { updateLike } = postSlice.actions;
const compare = (a, b) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  // a must be equal to b
  return 0;
};
