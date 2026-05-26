import { useState } from "react";

export default function CreatePost() {
  const [open, setOpen] = useState(false);

  function handleCreatePost(e) {
    e.preventDefault();
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
            <div className="flex items-center justify-between border-b  border-gray-300 p-4">
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
              <textarea
                rows="5"
                placeholder="What's on your mind?"
                className="w-full resize-none border-none text-lg outline-none placeholder:text-gray-400"
              ></textarea>

              <div className="relative w-fit mt-4 overflow-hidden rounded-xl border">
                <img
                  src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1779802242016-153f2afc-c626-4211-92ba-033c43fc343b-photo_2023-02-11_04-47-25.webp"
                  alt="preview"
                  className=" h-50 w-50 object-cover"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  ✕
                </button>
              </div>

              <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-4 transition hover:bg-gray-50">
                <i className="fa-regular fa-image text-xl text-green-600"></i>

                <span className="text-sm font-medium text-gray-700">
                  Add Photo
                </span>

                <input type="file" hidden accept="image/*" />
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="mt-5 h-11 w-full rounded-xl bg-blue-600 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
