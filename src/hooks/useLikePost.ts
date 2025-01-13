import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { Post } from "../store/postStore";
import useShowMessage from "./useShowMessage";
import { db } from "../services/firebase";
import { arrayRemove, arrayUnion, updateDoc, doc } from "@firebase/firestore";

const useLikePost = (post: Post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(
    post.likes?.includes(authUser?.uid ? authUser.uid : "") || false
  );
  const { showError } = useShowMessage();

  useEffect(() => {
    setLikes(post.likes ? post.likes.length : 0);
    setIsLiked(post.likes?.includes(authUser?.uid ? authUser.uid : "") || false);
  }, [post.likes, authUser?.uid]);

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!authUser) return showError("Login to like posts");
    if (!post.id) {
      showError("Invalid post ID");
      return;
    }
  
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
        showError("Some unknown error occurred");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost };
};

export default useLikePost;
