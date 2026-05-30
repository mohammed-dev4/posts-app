import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePost } from "../../server/posts";

export default function UpdatePost({ setUpdate, postId, post }) {
  const [postData, setPostData] = useState({
    body: post.body,
    image: post.image ? post.image : null,
  });

  const [preview, setPreview] = useState(post.image ? post.image : null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ postData, postId }) => {
      return updatePost(postData, postId);
    },

    onSuccess: (data) => {
      console.log(data.data);

      toast.success(data.data.message || "Post Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserPosts"],
      });

      setPostData({
        body: "",
        image: null,
      });
      setUpdate(false);
      setPreview(null);
    },
    onError: (error) => {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      setPostData({
        ...postData,
        image: file,
      });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setPostData({
        ...postData,
        [name]: value,
      });
    }
  }

  function handleCreatePost(e) {
    e.preventDefault();
    mutate({ postData, postId });
  }

  function removeImage() {
    setPreview(null);
    setPostData({
      ...postData,
      image: null,
    });
  }

  return (
    <div>
      <div className="fixed inset-0 mt-10 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-300 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Update Post</h2>

            <button
              onClick={() => setUpdate(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleCreatePost} className="p-4">
            <textarea
              rows="4"
              name="body"
              value={postData.body}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="w-full resize-none border-none text-lg outline-none placeholder:text-gray-400"
            ></textarea>

            {preview && (
              <div className="relative mt-4 w-fit overflow-hidden rounded-xl border">
                <img
                  src={preview}
                  alt="preview"
                  className="h-50 w-80 object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  ✕
                </button>
              </div>
            )}

            <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-2 transition hover:bg-gray-50">
              <i className="fa-regular fa-image text-xl text-green-600"></i>

              <span className="text-sm font-medium text-gray-700">
                change Photo
              </span>

              <input
                type="file"
                hidden
                accept="image/*"
                name="image"
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              disabled={isPending || !postData.body.trim()}
              className="mt-3 h-11 cursor-pointer w-full rounded-xl bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isPending ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
