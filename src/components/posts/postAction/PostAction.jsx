import AddPostLike from "./AddPostLike";
import AddPostComment from "./AddPostComment";
import { useState } from "react";
export default function PostAction({ postId, isLiked }) {
  const [isComment, setIsComment] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 border-t border-gray-200 px-2 py-1">
        <AddPostLike postId={postId} isLiked={isLiked} />
        <button
          onClick={() => {
            setIsComment(!isComment);
          }}
          className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          <i className="fa-regular fa-comment"></i>
          Comment
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100">
          <i className="fa-solid fa-share"></i>
          Share
        </button>
      </div>
      <AddPostComment
        isComment={isComment}
        setIsComment={setIsComment}
        postId={postId}
      />
    </>
  );
}
