import axios from "axios";

export async function getPosts() {
  return await axios.get("https://route-posts.routemisr.com/posts", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}
export async function createPost(data) {
  const formData = new FormData();

  formData.append("body", data.body);

  if (data.image) {
    formData.append("image", data.image);
  }

  return await axios.post("https://route-posts.routemisr.com/posts", formData, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}
