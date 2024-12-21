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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useCreatePost = () => {
  const { showError, showSuccess } = useShowMessage();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);

  const handleCreatePost = async (selectedFiles: any[], caption: string) => {
    if (!selectedFiles || selectedFiles.length === 0 || !authUser) {
      return showError("Please select at least one image or video");
    }
    setIsLoading(true);
  
    const newPost: Omit<Post, "id"> = {
      caption: caption,
      likes: [],
      createdAt: Date.now(),
      createdBy: authUser?.uid,
      imgUrls: [], 
    };
  
    try {
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      const postWithId = { ...newPost, id: postDocRef.id };
  
      const userDocRef = doc(db, "users", authUser.uid);
  
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
  
      for (const selectedFile of selectedFiles) {
        const imgRef = ref(storage, `posts/${postDocRef.id}/${selectedFile.name}`);
  
        await uploadBytes(imgRef, selectedFile);
        const downloadURL = await getDownloadURL(imgRef);
        newPost.imgUrls.push(downloadURL);  
      }
  
      await updateDoc(postDocRef, { imgUrls: newPost.imgUrls });
      postWithId.imgUrls = newPost.imgUrls;
      createPost(postWithId);
  
      showSuccess("Posted successfully");
    } catch (error) {
      if (error instanceof Error) {
        showError("Error: " + error.message);
        console.log(error.message)
      } else {
        showError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
};

export default useCreatePost;
