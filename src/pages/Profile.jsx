import { useContext } from "react";
import UserCardProfile from "../components/profile/UserCardProfile";
import authContext from "../context/authContext/authContext";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../server/profile";
import PostCard from "../components/posts/PostCard";
import Loading from "../components/Loading";
export default function Profile() {
  const { userId } = useContext(authContext);
  const { data, isLoading } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: () => getUserPosts(userId),
  });

  if (isLoading) {
    return <Loading />;
  }

  const posts = data?.data?.data?.posts || [];

  return (
    <div className="container  mx-auto mt-4 max-w-2xl">
      <div className="text-center py-2 font-serif text-gray-700 ">
        <h1 className="text-4xl">Profile Data</h1>
      </div>
      <UserCardProfile />
      <div className="mt-3">
        {posts.length == 0 ? (
          <>
            <div>
              <div className="flex items-center justify-center py-6">
                <div className="w-full   rounded-3xl border border-gray-300  p-10 text-center">
                  <h2 className="text-3xl font-semibold text-gray-700 mb-3">
                    No Posts Yet
                  </h2>

                  <p className="text-gray-500 text-lg leading-relaxed">
                    You haven’t shared any posts yet. Start creating your first
                    post and share it with everyone 🚀
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} is />)
        )}
      </div>
    </div>
  );
}
