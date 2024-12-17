import { useNavigate } from "react-router-dom";
import "./EditPage.css";
import useAuthStore from "../../store/authStore";
import { ProfileHeader } from "../../components/componetIndex";
import { auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function EditPage() {
  const authUser = useAuthStore((state) => state.user);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const arrowClick = () => {
    navigate(`/${authUser?.username}`);
  };
  return (
    <div className="edit">
      <ProfileHeader
        text="Go Back"
        showButtons={user !== null} // Conditionally render buttons based on user state
        onArrowClick={arrowClick}
        onLogoutClick={() => {}}
        isLoggingOut={false}
      />
    </div>
  );
}

export default EditPage;
