import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowMessage from "./useShowMessage";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

interface Inputs {
  fullname?: string;
  username?: string;
  bio?: string;
}

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const { showError, showSuccess } = useShowMessage();

  const editProfile = async (
    inputs: Inputs,
    profileFile: string | ArrayBuffer | null,
    coverFile: string | ArrayBuffer | null
  ) => {
    if (isUpdating || !authUser) return; 
    setIsUpdating(true);
  
    const profileStorageRef = ref(storage, `profilePics/${authUser.uid}`);
    const coverStorageRef = ref(storage, `coverPics/${authUser.uid}`);
    const userDocRef = doc(db, "users", authUser.uid);
  
    let profileUrl = authUser.profilePicURL || ""; 
    let coverUrl = authUser.coverPicURL || ""; 
  
    try {
      if (profileFile && typeof profileFile === "string") {
        await uploadString(profileStorageRef, profileFile, "data_url");
        profileUrl = await getDownloadURL(profileStorageRef);
      }
  
      if (coverFile && typeof coverFile === "string") {
        await uploadString(coverStorageRef, coverFile, "data_url");
        coverUrl = await getDownloadURL(coverStorageRef);
      }
  
      const updatedUser = {
        ...authUser,
        fullname: inputs.fullname || authUser.fullname,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: profileUrl,
        coverPicURL: coverUrl,
      };
  
      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      setTimeout(() => {
        showSuccess("Profile updated successfully");
      }, 1800);
      console.log("Updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        showError("Error: " + error.message);
      } else {
        showError("Error: An unknown error occurred");
      }
      console.log("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };
  
  return { editProfile, isUpdating };
};

export default useEditProfile;
