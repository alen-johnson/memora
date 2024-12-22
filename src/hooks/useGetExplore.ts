import { useEffect, useState } from "react";
import usePostStore, { Post } from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowMessage from "./useShowMessage";
import {
  collection,
  query,
  getDocs,
  orderBy,
  startAfter,
  limit,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";

const POSTS_PER_PAGE = 10;

const useGetExplore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false); 
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null); 
  const [hasMore, setHasMore] = useState(true); 
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { showError } = useShowMessage();

  const getExplorePosts = async (isInitialLoad: boolean = true) => {
    if (isLoading || isFetchingMore || !hasMore) return; 

    if (isInitialLoad) {
      setIsLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const postsQuery = lastVisible
        ? query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(POSTS_PER_PAGE)
          )
        : query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"),
            limit(POSTS_PER_PAGE)
          );

      const querySnapShot = await getDocs(postsQuery);

      if (querySnapShot.empty) {
        setHasMore(false);
        return;
      }

      const explorePosts: Post[] = [];
      querySnapShot.forEach((doc) => {
        explorePosts.push({ id: doc.id, ...doc.data() } as Post);
      });

      const filteredPosts = explorePosts.filter(
        (post) =>
          post.createdBy !== authUser?.uid &&
          !authUser?.following.includes(post.createdBy)
      );

      const lastVisibleDoc = querySnapShot.docs[querySnapShot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      const updatedPosts = isInitialLoad
        ? filteredPosts
        : [...posts, ...filteredPosts];
      setPosts(updatedPosts);

      if (filteredPosts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        showError("Error: " + error.message);
      } else {
        showError("Some unknown error occurred");
      }
      console.error("Error fetching explore posts:", error);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      } else {
        setIsFetchingMore(false);
      }
    }
  };

  useEffect(() => {
    getExplorePosts(true);
  }, [authUser]);

  return {
    isLoading,
    isFetchingMore,
    posts,
    fetchMore: () => getExplorePosts(false),
    hasMore,
  };
};

export default useGetExplore;
