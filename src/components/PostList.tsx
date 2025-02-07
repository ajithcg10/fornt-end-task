import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/postsSlice";
import { RootState } from "../store/store";
import usePosts from "../hooks/usePosts";
import FilterSection from "./FilterSection";
import { Search, Plus } from "lucide-react";
import Loader from "./general/Loader";
import ErroHandler from "./general/ErroHandler";
import { Post } from "../types/type";
import { FormModal } from "./general/FormModal";
import DeletePostModal from "./general/DeletePostModal";

const PostList: React.FC = () => {
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch();
  usePosts();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [modalData, setModalData] = useState<Post>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setModalDelete] = useState(false);
  const [deletePostData, setDeletePostData] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleUpdate = (updatedPost: Post) => {
    setIsModalOpen(true);
    setModalData(updatedPost);
  };
  const handleAdd = () => {
    setIsModalOpen(true);
    setModalData(undefined);
  };

  const handleDelete = (post: Post) => {
    setDeletePostData({ id: post.id, title: post.title });
    setModalDelete(true);
  };

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortOption) return 0; // No sorting if sortOption is undefined or empty
      return sortOption === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  const handleSortChange = (option: string) => setSortOption(option);

  if (loading) return <Loader />;

  if (error) return <ErroHandler error={error} />;

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="w-[100%]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <button
            onClick={() => handleAdd()}
            className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
          >
            <Plus size={20} />
            <span className="font-semibold">Add Post</span>
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-baseline gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-shadow duration-200"
              />
            </div>
            <FilterSection
              sortOption={sortOption}
              handleSortChange={handleSortChange}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg bg-white border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Body
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-[20px] font-[400] text-amber-400"
                    >
                      No posts found
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {post.body}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleUpdate(post)}
                          className="inline-flex items-center px-3 py-1 border cursor-pointer border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200 mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(post)}
                          className="inline-flex items-center px-3 py-1 border cursor-pointer border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={modalData}
      />
      <DeletePostModal
        isOpen={isModalDelete}
        onClose={() => {
          setModalDelete(false);
          setDeletePostData(null);
        }}
        postTitle={deletePostData?.title || ""}
        onConfirm={() => {
          if (deletePostData) {
            dispatch(deletePost(deletePostData.id));
            setModalDelete(false);
            setDeletePostData(null);
          }
        }}
      />
    </div>
  );
};

export default PostList;
