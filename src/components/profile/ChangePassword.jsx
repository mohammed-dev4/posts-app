import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../InputError";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../server/profile";
import { useContext, useEffect } from "react";
import authContext from "../../context/authContext/authContext";
import { toast } from "react-toastify";

const ChangePasswordSchema = zod
  .object({
    password: zod
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    newPassword: zod
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
  })
  .refine(
    (data) => {
      if (data.password === data.newPassword) {
        return false;
      }
      return true;
    },
    {
      path: ["newPassword"],
      message: "New password cannot be the same as current password",
    },
  );

export default function ChangePassword({ setIsChangePass }) {
  const { setIsLogin } = useContext(authContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", newPassword: "" },
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,

    onSuccess: (data) => {
      localStorage.setItem("token", data.data.data.token);
      setIsLogin(data.data.data.token);
      toast.success(data.data.message);
      setIsChangePass(false);
      reset();
    },

    onError: (error) => {
      console.log(error.response.data);
      toast.success(error.response.data.message);
    },
  });

  async function handleChangePass(data) {
    mutate(data);
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
      <div className="flex justify-center items-center h-full w-full">
        <div className="max-w-xl relative w-full bg-white p-3 rounded-xl">
          <span
            onClick={() => {
              setIsChangePass(false);
            }}
            className="absolute right-3 top-3 cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </span>

          <h2 className="text-xl text-center">Change Password</h2>
          <form onSubmit={handleSubmit(handleChangePass)}>
            <div className="mt-3">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                </div>

                <input
                  type="password"
                  id="password"
                  autoComplete="true"
                  {...register("password")}
                  placeholder="******"
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400   outline-none transition  "
                />
              </div>
              {errors.password && (
                <InputError message={errors.password?.message} />
              )}
            </div>
            <div className="mt-4    ">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                </div>

                <input
                  type="password"
                  id="password"
                  autoComplete="true"
                  {...register("newPassword")}
                  placeholder="******"
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400   outline-none transition  "
                />
              </div>
              {errors.newPassword && (
                <InputError message={errors.newPassword?.message} />
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={isPending}
                className="text-white text-base cursor-pointer bg-blue-600 box-border border border-transparent hover:bg-blue-700 focus:ring-4 shadow-xs font-medium leading-5 rounded-base px-8 py-2.5 focus:outline-none rounded-lg mx-auto block disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isPending ? "changing..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
