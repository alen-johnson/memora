import useShowMessage from "./useShowMessage";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import usePostStore, { Post } from "../store/postStore";
import { db, storage } from "../services/firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const useCreatePost = () => {
  const { showError, showSuccess } = useShowMessage();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);

  const handleCreatePost = async (selectedFile: any, caption: string) => {
    if (!selectedFile || !authUser) return showError("Please select an Image");

    setIsLoading(true);

    const newPost: Post = {
      id: "",
      caption: caption,
      likes: [],
      createdAt: Date.now(),
      createdBy: authUser?.uid,
      imgUrl: "",
    };

    try {
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      const userDocRef = doc(db, "users", authUser.uid);
      const imgRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imgRef, selectedFile, "data_url");

      const downloadURL = await getDownloadURL(imgRef);
      await updateDoc(postDocRef, { imgUrl: downloadURL });

      newPost.imgUrl = downloadURL;

      createPost({ ...newPost, id: postDocRef.id });

      showSuccess("Posted");
    } catch (error) {
      if (error instanceof Error) {
        showError("Error" + error.message);
      } else {
        showError("Error" + "An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;
