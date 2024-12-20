import { auth, db } from "../services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowMessage from "./useShowMessage";
import useAuthStore, { User } from "../store/authStore";
import { getDoc, doc } from "firebase/firestore";


const useLogin = () => {
  const [signInWithEmailAndPassword, loading, error] = useSignInWithEmailAndPassword(auth);
  const { showError } = useShowMessage();
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs: { email: string; password: string }) => {
    if (!inputs.email || !inputs.password) {
      showError("Please fill all the fields");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

      if (userCred) {
        const docRef = doc(db, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        const userData = docSnap.data() as User;

        if (userData) {
          localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
          console.log("=====> in try",localStorage.getItem("user-info"));
          loginUser(userData);
        } else {
          showError("Some error occurred while fetching user data.");
        }
      }

      if(!localStorage.getItem("user-info")){
        showError("Please enter valid credentials")
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("auth/user-not-found")) {
          showError("Incorrect username or email.");
        } else if (err.message.includes("auth/wrong-password")) {
          showError("Incorrect password.");
        } else if (err.message.includes("auth/invalid-email")) {
          showError("Invalid email format.");
        } else if (err.message.includes("auth/too-many-requests")) {
          showError("Too many attempts. Please try again later.");
        } else {
          showError("An unknown error occurred: " + err.message);
        }
      } else {
        showError("An unknown error occurred");
      }
    }
  };
  return { loading, error, login };
};

export default useLogin;
