import { useState } from "react";
import { toast } from "react-toastify";
import { deleteComment } from "../../../server/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentMenu({
  postId,
  commentId,
  setEditingCommentId,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteComment"],

    mutationFn: () => deleteComment(postId, commentId),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`postComments/${postId}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`singlePost-${postId}`],
      });

      setIsOpen(false);

      toast.success(data.data.message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 transition hover:bg-gray-100"
      >
        <i className="fa-solid fa-ellipsis text-gray-600"></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <button
            onClick={() => {
              setEditingCommentId(commentId);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <i className="fa-regular fa-pen-to-square"></i>
            Update
          </button>

          <button
            onClick={() => mutate()}
            disabled={isPending}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-red-300"
          >
            <i className="fa-regular fa-trash-can"></i>

            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
