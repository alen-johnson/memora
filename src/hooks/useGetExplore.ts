import { useState, useEffect } from "react";
import usePostStore, { Post } from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowMessage from "./useShowMessage";
import { db } from "../services/firebase";
import { query, collection, where, orderBy, limit, startAfter, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";



const useGetExplore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { showError } = useShowMessage();
  const POSTS_PER_PAGE = import.meta.env.VITE_LIMITS_PER_PAGE

  const getExplorePosts = async (isInitialLoad = true) => {
    if (isLoading || isFetchingMore || !hasMore) return;

    if (isInitialLoad) setIsLoading(true);
    else setIsFetchingMore(true);

    try {
      const userAndFollowing = [authUser?.uid, ...(authUser?.following ?? [])];

      const baseQuery = query(
        collection(db, "posts"),
        where("createdBy", "not-in", userAndFollowing),
        orderBy("createdAt", "desc"),
        limit(POSTS_PER_PAGE)
      );

      const paginatedQuery = lastVisible
        ? query(baseQuery, startAfter(lastVisible))
        : baseQuery;

      const querySnapShot = await getDocs(paginatedQuery);

      if (querySnapShot.empty) {
        setHasMore(false); 
        return;
      }

      const explorePosts: Post[] = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Post));

      if (querySnapShot.docs.length > 0) {
        setLastVisible(querySnapShot.docs[querySnapShot.docs.length - 1]);
      }

      const updatedPosts = isInitialLoad ? explorePosts : [...posts, ...explorePosts];
      setPosts(updatedPosts);

      if (querySnapShot.docs.length < POSTS_PER_PAGE) {
        setHasMore(false); 
      }
    } catch (error) {
      if (error instanceof Error) {
        showError("Error: " + error.message);
        console.log(error.message)
      } else {
        showError("An unknown error occurred.");
      }
    } finally {
      if (isInitialLoad) setIsLoading(false);
      else setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      getExplorePosts(true); // Fetch initial explore posts
    }
  }, [authUser]);

  return {
    isLoading,
    isFetchingMore,
    posts,
    fetchMore: () => getExplorePosts(false), // Fetch more posts on demand
    hasMore,
  };
};

export default useGetExplore;
