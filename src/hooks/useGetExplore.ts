import { useEffect, useState } from "react";
import usePostStore, { Post } from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowMessage from "./useShowMessage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const useGetExplore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user)
  const {showError} = useShowMessage()


  useEffect(() => {
    const getExplorePosts = async () => {
      setIsLoading(true);
      try {
        const querySnapShot = await getDocs(collection(db, "posts"));
        const explorePosts: Post[] = [];
        querySnapShot.forEach((doc) => {
          explorePosts.push({ id: doc.id, ...doc.data() } as Post);
        });
  
        const filteredPosts = explorePosts.filter(
            (post) =>
              post.createdBy !== authUser?.uid && 
              !authUser?.following.includes(post.createdBy) 
          );
          
  
        filteredPosts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
  
        setPosts(filteredPosts);
      } catch (error) {
        if (error instanceof Error) {
          showError("Error: " + error.message);
        } else {
          showError("Some unknown error occurred");
        }
        console.error("Error fetching explore posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    getExplorePosts();
  }, [authUser, showError, setPosts]);
  
  return { isLoading, posts};
};

export default useGetExplore;