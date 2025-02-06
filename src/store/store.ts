import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../redux/postsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

