import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostComments } from "../../../server/posts";
import Loading from "../../Loading";
import CommentMenu from "./CommentMenu";
import { useContext, useState } from "react";
import authContext from "../../../context/authContext/authContext";
import UpdateComment from "../UpdateComment";

export default function PostComments() {
  const { postId } = useParams();
  const { userId } = useContext(authContext);

  const [editingCommentId, setEditingCommentId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: [`postComments/${postId}`],
    queryFn: () => getPostComments(postId),
  });

  if (isLoading) {
    return <Loading />;
  }

  const comments = data?.data?.data?.comments || [];

  if (comments.length === 0) {
    return (
      <p className="text-center text-lg text-gray-700">No Comments on Post</p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment._id}>
          <div className="rounded-2xl border border-gray-100 bg-white p-4">
            <div className="relative flex items-start gap-3">
              {userId === comment.commentCreator._id && (
                <div className="absolute -right-2 -top-2">
                  <CommentMenu
                    postId={postId}
                    commentId={comment._id}
                    setEditingCommentId={setEditingCommentId}
                  />
                </div>
              )}

              <img
                src={comment.commentCreator.photo}
                alt={comment.commentCreator.name}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">
                  {comment.commentCreator.name}
                </h3>

                <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
              </div>
            </div>
          </div>

          {editingCommentId === comment._id && (
            <div className="mt-3">
              <UpdateComment
                postId={postId}
                commentId={comment._id}
                initialContent={comment.content}
                closeForm={() => setEditingCommentId(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
