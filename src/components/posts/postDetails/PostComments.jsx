import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostComments } from "../../../server/posts";
import Loading from "../../Loading";

export default function PostComments() {
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`postComments/${postId}`],
    queryFn: () => getPostComments(postId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading) {
    console.log("post comments", data?.data?.data?.comments);

    if (data?.data?.data?.comments?.length == 0) {
      return (
        <p className="text-center text-gray-700 text-lg">No Comments on Post</p>
      );
    }
  }
  return (
    <div className="space-y-4">
      {data?.data?.data?.comments?.map((comment) => (
        <div
          key={comment._id}
          className="rounded-2xl border border-gray-100 bg-white p-4"
        >
          <div className="flex items-start gap-3">
            <img
              src={comment.commentCreator.photo}
              alt={comment.commentCreator.name}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800">
                {comment.commentCreator.name}
              </h3>

              <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
