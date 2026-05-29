import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getSinglePost } from "../server/posts";
import Loading from "../components/Loading";

export default function PostDetails() {
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`singlePost-${postId}`],
    queryFn: () => getSinglePost(postId),
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4">
        {isLoading ? <Loading /> : <Card post={data.data.data.post} />}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
          <div className="flex items-center py-3 border-b gap-2 border-gray-100">
            <NavLink
              to={"likes"}
              className="post-nav py-2 relative flex-1 px-2 text-sm font-semibold  text-gray-500 transition  hover:bg-gray-50 hover:text-gray-700 text-center block rounded-xl"
            >
              Likes
            </NavLink>

            <NavLink
              className="post-nav py-2 relative flex-1 px-2 text-sm font-semibold  text-gray-500 transition  hover:bg-gray-50 hover:text-gray-700 text-center block rounded-xl"
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

function Card({ post }) {
  return (
    <div className="rounded-xl border mt-4 border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {post.user.photo ? (
            <img
              src={post.user.photo}
              alt={post.user.name}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <span className="h-11 w-11 bg-gray-300 flex justify-center items-center rounded-full object-cover">
              <i className="fa-solid text-gray-800  text-lg fa-user"></i>
            </span>
          )}

          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              {post.user.name}
            </h2>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>{post.user.username}</span>
              <span className="fa-solid fa-circle text-[4px]"></span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-us", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <i className="fa-solid fa-earth-americas text-[11px]"></i>
            </div>
          </div>
        </div>

        <button className="rounded-full p-2 transition hover:bg-gray-100">
          <i className="fa-solid fa-ellipsis text-gray-600"></i>
        </button>
      </div>

      {/* Post Text */}
      <div className="px-4 pb-3">
        <p className="text-[15px] text-gray-800">{post.body}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.body}
          className="max-h-100 w-full object-cover"
        />
      )}

      {/* Stats */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
            <i className="fa-solid fa-thumbs-up"></i>
          </div>

          <span>{post.likesCount}</span>
        </div>

        <div className="flex items-center gap-3">
          <span>{post.commentsCount} comments</span>
        </div>
      </div>
    </div>
  );
}
