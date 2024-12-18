import { useEffect, useState, useCallback } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import useShowMessage from "./useShowMessage";
import { runTransaction } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useFollowUser = (userId: string) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const { showError } = useShowMessage();
  const navigate = useNavigate();

  const fetchFollowStatus = useCallback(async () => {
    if (!authUser || !userId) return;

    const userRef = doc(db, "users", authUser.uid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setIsFollowing(data.following?.includes(userId) || false); 
      }
    } catch (error) {
      console.error("Failed to fetch follow status:", error);
      setIsFollowing(false); 
    }
  }, [authUser, userId]);

  const handleFollowUser = useCallback(async () => {
    if (!authUser) {
      navigate("/auth");
      return;
    }

    setIsUpdating(true);
    try {
      await runTransaction(db, async (transaction) => {
        const currentUserRef = doc(db, "users", authUser.uid);
        const userToFollowRef = doc(db, "users", userId);

        const currentUserSnap = await transaction.get(currentUserRef);
        const userToFollowSnap = await transaction.get(userToFollowRef);

        if (!currentUserSnap.exists() || !userToFollowSnap.exists()) {
          throw new Error("User not found.");
        }

        const currentUserData = currentUserSnap.data();
        const userToFollowData = userToFollowSnap.data();


        const alreadyFollowing = currentUserData.following?.includes(userId);

        const updatedFollowing = alreadyFollowing
          ? currentUserData.following.filter((id: string) => id !== userId)
          : [...(currentUserData.following || []), userId];

        const updatedFollowers = alreadyFollowing
          ? userToFollowData.followers.filter((id: string) => id !== authUser.uid)
          : [...(userToFollowData.followers || []), authUser.uid];


        transaction.update(currentUserRef, { following: updatedFollowing });
        transaction.update(userToFollowRef, { followers: updatedFollowers });


        setAuthUser({ ...authUser, following: updatedFollowing });
        if (userProfile && userId === userProfile.uid) {
          setUserProfile({ ...userProfile, followers: updatedFollowers });
        }


        fetchFollowStatus();
      });
    } catch (error) {
      if (error instanceof Error) {
        showError(`Error: ${error.message}`);
      } else {
        showError("An unknown error occurred.");
      }
    } finally {
      setIsUpdating(false);
    }
  }, [authUser, navigate, setAuthUser, setUserProfile, showError, userId, userProfile, fetchFollowStatus]);

  useEffect(() => {
    fetchFollowStatus();
  }, [fetchFollowStatus]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
