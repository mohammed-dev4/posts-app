import { useQuery } from "@tanstack/react-query";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { getSinglePost } from "../server/posts";
import Loading from "../components/Loading";
import PostCard from "../components/posts/PostCard";

export default function PostDetails() {
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`singlePost-${postId}`],
    queryFn: () => getSinglePost(postId),
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto flex max-w-5xl relative flex-col gap-6 px-4">
        <div>
          <Link to={"/"} className="text-xl bg-gray-200 px-4 py-1 rounded">
            <i className="fa-solid text-gray-800   fa-arrow-left"></i>
          </Link>
        </div>

        {isLoading ? <Loading /> : <PostCard post={data.data.data.post} />}
        <div className="  rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
          <div className="flex items-center py-3 border-b gap-2 border-gray-100">
            <NavLink
              to={"likes"}
              className="post-nav py-2 relative flex-1 px-2 text-sm font-semibold  text-gray-500 transition  hover:bg-gray-50 hover:text-gray-700 text-center block rounded-xl"
            >
              Likes
            </NavLink>

            <NavLink
              className="post-nav py-2 relative flex-1 px-2 text-sm font-semibold text-gray-500 transition  hover:bg-gray-50 hover:text-gray-700 text-center block rounded-xl"
              to={"comments"}
            >
              Comments
            </NavLink>
          </div>

          <div className="p-4">
            {/* Likes List */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
