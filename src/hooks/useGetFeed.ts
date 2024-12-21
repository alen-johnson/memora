import { useState, useEffect } from "react";
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowMessage from "./useShowMessage";
import { db } from "../services/firebase";
import { query, collection, where, orderBy, limit, startAfter, getDocs,QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const POSTS_PER_PAGE = 10;

const useGetFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfFeed, setIsEndOfFeed] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null); 
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { showError } = useShowMessage();

  const fetchFeedPosts = async (isInitialLoad = false) => {
    if (isLoading || isEndOfFeed) return;

    setIsLoading(true);

    try {
      const userAndFollowing = [authUser?.uid, ...(authUser?.following ?? [])];
      const baseQuery = query(
        collection(db, "posts"),
        where("createdBy", "in", userAndFollowing),
        orderBy("createdAt", "desc"),
        limit(POSTS_PER_PAGE)
      );

      const paginatedQuery = lastVisible
        ? query(baseQuery, startAfter(lastVisible))
        : baseQuery;

      const querySnapShot = await getDocs(paginatedQuery);

      if (querySnapShot.empty) {
        setIsEndOfFeed(true); 
      } else {
        const newPosts: any = [];
        querySnapShot.forEach((doc) => {
          newPosts.push({ id: doc.id, ...doc.data() });
        });

        setPosts(isInitialLoad ? newPosts : [...posts, ...newPosts]);
        setLastVisible(querySnapShot.docs[querySnapShot.docs.length - 1]); 
      }
    } catch (error) {
      if (error instanceof Error) {
        showError("Error: " + error.message);
        console.log(error.message)
      } else {
        showError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchFeedPosts(true); 
    }
  }, [authUser]);

  return { isLoading, posts, fetchMorePosts: fetchFeedPosts, isEndOfFeed };
};

export default useGetFeed;
