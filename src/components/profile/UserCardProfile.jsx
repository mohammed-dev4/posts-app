import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../../server/profile";
import { useContext, useState } from "react";
import authContext from "../../context/authContext/authContext";
import ChangePassword from "./ChangePassword";

export default function UserCardProfile() {
  const { setUserId } = useContext(authContext);

  const [isChangePass, setIsChangePass] = useState(false);
  const { data, isSuccess } = useQuery({
    queryKey: ["userCardProfile"],
    queryFn: getProfileData,
  });

  const user = data?.data?.data?.user;

  if (isSuccess) {
    setUserId(user._id);
  }

  return (
    <>
      {user && (
        <>
          {isChangePass && <ChangePassword setIsChangePass={setIsChangePass} />}
          <div className="flex items-center justify-center">
            <div className="w-full text-gray-600 rounded-[40px] border-2 border-gray-300 p-3 md:p-5 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-24 h-24  rounded-full overflow-hidden border-2 border-gray-300">
                      <img
                        src={user.photo}
                        alt={user.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded-full cursor-pointer transition">
                      change photo
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl    font-semibold">
                      {user.name}
                    </h2>

                    <p className="text-lg text-gray-400">@{user.username}</p>
                  </div>
                </div>

                <div className="space-y-1 md:text-right">
                  <p className="text-lg">{user.email}</p>

                  <p>
                    {new Date(user.dateOfBirth).toLocaleDateString("en-us", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    setIsChangePass(true);
                  }}
                  className="px-10 py-2 rounded-2xl border border-gray-300 text-lg font-medium hover:bg-gray-700 cursor-pointer hover:text-white transition duration-300"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
