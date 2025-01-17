import { auth, db } from "../services/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import useShowMessage from "./useShowMessage";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
  //@ts-ignore
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const { showError } = useShowMessage();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs: {
    email: string;
    password: string;
    username: string;
    fullname: string;
  }) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullname
    ) {
      showError("Please fill in all fields!");
      return;
    }

    const uname = formatName(inputs.username)
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", uname));
    const profSnap = await getDocs(q);

    if (!profSnap.empty) {
      showError("Username already exists");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        const errorMessage = error?.message || "Something went wrong";
        showError(errorMessage);
        return;
      }


      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: uname,
          fullname: inputs.fullname,
          bio: "",
          profilePicURL: "",
          coverPicURL: "",
          followers: [],
          following: [],
          createdAt: Date.now(),
        };
        console.log(userDoc);
        await setDoc(doc(db, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }

      console.log("user created")
    } catch (error) {
      if (error instanceof Error) {
        showError("Error" + error.message);
      } else {
        showError("Error" + "An unknown error occurred");
      }
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;

const formatName = (name:string) => {

  return name.split(" ").join("").toLowerCase();}