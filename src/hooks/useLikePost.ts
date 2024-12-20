import { useState } from "react";
import useAuthStore from "../store/authStore";
import { Post } from "../store/postStore";
import useShowMessage from "./useShowMessage";
import { db } from "../services/firebase";
import { arrayRemove, arrayUnion, updateDoc, doc } from "@firebase/firestore";

const useLikePost = (post: Post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(
    post.likes.includes(authUser?.uid ? authUser.uid : "")
  );
  const { showError } = useShowMessage();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) return showError("Login to like posts");

    setIsUpdating(true);

    try {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      setIsLiked(!isLiked);

      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      if (error instanceof Error) {
        showError("Error:" + error.message);
      } else {
        showError("Some unknown error occured");
      }
    } finally {
      setIsUpdating(true);
    }
  };

  return { isLiked, likes, handleLikePost };
};
export default useLikePost;
