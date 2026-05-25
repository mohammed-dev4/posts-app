import { useForm } from "react-hook-form";
import InputError from "../../components/InputError";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(errors);

  function handleLogin(formValues) {
    console.log(formValues);
  }
  return (
    <div className="flex mt-4 justify-center  items-center">
      <div className="max-w-2xl w-full mx-auto bg-gray-50 p-4 shadow-sm rounded-xl ">
        <h3 className="text-center font-serif">Login</h3>
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                    message: "Email Not Valid",
                  },
                })}
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
      </div>
    </div>
  );
}
