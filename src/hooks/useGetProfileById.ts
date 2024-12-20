import { useEffect, useState } from "react";
import useShowMessage from "./useShowMessage";
import { db } from "../services/firebase";
import { getDoc,doc } from "@firebase/firestore";
import { User } from "../store/authStore";

const useGetProfileById = (userID: string) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<User | null | undefined >(null)
    const {showError} = useShowMessage()

    useEffect(()=> {

        const getUserProfile =async () => {
            setIsLoading(true);
            setUserProfile(null)
            try {

                const userRef = await getDoc(doc(db, "users",userID ))

                if (userRef && userRef.data() !== undefined) {
                    const data = userRef.data();
                    const user: User = {
                      uid: data?.id,
                      email: data?.email,
                      username: data?.username ,
                      fullname: data?.fullname ,
                      bio: data?.bio ,
                      profilePicURL: data?.profilePicURL ,
                      coverPicURL: data?.coverPicURL ,
                      followers: data?.followers,
                      following: data?.following,
                      createdAt: data?.createdAt
    
                    };
                    setUserProfile(user);
                  } else {
                    setUserProfile(null);
                  }
                
            } catch (error) {
                if(error instanceof Error){
                    showError("Error"+ error.message)
                }else{
                    showError("Some unkonwn error occured")
                }
            }
        }
        getUserProfile();
    },[setUserProfile,userID])


  return {isLoading, userProfile, setUserProfile}
}

export default useGetProfileById