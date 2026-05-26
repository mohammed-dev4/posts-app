import axios from "axios";
import PostCard from "../components/posts/PostCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import CreatePost from "../components/posts/CreatePost";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/posts",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      console.log(data);
      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (errors) {
      console.log("From getPosts", errors.response.data);
      if (!errors.response.data.success) {
        toast.error(errors.response.data?.message || "Network Error");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <CreatePost />
      {loading ? (
        <Loading />
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </>
  );
}
