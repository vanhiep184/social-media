import axios from "axios";

export const addPost = async (postData) => {
  try {
    const { data } = await axios.post("/api/posts", postData);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const likeOrDislikePost = async (postData) => {
  try {
    const { data } = await axios.post("/api/posts/likes", postData);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};
