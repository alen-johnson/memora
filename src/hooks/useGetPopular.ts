import { useEffect, useState } from "react";
import usePostStore, { Post } from "../store/postStore";
import useShowMessage from "./useShowMessage";
import { collection, query, getDocs, limit, orderBy} from "firebase/firestore";
import { db } from "../services/firebase";

const POSTS_PER_PAGE = 10;

const useGetPopular = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const { showError } = useShowMessage();

  useEffect(() => {
    const getPopularPosts = async () => {
      setIsLoading(true);
      try {

        const q = query(
          collection(db, "posts"),
          orderBy("likes", "desc"),  
          limit(POSTS_PER_PAGE) 
        );
        const querySnapShot = await getDocs(q);
        const fetchedPosts: Post[] = querySnapShot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            likes: Array.isArray(data.likes) ? data.likes : [], 
          } as Post;
        });

        const sortedPosts = fetchedPosts.sort(
          (a, b) => (b.likes.length || 0) - (a.likes.length || 0)
        );

        setPosts(sortedPosts);
      } catch (error) {
        showError("Error: " + (error instanceof Error ? error.message : "Some unknown error occurred"));
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPopularPosts();
  }, [showError, setPosts]);

  return { isLoading, posts };
};

export default useGetPopular;
