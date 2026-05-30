import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deletePost } from "../../server/posts";
import { toast } from "react-toastify";
import UpdatePost from "./UpdatePost";
export default function PostMenu({ postId, post }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    mutationKey: ["deletePost"],
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserPosts"],
      });
      setIsOpen(false);
      toast.success(data.data.message);
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  function handleDeletePost() {
    mutate(postId);
  }

  function handleUpdatePost() {
    setUpdatePost(true);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 transition hover:bg-gray-100"
      >
        <i className="fa-solid fa-ellipsis text-gray-600"></i>
      </button>

      {updatePost && (
        <UpdatePost setUpdate={setUpdatePost} postId={postId} post={post} />
      )}

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <button
            onClick={handleUpdatePost}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            <i className="fa-regular fa-pen-to-square"></i>
            Update
          </button>

          <button
            onClick={handleDeletePost}
            disabled={isPending}
            className="flex cursor-pointer w-full items-center gap-2 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-red-300 "
          >
            <i className="fa-regular fa-trash-can"></i>
            {isPending ? "deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}
