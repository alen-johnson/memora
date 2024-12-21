import { useEffect, useState } from "react";
import usePostStore, { Post } from "../store/postStore";
import useShowMessage from "./useShowMessage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const useGetPopular = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const { showError } = useShowMessage();

  useEffect(() => {
    const getPopularPosts = async () => {
      setIsLoading(true);
      try {
        const querySnapShot = await getDocs(collection(db, "posts"));
        const popularPosts: Post[] = querySnapShot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            likes: Array.isArray(data.likes) ? data.likes : [], // Ensure `likes` is an array
          } as Post;
        });

        // Sort posts by likes (highest to lowest)
        const sortedPosts = popularPosts.sort(
          (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
        );

        setPosts(sortedPosts);
      } catch (error) {
        if (error instanceof Error) {
          showError("Error: " + error.message);
        } else {
          showError("Some unknown error occurred");
        }
        console.error("Error fetching popular posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPopularPosts();
  }, [showError, setPosts]); // Removed unnecessary `authUser` dependency

  return { isLoading, posts };
};

export default useGetPopular;
