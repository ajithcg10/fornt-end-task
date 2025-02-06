import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setLoading, setPosts, setError } from "../redux/postsSlice"; // Actions from your slice
import { fetchPostsAPI } from "../api/api"; // API function

const usePosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading());
      try {
        const data = await fetchPostsAPI();
        dispatch(setPosts(data));
      } catch (error: any) {
        dispatch(setError(error.message || "Failed to fetch posts"));
      }
    };

    fetchPosts();
  }, [dispatch]);
};

export default usePosts;
