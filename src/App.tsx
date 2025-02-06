import { Provider } from "react-redux";
import { RootState, store } from "../src/store/store";
import { useSelector } from "react-redux";
import PostList from "./components/PostList";

const App: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts);
  console.log(posts);
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 w-full ">
        <h1 className="text-center text-[40px] bg-gradient-to-r from-indigo-500 to-purple-500 text-[#fff] font-extrabold group relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10">Front End Task</span>
        </h1>

        <PostList />
      </div>
    </Provider>
  );
};

export default App;
