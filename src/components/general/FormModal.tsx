import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPost, updatePost } from "../../redux/postsSlice";
import { RootState } from "../../store/store";
import { Post } from "../../types/type";

export const FormModal = ({
  isOpen,
  onClose,
  post,
}: {
  isOpen: boolean;
  onClose: () => void;

  post?: Post | undefined;
}) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.posts);

  // State for form data
  const [formData, setFormData] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });

  // Set form data when post is provided (for update functionality)
  useEffect(() => {
    if (post) {
      setFormData({ title: post.title, body: post.body });
    } else {
      setFormData({ title: "", body: "" });
    }
  }, [post]);

  const handleClose = () => {
    setFormData({ title: "", body: "" });
    onClose();
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(post);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    let validationErrors = { title: "", body: "" };
    if (!formData.title) validationErrors.title = "Title is required";
    if (!formData.body) validationErrors.body = "Body is required";
    setErrors(validationErrors);

    if (!validationErrors.title && !validationErrors.body) {
      if (post) {
        // Handle update logic here (You might need an `updatePost` action)
        dispatch(updatePost({ ...post, ...formData }));
      } else {
        // Handle adding a new post
        dispatch(addPost({ ...formData, id: posts.length + 1, userId: 1 }));
      }

      setFormData({ title: "", body: "" });
      onClose();
    }
  };
  console.log(post, "status");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-[3px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {post ? "Edit Post" : "Create Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Body*
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter body"
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800  cursor-pointer rounded-lg hover:bg-gray-400 transition"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
            >
              {post ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
