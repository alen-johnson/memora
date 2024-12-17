import { auth } from "../services/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import useShowMessage from "./useShowMessage";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const { showError } = useShowMessage();
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      if (error instanceof Error) {
        showError("Error" + error.message);
      } else {
        showError("Error" + "An unknown error occurred");
      }
    }
  };
  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
