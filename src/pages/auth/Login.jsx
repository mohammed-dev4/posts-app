import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import InputError from "../../components/InputError";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema/login.schema";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import authContext from "../../context/authContext/authContext";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setIsLogin } = useContext(authContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(formValues) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        formValues,
      );

      if (data.success) {
        toast.success(`${data.message} successfully`);
        localStorage.setItem("token", data.data.token);
        setIsLogin(data.data.token);
        localStorage.setItem("userId", data.data.user._id);
        navigate("/");
        reset();
      }
    } catch (errors) {
      console.log("From Login", errors.response.data);
      if (!errors.response.data.success) {
        toast.error(errors.response.data?.message || "Network Error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div classNam="flex mt-4 justify-center  items-center">
      <div className="max-w-2xl w-full mx-auto bg-gray-50 p-4 shadow-sm rounded-xl ">
        <h3 className="text-center font-serif">Login</h3>

        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div className="mt-3">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-regular fa-envelope text-gray-400"></i>
                </div>

                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="yourEmail@example.com"
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400   outline-none transition  "
                />
              </div>
              {errors.email && <InputError message={errors.email?.message} />}
            </div>

            {/* Password */}
            <div className="mt-3  ">
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

            {/* Submit */}
            <div className="mt-3">
              <button
                type="submit"
                className="text-white text-base cursor-pointer bg-blue-600 box-border border border-transparent hover:bg-blue-700 focus:ring-4 shadow-xs font-medium leading-5 rounded-base px-8 py-2.5 focus:outline-none rounded-lg mx-auto block"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
