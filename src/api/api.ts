import axios from "axios";

// Fetch posts API
export const fetchPostsAPI = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
    return response.data.slice(0,10);
  } catch (error: any) {
    console.error("Failed to fetch posts:", error);
    throw new Error(error.message || "Something went wrong");
  }
};
