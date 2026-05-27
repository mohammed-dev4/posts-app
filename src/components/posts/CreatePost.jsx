import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPost } from "../../server/posts";

export default function CreatePost() {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState({
    body: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post Created Successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      setPostData({
        body: "",
        image: null,
      });
      setPreview(null);
      setOpen(false);
    },
    onError: (error) => {
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
    mutate(postData);
  }

  function removeImage() {
    setPreview(null);
    setPostData({
      ...postData,
      image: null,
    });
  }

  return (
    <div className="container mx-auto mt-4 max-w-2xl">
      {/* Create Post Box */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            onClick={() => setOpen(true)}
            placeholder="What's on your mind?"
            className="h-11 w-full cursor-pointer rounded-2xl bg-gray-100 px-4 text-sm outline-none transition hover:bg-gray-200"
          />
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-300 p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Create Post
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreatePost} className="p-4">
              {/* Textarea */}
              <textarea
                rows="5"
                name="body"
                value={postData.body}
                onChange={handleChange}
                placeholder="What's on your mind?"
                className="w-full resize-none border-none text-lg outline-none placeholder:text-gray-400"
              ></textarea>

              {/* Preview Image */}
              {preview && (
                <div className="relative mt-4 w-fit overflow-hidden rounded-xl border">
                  <img
                    src={preview}
                    alt="preview"
                    className="h-52 w-52 object-cover"
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

              {/* Upload Image */}
              <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-4 transition hover:bg-gray-50">
                <i className="fa-regular fa-image text-xl text-green-600"></i>

                <span className="text-sm font-medium text-gray-700">
                  Add Photo
                </span>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                />
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending || !postData.body.trim()}
                className="mt-5 h-11 w-full rounded-xl bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isPending ? "Creating..." : "Create Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
