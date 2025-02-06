import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/type"; // Define types in a separate file for clean code

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Create the slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Action to start loading
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action to set posts after fetching
    setPosts: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    // Action to set error
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    // Action to update a post
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    // Action to delete a post
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setPosts,
  setError,
  addPost,
  updatePost,
  deletePost,
} = postSlice.actions;

export const selectPosts = (state: { posts: PostState }) => state.posts.posts;
export const selectLoading = (state: { posts: PostState }) =>
  state.posts.loading;
export const selectError = (state: { posts: PostState }) => state.posts.error;

export default postSlice.reducer;
