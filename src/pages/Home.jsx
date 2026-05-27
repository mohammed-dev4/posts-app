 import PostCard from "../components/posts/PostCard";
import Loading from "../components/Loading";
import CreatePost from "../components/posts/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../server/posts";
export default function Home() {
  const { data, isLoading } = useQuery({
    queryFn: getPosts,
    queryKey: ["posts"],
  });

  return (
    <>
      <CreatePost />
      {isLoading ? (
        <Loading />
      ) : (
        data?.data?.data?.posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </>
  );
}
