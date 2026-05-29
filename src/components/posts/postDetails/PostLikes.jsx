import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostLikes } from "../../../server/posts";
import Loading from "../../Loading";

export default function PostLikes() {
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`postLikes/${postId}`],
    queryFn: () => getPostLikes(postId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading) {
    if (data?.data?.data?.likes?.length == 0) {
      return (
        <p className="text-center text-gray-700 text-lg">No Likes on Post</p>
      );
    }
  }

  return (
    <>
      <div className="space-y-4">
        {data?.data?.data?.likes?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition  bg-white"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.photo}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
