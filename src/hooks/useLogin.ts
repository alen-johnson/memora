import { auth, db } from "../services/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowMessage from "./useShowMessage";
import useAuthStore, { User } from "../store/authStore";
import { getDoc, doc } from "firebase/firestore";

const useLogin = () => {

  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { showError } = useShowMessage();
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs: { email: string; password: string }) => {
    if (!inputs.email || !inputs.password) {
      showError("Please fill all the fields");
    }

    try {

        const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)

        if(userCred){
            const docRef = doc(db, "users", userCred.user.uid);
            const docSnap = await getDoc(docRef)

            const userData = docSnap.data() as User
            if(userData){
            localStorage.setItem("user-info", JSON.stringify(docSnap.data()))
            loginUser(userData)
            }else{
                showError("Some error occured")
            }
        }
    } catch (error) {
      if (error instanceof Error) {
        showError("Error" + error.message);
      } else {
        showError("Error" + "An unknown error occurred");
      }
    }
  };
  return { loading, error, login };

};

export default useLogin;
