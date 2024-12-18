import { useEffect, useState } from "react";
import useShowMessage from "./useShowMessage";
import { db } from "../services/firebase";
import useUserProfileStore from "../store/userProfileStore";
import { query, collection, where, getDocs } from "firebase/firestore";

const useGetProfileByUsername = (username: string) => {
  const [isloading, setIsloading] = useState(true);
  const { showError } = useShowMessage();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getProfile = async () => {
      setIsloading(true);
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        );
        const querySnapShot = await getDocs(q);

        if (querySnapShot.empty) return setUserProfile(null);

        let userDoc;
        querySnapShot.forEach((doc) => {
          userDoc = doc.data();
        });

        if (userDoc) setUserProfile(userDoc);
      } catch (error) {
        if (error instanceof Error) {
          showError("Error" + error.message);
        } else {
          showError("Error" + "An unknown error occurred");
        }
      } finally {
        setIsloading(false);
      }
    };
    getProfile();
  }, [setUserProfile, username, showError]);

  return { isloading, userProfile };
};

export default useGetProfileByUsername;
