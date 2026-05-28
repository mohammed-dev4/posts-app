import axios from "axios";

export async function getProfileData() {
  return await axios.get(
    "https://route-posts.routemisr.com/users/profile-data",
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
}

export async function getUserPosts(userId) {
  return await axios.get(
    `https://route-posts.routemisr.com/users/${userId}/posts`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
}

export async function changePassword(data) {
  return await axios.patch(
    "https://route-posts.routemisr.com/users/change-password",
    data,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
}

export async function changeProfilePhoto(profilePhoto) {
  const formData = new FormData();

  if (profilePhoto) {
    formData.append("photo", profilePhoto);
  }

  return await axios.put(
    "https://route-posts.routemisr.com/users/upload-photo",
    formData,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
}
