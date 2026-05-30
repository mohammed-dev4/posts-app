import { useContext } from "react";
import PostAction from "./postAction/PostAction";
import authContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";
import PostMenu from "./PostMenu";

export default function PostCard({ post }) {
  const { userId } = useContext(authContext);

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

        {/* Post Action */}
        {userId == post.user._id && <PostMenu postId={post._id} post={post} />}
      </div>

      {/* Post Text */}
      <div className="px-4 pb-3">
        <p className="text-[15px] text-gray-800">{post.body}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <Link to={`/post/${post._id}/comments`}>
          <img
            src={post.image}
            alt={post.body}
            className="max-h-100 w-full object-cover"
          />
        </Link>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Link
            to={`/post/${post._id}/likes`}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white"
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </Link>

          <span>{post.likesCount}</span>
        </div>

        <Link
          to={`/post/${post._id}/comments`}
          className="flex items-center gap-3"
        >
          <span>{post.commentsCount} comments</span>
        </Link>
      </div>

      {/* Actions */}
      <PostAction postId={post._id} isLiked={post.likes.includes(userId)} />
    </div>
  );
}
