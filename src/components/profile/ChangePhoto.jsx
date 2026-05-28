import { useEffect, useState } from "react";
import { changeProfilePhoto } from "../../server/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ChangePhoto({ setIsChangePhoto }) {
  const [preview, setPreview] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const queryClient = useQueryClient();
  function handlePreview(e) {
    const { files } = e.target;
    if (files[0]) {
      setProfilePhoto(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  }

  const { mutate, isPending } = useMutation({
    mutationKey: "changeProfilePhoto",
    mutationFn: changeProfilePhoto,
    onSuccess: () => {
      toast.success("Profile Photo Changed Successfully");
      queryClient.invalidateQueries({
        queryKey: ["userCardProfile"],
      });
      setPreview(null);
      setProfilePhoto(null);
      setIsChangePhoto(false);
    },
    onError: (error) => {
      console.log(error.response.data);
      toast.error(error.response.data);
    },
  });
  async function handleChangePhoto() {
    if (profilePhoto) {
      mutate(profilePhoto);
    }
  }

  function removeImage() {
    setPreview(null);
  }

  useEffect(() => {
    // Remove Scroll from page On Modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Add Scroll On page On Modal is Closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="absolute  z-500 w-full h-full inset-0 bg-gray-900/50">
      <div className="flex justify-center items-center mx-auto h-full w-full">
        <div className="max-w-xs relative w-full bg-white p-5 rounded-xl">
          <span
            onClick={() => {
              setIsChangePhoto(false);
            }}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </span>

          <h2 className="text-2xl text-center mb-3">Change Profile Photo</h2>

          <label
            htmlFor="upLoadPhoto"
            className=" flex justify-center items-center"
          >
            <span className="whitespace-nowrap bg-gray-700 hover:bg-gray-600 text-white text-base px-4 py-2 rounded-full cursor-pointer transition">
              upLoad photo
            </span>
            <input
              type="file"
              onChange={handlePreview}
              hidden
              name="upLoadPhoto"
              id="upLoadPhoto"
            />
          </label>

          {preview ? (
            <>
              <div className="relative flex justify-center items-center  mt-7 w-full overflow-hidden rounded-xl border">
                <img
                  src={preview}
                  alt="preview"
                  className="h-52 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute cursor-pointer right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleChangePhoto}
                  disabled={isPending}
                  className="mt-4 whitespace-nowrap bg-gray-50 hover:bg-gray-800 hover:text-white text-gray-700 border border-gray-700 text-base px-4 py-2 rounded-full cursor-pointer transition disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {isPending ? "changing..." : "Change Photo"}
                </button>
              </div>
            </>
          ) : (
            <div className="mt-7 w-full h-52 bg-gray-200  rounded-xl overflow-hidden">
              <div className=" h-full w-full flex justify-center items-center">
                <p className="p-3">upload Photo to show it here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
