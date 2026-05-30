import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { commentOnPost } from "../../../server/posts";
import { toast } from "react-toastify";

export default function AddPostComment({ isComment, postId, setIsComment }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addPostComment"],
    mutationFn: ({ postId, content }) => commentOnPost(postId, content),
    onSuccess: (data) => {
      toast.success(data.data.message);
      setContent("");
      setIsComment(false);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: [`singlePost-${postId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`postComments/${postId}`],
      });
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  function handleAddComment(e) {
    e.preventDefault();
    console.log(content);
    mutate({ postId, content });
  }

  return (
    <>
      {isComment && (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <form onSubmit={handleAddComment} className="flex items-center gap-3">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-900 placeholder-gray-400   outline-none transition"
            />

            <button
              type="submit"
              disabled={!content.trim() || isPending}
              className="rounded-xl cursor-pointer bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isPending ? "commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
