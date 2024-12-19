import { useEffect, useState } from "react";
import usePostStore, { Post } from "../store/postStore";
import useShowMessage from "./useShowMessage";
import useUserProfileStore from "../store/userProfileStore";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const { showError } = useShowMessage();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(
          collection(db, "posts"),
          where("createdBy", "==", userProfile.uid)
        );
        const querySnapShot = await getDocs(q);

        const gposts: any = [];
        querySnapShot.forEach((doc) => {
          gposts.push({ ...doc.data(), id: doc.id });
        });

        gposts.sort((a: Post, b: Post) => b.createdAt - a.createdAt);
        setPosts(gposts);
      } catch (error) {
        if (error instanceof Error) {
          showError("Error: " + error.message);
        } else {
          showError("Error: An unknown error occurred");
        }
        console.log("Update failed");
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [setPosts, userProfile, showError]);

  return { isLoading, posts };
};

export default useGetUserPosts;
