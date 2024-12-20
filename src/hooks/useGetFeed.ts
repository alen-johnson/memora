import { useEffect, useState } from "react";
import usePostStore, { Post } from "../store/postStore";
import useAuthStore from "../store/authStore";
import useShowMessage from "./useShowMessage";
import useUserProfileStore from "../store/userProfileStore";
import { db } from "../services/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

const useGetFeed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { showError } = useShowMessage();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser?.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const userAndFollowing = [authUser?.uid, ...(authUser?.following ??  [])]

      const q = query(
        collection(db, "posts"),
        where("createdBy", "in", userAndFollowing)
      );
      try {
        const querySnapShot = await getDocs(q);
        const feedPosts: any = [];

        querySnapShot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a: Post, b: Post) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        if (error instanceof Error) {
          showError("Error:" + error.message);
        } else {
          showError("Some unknown erro occured");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getFeedPosts();
  }, [authUser, showError, setPosts, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeed;
