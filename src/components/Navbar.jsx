import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import authContext from "../context/authContext/authContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { isLogin, setIsLogin } = useContext(authContext);
  function toggle() {
    setIsOpen(!isOpen);
  }
  function logout() {
    localStorage.removeItem("isLogin");
    setIsLogin(null);
    toast.success("Logout successfuly");
  }

  return (
    <>
      <nav className="bg-white w-full sticky top-0  border-b border-gray-300">
        <div className="container max-w-4xl w-full flex flex-wrap items-center justify-between mx-auto py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="font-bold text-gray-700 text-xl font-serif">
              <span className="text-blue-600 font-extrabold text-2xl">
                Posts {""}
              </span>
              App
            </span>
          </Link>

          {/* Btn Actions */}
          <div className="flex md:order-2 space-x-2 rtl:space-x-reverse">
            {isLogin ? (
              <button
                onClick={logout}
                className="border flex justify-center items-center border-red-600 px-4 py-1 rounded-md bg-red-600 hover:bg-red-800 text-white cursor-pointer   hover:text-white transition-colors "
              >
                Logout
              </button>
            ) : (
              <>
                {pathname !== "/login" && (
                  <Link
                    to={"/login"}
                    className="border flex justify-center items-center border-blue-600 px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-800 text-white   hover:text-white transition-colors "
                  >
                    Login
                  </Link>
                )}

                {pathname !== "/register" && (
                  <Link
                    to={"/register"}
                    className="border flex justify-center items-center border-gray-300 px-4 py-1 rounded-md hover:bg-gray-600 hover:text-white transition-colors "
                  >
                    Register
                  </Link>
                )}
              </>
            )}

            <button
              type="button"
              className="flex md:hidden justify-center items-center border border-gray-300 px-2 py-1 rounded-md hover:bg-gray-700 hover:text-white cursor-pointer transition-colors "
              onClick={toggle}
            >
              <span className="fa-solid fa-bars text-2xl "></span>
            </button>
          </div>

          {/* Links List */}

          <div
            className={` ${!isOpen && "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex text-gray-700 flex-col p-2 border-t border-gray-300 md:p-0 mt-4 font-medium rounded-base bg-neutral-secondary-soft  gap-1.5 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white/40">
              {isLogin && (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="  py-1 hover:text-blue-800 font-semibold px-3 md:p-0   transition-colors md:px-2 rounded-md"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/profile"
                      className="  py-1 hover:text-blue-800 font-semibold px-3 md:p-0   transition-colors md:px-2 rounded-md"
                      aria-current="page"
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              )}
              {!isLogin && (
                <li>
                  <div className="block md:hidden text-center mt-3">
                    <p className="text-red-500 text-base font-medium">
                      Please login or create an account
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
