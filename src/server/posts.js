import axios from "axios";

export async function getPosts() {
  return await axios.get("https://route-posts.routemisr.com/posts", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}

export async function getSinglePost(postId) {
  return await axios.get(`https://route-posts.routemisr.com/posts/${postId}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}

export async function getPostLikes(postId) {
  return await axios.get(
    `https://route-posts.routemisr.com/posts/${postId}/likes`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
}

export async function getPostComments(postId) {
  return await axios.get(
    `https://route-posts.routemisr.com/posts/${postId}/comments`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
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

export async function likeOnPost(postId) {
  return await axios.put(
    `https://route-posts.routemisr.com/posts/${postId}/like`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
}
export async function commentOnPost(postId, content) {
  const formData = new FormData();

  formData.append("content", content);

  return await axios.post(
    `https://route-posts.routemisr.com/posts/${postId}/comments`,
    formData,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
}
