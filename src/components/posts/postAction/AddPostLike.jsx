import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeOnPost } from "../../../server/posts";
import { toast } from "react-toastify";
export default function AddPostLike({ postId, isLiked }) {
  const queryClient = useQueryClient();
  const [isLike, setIsLike] = useState(isLiked);
  const { mutate } = useMutation({
    mutationKey: ["likeOnPost"],
    mutationFn: likeOnPost,
    onSuccess: (data) => {
      setIsLike(data.data.data.liked);
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
        queryKey: [`postLikes/${postId}`],
      });
    },
    onError: (error) => {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    },
  });

  function handleLikePost() {
    mutate(postId);
    setIsLike(!isLike);
  }

  return (
    <>
      <button
        onClick={handleLikePost}
        className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100`}
      >
        <i
          className={`fa-${isLike ? "solid text-blue-600" : "regular"} text-base fa-thumbs-up`}
        ></i>
        Like
      </button>
    </>
  );
}
