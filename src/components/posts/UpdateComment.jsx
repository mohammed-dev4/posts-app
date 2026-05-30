import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateComment } from "../../server/posts";

export default function UpdateComment({
  postId,
  commentId,
  initialContent,
  closeForm,
}) {
  const [content, setContent] = useState(initialContent);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateComment"],

    mutationFn: ({ postId, commentId, content }) =>
      updateComment(postId, commentId, content),

    onSuccess: (data) => {
      toast.success(data.data.message);

      queryClient.invalidateQueries({
        queryKey: [`postComments/${postId}`],
      });

      queryClient.invalidateQueries({
        queryKey: [`singlePost-${postId}`],
      });

      closeForm();
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  function handleUpdateComment(e) {
    e.preventDefault();

    if (!content.trim()) return;

    mutate({
      postId,
      commentId,
      content,
    });
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <form onSubmit={handleUpdateComment} className="flex items-center gap-3">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Update comment..."
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none"
        />

        <button
          type="submit"
          disabled={!content.trim() || isPending}
          className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isPending ? "Updating..." : "Update"}
        </button>

        <button
          type="button"
          onClick={closeForm}
          className="cursor-pointer rounded-xl border px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
