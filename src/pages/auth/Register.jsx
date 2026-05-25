import { useForm } from "react-hook-form";
import InputError from "../../components/InputError";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .email("Please enter a valid email address"),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    rePassword: zod.string().nonempty("Confirm password is required"),
    dateOfBirth: zod.string().nonempty("Date of birth is required"),
    gender: zod.enum(["female", "male"], "Please select your gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(formValues) {
    console.log(formValues);
  }
  return (
    <div className="flex mt-4 justify-center  items-center">
      <div className="max-w-2xl w-full mx-auto bg-gray-50 p-4 shadow-sm rounded-xl ">
        <h3 className="text-center font-serif">Register Now</h3>
        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <div className="mt-3">
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fa-regular fa-user text-gray-400"></i>
              </div>

              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="write your name"
                className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400   outline-none transition  "
              />
            </div>
            {errors.name && <InputError message={errors.name?.message} />}
          </div>

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

          <div className="flex justify-center flex-wrap   sm:flex-nowrap gap-1.5 ">
            {/* Password */}
            <div className="mt-3 w-full">
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

            {/* rePassword */}
            <div className="mt-3 w-full">
              <label
                htmlFor="rePassword"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                rePassword
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                </div>

                <input
                  type="password"
                  id="rePassword"
                  autoComplete="true"
                  {...register("rePassword")}
                  placeholder="******"
                  className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400   outline-none transition  "
                />
              </div>
              {errors.rePassword && (
                <InputError message={errors.rePassword?.message} />
              )}
            </div>
          </div>

          {/* Date */}
          <div className="mt-3">
            <label
              htmlFor="dateOfBirth"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              DateOfBirth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fa-solid fa-calendar-days text-gray-400"></i>
              </div>

              <input
                type="date"
                id="dateOfBirth"
                {...register("dateOfBirth")}
                className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400   outline-none transition  "
              />
            </div>
            {errors.dateOfBirth && (
              <InputError message={errors.dateOfBirth?.message} />
            )}
          </div>

          {/* Gender */}
          <div className="mt-3 ">
            <label
              htmlFor="gender"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Gender
            </label>
            <div className="flex items-center gap-2.5">
              {/* Male */}
              <div className="flex items-center">
                <input
                  id="male"
                  type="radio"
                  value={"male"}
                  {...register("gender")}
                  className="h-4 w-4 border border-gray-300 bg-white text-blue-600  "
                />
                <label
                  htmlFor="male"
                  className="ml-2 select-none text-sm font-medium text-gray-900"
                >
                  Male
                </label>
              </div>

              {/* FeMela */}
              <div className="flex items-center">
                <input
                  id="female"
                  type="radio"
                  value={"female"}
                  {...register("gender")}
                  className="h-4 w-4 border border-gray-300 bg-white text-blue-600  "
                />

                <label
                  htmlFor="female"
                  className="ml-2 select-none text-sm font-medium text-gray-900"
                >
                  Female
                </label>
              </div>
            </div>
            {errors.gender && <InputError message={errors.gender?.message} />}
          </div>

          {/* Submit */}
          <div className="mt-3">
            <button
              type="submit"
              className="text-white cursor-pointer bg-blue-600 box-border border border-transparent hover:bg-blue-700 focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-base px-8 py-2.5 focus:outline-none rounded-lg mx-auto block"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
